import type { SessionData, TrackingEvent } from '../types';
import { db } from './firebase';
// Use Firebase v9+ modular syntax for Firestore operations.
import { doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const STORAGE_KEY = 'funnelAnalytics';

// State for preventing duplicate events
let lastTrackedEvent: { type: string; details: string; timestamp: number } | null = null;
const DUPLICATE_EVENT_THRESHOLD_MS = 500; // Ignore the same event if it occurs within 0.5 seconds

const getSessionData = (): SessionData | null => {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    return rawData ? JSON.parse(rawData) : null;
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return null;
  }
};

const setSessionData = (data: SessionData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error writing to localStorage", error);
  }
};

export const initSession = () => {
  let session = getSessionData();
  if (!session) {
    const sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const initEvent: TrackingEvent = {
        timestamp: new Date().toISOString(),
        type: 'APP_INIT',
        details: { sessionId }
    };
    session = {
      sessionId,
      startTime: new Date().toISOString(),
      deviceInfo: {
        userAgent: navigator.userAgent, // Identifica o navegador, sistema operacional e se o visitante está no mobile/pc.
        platform: navigator.platform,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
      },
      events: [initEvent],
    };
    setSessionData(session);
    
    // Save the entire new session object to Firestore (fire-and-forget)
    // Use Firebase v9+ syntax for setting a document.
    setDoc(doc(db, 'sessions', session.sessionId), session)
        .catch(error => {
            console.error("Error creating session in Firestore", error);
        });
  }
};

export const trackEvent = (
  type: TrackingEvent['type'],
  details: Record<string, any> = {}
) => {
  const now = Date.now();
  const detailsString = JSON.stringify(details);

  // Anti-duplication check: If the same event (type + details) was tracked very recently, ignore it.
  if (
    lastTrackedEvent &&
    lastTrackedEvent.type === type &&
    lastTrackedEvent.details === detailsString &&
    (now - lastTrackedEvent.timestamp) < DUPLICATE_EVENT_THRESHOLD_MS
  ) {
    console.warn(`Duplicate event suppressed: ${type}`, details);
    return; // Stop execution to prevent duplicate tracking
  }
  
  // Update the last tracked event to the current one
  lastTrackedEvent = { type, details: detailsString, timestamp: now };
  
  const session = getSessionData();
  if (!session) {
    console.error("Tracking session not initialized.");
    return;
  }

  /*
   * DETALHAMENTO DOS EVENTOS PARA ANÁLISE:
   *
   * 'APP_INIT': Sessão iniciada. O visitante abriu a página.
   *
   * 'STEP_VIEW': Visitante visualizou uma etapa do funil.
   *   - Exemplo: { "type": "STEP_VIEW", "details": { "step": 3 } }
   *   - Análise: Se o último evento de um visitante for um 'STEP_VIEW', significa que "visitante não foi pro checkout e parou na etapa X".
   *     Você pode ver em qual dispositivo (mobile/pc) ele estava olhando o `deviceInfo` no início da sessão.
   *
   * 'CTA_CLICK': Visitante clicou em um botão de chamada para ação. Mostra engajamento.
   *
   * 'QUIZ_ANSWER': Visitante respondeu a uma pergunta do quiz. Mostra que ele está interagindo com o diagnóstico.
   *
   * 'CHOICE_MADE': Visitante fez a escolha na etapa 8. Momento crucial de decisão.
   *
   * 'EXIT_INTENT_TRIGGERED': Visitante tentou sair da página (mouse saiu da janela ou usou o botão voltar). Indica um ponto de abandono.
   *
   * 'CHECKOUT_CLICK': Visitante clicou no botão final para ir ao pagamento.
   *   - Exemplo: { "type": "CHECKOUT_CLICK", "details": { "step": 9 } }
   *   - Análise: Este evento significa que "visitante foi pro checkout". É o evento de conversão principal.
   *
  */
  const newEvent: TrackingEvent = {
    timestamp: new Date().toISOString(),
    type,
    details,
  };

  session.events.push(newEvent);
  setSessionData(session);

  // Update in Firestore (fire-and-forget)
  // Use Firebase v9+ syntax for updating a document.
  const sessionDocRef = doc(db, 'sessions', session.sessionId);
  updateDoc(sessionDocRef, {
      // Use Firebase v9+ syntax for arrayUnion.
      events: arrayUnion(newEvent)
  }).catch(error => {
      // If the document doesn't exist, it might have been deleted or failed to create.
      // As a fallback, we can try to re-create it with the current session state.
      console.warn("Failed to update session in Firestore, attempting to recreate.", error);
      // Use Firebase v9+ syntax for setting a document with merge.
      setDoc(sessionDocRef, session, { merge: true })
          .catch(e => console.error("Error recreating session in Firestore", e));
  });
};

export const getAnalytics = (): SessionData | null => {
    return getSessionData();
};

export const clearAnalytics = () => {
    // Note: This only clears local storage. It does not affect data sent to Firestore.
    try {
        localStorage.removeItem(STORAGE_KEY);
        console.log("Analytics data cleared from localStorage.");
    } catch(error) {
        console.error("Error clearing analytics data", error);
    }
}