
import type { SessionData, TrackingEvent } from '../types';

const STORAGE_KEY = 'funnelAnalytics';

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
    session = {
      sessionId,
      startTime: new Date().toISOString(),
      deviceInfo: {
        userAgent: navigator.userAgent, // Identifica o navegador, sistema operacional e se o visitante está no mobile/pc.
        platform: navigator.platform,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
      },
      events: [],
    };
    setSessionData(session);
    trackEvent('APP_INIT', { sessionId });
  }
};

export const trackEvent = (
  type: TrackingEvent['type'],
  details: Record<string, any> = {}
) => {
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
};

export const getAnalytics = (): SessionData | null => {
    return getSessionData();
};

export const clearAnalytics = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        console.log("Analytics data cleared.");
    } catch(error) {
        console.error("Error clearing analytics data", error);
    }
}
