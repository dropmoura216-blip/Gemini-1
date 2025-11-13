



import React, { useState, useEffect, useRef } from 'react';
import ProgressBar from './components/ProgressBar';
import StepContainer from './components/StepContainer';
import QuizOption from './components/QuizOption';
import PillarCard from './components/PillarCard';
import CountdownTimer from './components/CountdownTimer';
import IntroLoader from './components/IntroLoader';
import TestimonialCarousel from './components/TestimonialCarousel';
import { FUNNEL_STEPS } from './constants';
import { initSession, trackEvent } from './services/trackingService';
import type { FunnelStep } from './types';

// Declare fbq for Meta Pixel
declare const fbq: any;

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [showPreQuizModal, setShowPreQuizModal] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showStickyButton, setShowStickyButton] = useState(false);
  const [showExitIntentModal, setShowExitIntentModal] = useState(false);
  const [showStep8Notification, setShowStep8Notification] = useState(false);
  
  // State for the final modal button delay
  const [isFinalModalButtonDelayed, setIsFinalModalButtonDelayed] = useState(false);
  const [finalModalButtonDelaySeconds, setFinalModalButtonDelaySeconds] = useState(3);
  const finalModalButtonTimerRef = useRef<number | null>(null);

  const exitIntentTriggered = useRef(false);
  // Ref to prevent duplicate tracking in React.StrictMode
  const lastTrackedStepRef = useRef<number | null>(null);
  const totalSteps = FUNNEL_STEPS.length;

  useEffect(() => {
    initSession();
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 3400); // A introdução dura 3.4 segundos

    return () => clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    // Exit Intent Logic
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentTriggered.current) {
        exitIntentTriggered.current = true;
        setShowExitIntentModal(true);
        trackEvent('EXIT_INTENT_TRIGGERED', { reason: 'mouseleave' });
      }
    };

    const handlePopState = () => {
      if (!exitIntentTriggered.current) {
        exitIntentTriggered.current = true;
        setShowExitIntentModal(true);
        window.history.pushState(null, '', window.location.href);
        trackEvent('EXIT_INTENT_TRIGGERED', { reason: 'popstate' });
      }
    };
    
    // Add an initial state to the history to catch the first back attempt.
    window.history.pushState(null, '', window.location.href);

    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    // Track ONLY the initial step view, preventing duplicates from StrictMode
    if (currentStep === 1 && lastTrackedStepRef.current !== 1) {
      trackEvent('STEP_VIEW', { step: 1 });
      lastTrackedStepRef.current = 1;
    }

    // Reset and hide notifications when step changes
    setShowNotification(false);
    setShowFinalModal(false);
    setShowStep8Notification(false);
    // Stop any running timers when step changes
    if (finalModalButtonTimerRef.current) clearInterval(finalModalButtonTimerRef.current);

    if (currentStep === 1) {
        const timer = setTimeout(() => {
            setShowNotification(true);
        }, 1500); // Show notification after 1.5s on step 1
        return () => clearTimeout(timer);
    }

    if (currentStep === 8) {
        const timer = setTimeout(() => {
            setShowStep8Notification(true);
        }, 1500); // Show notification after 1.5s on step 8
        return () => clearTimeout(timer);
    }
    
    if (currentStep === 9) {
        const timer = setTimeout(() => {
            setShowFinalModal(true);
            setIsFinalModalButtonDelayed(true);
            setFinalModalButtonDelaySeconds(2); // Inicia o contador em 2
        }, 1000); // Show modal after 1s on step 9
        return () => clearTimeout(timer);
    }
  }, [currentStep]);
  
  // Timer for the final modal button
  useEffect(() => {
    if (isFinalModalButtonDelayed) {
      finalModalButtonTimerRef.current = window.setInterval(() => {
        setFinalModalButtonDelaySeconds((prev) => {
          if (prev <= 1) {
            clearInterval(finalModalButtonTimerRef.current!);
            setIsFinalModalButtonDelayed(false);
            return 0;
          }
          return prev - 1;
        });
      }, 750); // Roda a cada 750ms, totalizando 1.5s
    }
    return () => {
      if (finalModalButtonTimerRef.current) {
        clearInterval(finalModalButtonTimerRef.current);
      }
    };
  }, [isFinalModalButtonDelayed]);


  useEffect(() => {
    // Hide sticky button immediately when step changes
    setShowStickyButton(false);
    
    // If we are on step 6 or 7, set a timer to show it
    if (currentStep === 6 || currentStep === 7) {
        const timer = setTimeout(() => {
            setShowStickyButton(true);
        }, 3000);
        
        // Cleanup function to clear the timer if the component unmounts or step changes before 3s
        return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const advanceToStep = (stepNumber: number) => {
    if (stepNumber <= totalSteps) {
      setCurrentStep(stepNumber);
    }
  };

  const handleCtaClick = () => {
    const stepData = FUNNEL_STEPS.find(s => s.step === currentStep);
    if (!stepData) return;

    trackEvent('CTA_CLICK', { step: currentStep, ctaText: stepData.ctaText });

    if (currentStep === 1) {
      setShowPreQuizModal(true);
      return;
    }
    advanceToStep(currentStep + 1);
  };

  const handleQuizAnswer = (optionText: string, question: string) => {
    trackEvent('QUIZ_ANSWER', { step: currentStep, question, answer: optionText });
    advanceToStep(currentStep + 1);
  };

  const handleChoiceClick = () => {
    trackEvent('CHOICE_MADE', { step: 8, choice: 'Aprovado' });
    advanceToStep(currentStep + 1);
  };

  const handleCheckoutClick = () => {
    trackEvent('CHECKOUT_CLICK', { step: 9 });
    
    // Track Meta Pixel event for initiating checkout
    if (typeof fbq === 'function') {
      fbq('track', 'InitiateCheckout');
    }

    console.log('Redirecting to checkout...');
    // In a real scenario, you would redirect here:
    window.location.href = 'https://compraseguraonline.org.ua/c/75f2b7ce4a';
  };
  
  const handleConfirmQuiz = () => {
    setShowPreQuizModal(false);
    advanceToStep(2);
  };

  const handleDeclineQuiz = () => {
    setShowPreQuizModal(false);
  };
  
  const handleCloseFinalModal = () => {
    setShowFinalModal(false);
  };

  const renderStepContent = () => {
    const stepData = FUNNEL_STEPS.find(s => s.step === currentStep);

    if (!stepData) {
      return <div>Erro: Etapa não encontrada.</div>;
    }

    return (
      <StepContainer step={stepData.step}>
        {currentStep !== 9 && (
          <>
            {stepData.preheadline && (
              <p className="text-base sm:text-lg font-semibold text-amber-400 tracking-wider uppercase mb-3">
                {stepData.preheadline}
              </p>
            )}
            <h1 className="text-[1.75rem] sm:text-[2.125rem] md:text-[2.75rem] font-extrabold text-white tracking-tight leading-snug">
              {stepData.headline}
            </h1>
            {stepData.subheadline && (
              <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                {stepData.subheadline}
              </p>
            )}
          </>
        )}

        {/* Quiz Content */}
        {stepData.quiz && (
          <div className="mt-8 max-w-lg mx-auto w-full">
            <h2 className="text-xl md:text-2xl font-semibold text-amber-400 mb-4">{stepData.quiz.question}</h2>
            {stepData.quiz.options.map((option, index) => (
              <QuizOption key={index} text={option.text} icon={option.icon} onClick={() => handleQuizAnswer(option.text, stepData.quiz!.question)} />
            ))}
          </div>
        )}

        {/* Pillars Content */}
        {stepData.pillars && (
          <div className="mt-10 flex flex-col md:flex-row gap-4">
            {stepData.pillars.map((pillar, index) => (
              <PillarCard key={index} {...pillar} />
            ))}
          </div>
        )}
        
        {/* Testimonial Carousel */}
        {stepData.testimonials && (
          <TestimonialCarousel testimonials={stepData.testimonials} />
        )}

        {/* Step 8: The Choice */}
        {currentStep === 8 && (
            <div className="mt-8 w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
                {/* Option 1 (Good): Ser Aprovado */}
                <div className="relative w-full flex-1">
                    <button
                        onClick={handleChoiceClick}
                        className="w-full h-full text-left bg-slate-800 border-2 border-amber-400/60 rounded-lg p-6 flex flex-col transform transition-[transform,border-color] duration-300 hover:scale-[1.03] hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/20 focus:outline-none focus:ring-4 focus:ring-amber-500/50 will-change-transform animate-pulse-slow"
                    >
                        <div className="flex-grow">
                            <h3 className="font-bold text-lg text-amber-300 mb-3 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                OPÇÃO 1: Ser Aprovado(a)
                            </h3>
                            <ul className="list-none space-y-2 text-slate-300 text-sm">
                                <li>- Salário inicial de <span className="font-bold text-white">R$ 16.495/mês</span> <span className="font-medium text-amber-300 opacity-90">+ R$ 2.000 VA</span>.</li>
                                <li>- <span className="font-bold text-white">Estabilidade e segurança</span> para o seu futuro.</li>
                                <li>- Benefícios exclusivos e <span className="font-bold text-white">plano de carreira</span> na Caixa.</li>
                            </ul>
                        </div>
                        <div className="mt-5 border-t border-slate-700/60 pt-4 flex items-center justify-center gap-2 text-amber-300 font-semibold animate-pulse-gentle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                            </svg>
                            <span>Selecionar esta opção</span>
                        </div>
                    </button>
                    {showStep8Notification && (
                        <div className="absolute bottom-full mb-4 w-max max-w-xs bg-slate-800 border border-amber-500/50 rounded-lg p-4 text-center shadow-lg left-1/2 -translate-x-1/2 animate-fade-in-up z-10">
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-4 h-4 bg-slate-800 border-r border-b border-amber-500/50 transform rotate-45"></div>
                            <p className="text-white text-sm font-medium">
                                Clique nesta opção caso você queira passar no concurso da Caixa.
                            </p>
                        </div>
                    )}
                </div>

                {/* Option 2 (Bad): Tentar a Sorte */}
                <div className="w-full flex-1 bg-slate-800/40 border border-red-500/30 rounded-lg p-6 opacity-80 text-left">
                    <h3 className="font-bold text-lg text-red-400 mb-3 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        OPÇÃO 2: Tentar a Sorte
                    </h3>
                    <ul className="list-none space-y-2 text-slate-300 text-sm">
                        <li>- Enfrentar <span className="font-bold text-white">500+ candidatos por vaga</span> sozinho.</li>
                        <li>- Arriscar <span className="font-bold text-white">mais 12 anos de espera</span> por uma nova chance.</li>
                        <li>- Ser um dos <span className="font-bold text-white">92% eliminados</span> pelas armadilhas da Cesgranrio.</li>
                    </ul>
                </div>
            </div>
        )}

        {/* Step 9: Final Offer Page */}
        {currentStep === 9 && (
            <div className="max-w-3xl mx-auto w-full text-center animate-fade-in">
                {/* Headlines */}
                {stepData.preheadline && (
                    <p className="text-base sm:text-lg font-semibold text-amber-400 tracking-wider uppercase mb-3">
                        {stepData.preheadline}
                    </p>
                )}
                <h1 className="text-[1.75rem] sm:text-[2.125rem] md:text-[2.75rem] font-extrabold text-white tracking-tight leading-snug">
                    {stepData.headline}
                </h1>
                {stepData.subheadline && (
                    <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                        {stepData.subheadline}
                    </p>
                )}

                <div className="w-24 h-1 bg-amber-400/30 rounded-full mx-auto my-10"></div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">O que você recebe com acesso imediato:</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left my-6">
                    <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700">
                        <p className="font-bold text-amber-300">✓ Mapeamento 80/20</p>
                        <p className="text-sm text-slate-300 mt-1">Foco total nos tópicos que a Cesgranrio realmente cobra.</p>
                    </div>
                    <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700">
                        <p className="font-bold text-amber-300">✓ Conteúdo Verticalizado</p>
                        <p className="text-sm text-slate-300 mt-1">Aulas e materiais sem enrolação, direto ao ponto.</p>
                    </div>
                    <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700">
                        <p className="font-bold text-amber-300">✓ Simulados Realistas</p>
                        <p className="text-sm text-slate-300 mt-1">Treino exaustivo no formato exato da prova.</p>
                    </div>
                </div>
                
                <div className="my-10 text-center">
                    <p className="text-lg text-slate-400 line-through">De R$ 297,00</p>
                    <p className="text-white text-sm">Por apenas 1x de</p>
                    <p className="text-5xl font-extrabold text-amber-400 my-1">R$ 27,90</p>
                    <p className="text-slate-300 font-medium">(Seu novo salário paga isso em <span className="font-bold text-white">menos de 2 horas</span>)</p>
                </div>

                <CountdownTimer />

                <div className="mt-6">
                    <button
                        onClick={handleCheckoutClick}
                        className="w-full max-w-md mx-auto bg-amber-400 text-slate-900 font-bold text-lg py-4 px-10 rounded-lg shadow-lg shadow-amber-500/20 transform transition-[transform,background-color] duration-300 hover:bg-amber-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50 animate-pulse-slow will-change-transform"
                    >
                        {stepData.ctaText}
                    </button>
                </div>
                
                <div className="mt-4 max-w-md mx-auto">
                    <div className="w-full border border-slate-700 rounded-lg p-3 flex items-center justify-center gap-3 text-slate-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm font-medium">
                            Envio imediato via e-mail e WhatsApp.
                        </p>
                    </div>
                </div>


                {/* Guarantee */}
                <div className="flex items-center justify-center gap-4 mt-8 bg-slate-800/50 p-4 rounded-lg border border-slate-700 max-w-2xl mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-left">
                        <h3 className="font-bold text-white text-base">Garantia Incondicional de 7 Dias</h3>
                        <p className="text-slate-300 text-sm">Seu risco é zero. Se não for a estratégia mais precisa que você já viu, peça seu dinheiro de volta.</p>
                    </div>
                </div>
            </div>
        )}


        {/* CTA Button (appears on non-quiz/non-choice/non-offer steps) */}
        {!stepData.quiz && currentStep !== 8 && currentStep !== 9 && (
          <>
            {/* Normal button for steps 6 and 7, shown for the first 3 seconds */}
            {(currentStep === 6 || currentStep === 7) && !showStickyButton && (
                <div className="mt-8">
                    <div className="relative inline-block">
                        <button
                            onClick={handleCtaClick}
                            className="bg-amber-400 text-slate-900 font-bold text-lg py-4 px-10 rounded-lg shadow-lg shadow-amber-500/20 transform transition-[transform,background-color] duration-300 hover:bg-amber-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50 animate-pulse-slow will-change-transform"
                        >
                            {stepData.ctaText}
                        </button>
                    </div>
                </div>
            )}
            
            {/* Sticky button for steps 6 & 7 (after 3s), or normal buttons for other steps */}
            {(currentStep !== 6 && currentStep !== 7 || showStickyButton) && (
                <div className={(currentStep === 6 || currentStep === 7) && showStickyButton
                    ? "fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900 to-slate-900/80 backdrop-blur-sm border-t border-slate-700 z-10 animate-fade-in-up-fast" 
                    : "mt-8"
                  }>
                    <div className="relative inline-block">
                        {currentStep === 1 ? (
                            <div className="p-1.5 border-2 border-white/50 rounded-[14px] animate-pulse-white-border will-change-[border-color,transform]">
                                <button
                                    onClick={handleCtaClick}
                                    className="bg-amber-400 text-slate-900 font-bold text-lg py-4 px-10 rounded-lg shadow-lg shadow-amber-500/20 transform transition-[transform,background-color] duration-300 hover:bg-amber-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50 animate-pulse-slow will-change-transform"
                                >
                                    {stepData.ctaText}
                                </button>
                            </div>
                        ) : (
                             <button
                                onClick={handleCtaClick}
                                className="bg-amber-400 text-slate-900 font-bold text-lg py-4 px-10 rounded-lg shadow-lg shadow-amber-500/20 transform transition-[transform,background-color] duration-300 hover:bg-amber-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50 animate-pulse-slow will-change-transform"
                            >
                                {stepData.ctaText}
                            </button>
                        )}

                       {currentStep === 1 && showNotification && (
                            <div className="absolute top-full mt-4 w-max max-w-sm sm:max-w-md bg-slate-800 border border-red-500/50 rounded-lg p-4 text-center shadow-lg left-1/2 -translate-x-1/2 animate-fade-in-up">
                                <div className="absolute left-1/2 -translate-x-1/2 top-[-8px] w-4 h-4 bg-slate-800 border-l border-t border-red-500/50 transform rotate-45"></div>
                                <p className="text-white text-sm sm:text-base">
                                    <span className="font-bold text-red-500">LEMBRE-SE:</span> A projeção é de <span className="font-bold text-red-500">500+ candidatos por vaga.</span> Apenas uma estratégia validada coloca você na frente.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
          </>
        )}
      </StepContainer>
    );
  };
  
  const animationStyles = `
    @keyframes pulse-white-border {
        0%, 100% {
            border-color: rgba(255, 255, 255, 0.5);
            transform: scale(1.0);
        }
        50% {
            border-color: rgba(255, 255, 255, 1);
            transform: scale(1.03);
        }
    }
    .animate-pulse-white-border {
        animation: pulse-white-border 2.5s infinite ease-in-out;
    }
    @keyframes pulse-slow {
      50% {
        transform: scale(1.02);
      }
    }
    .animate-pulse-slow {
      animation: pulse-slow 3s infinite;
    }

    @keyframes pulse-gentle {
        0%, 100% {
            opacity: 1;
            transform: scale(1);
        }
        50% {
            opacity: 0.85;
            transform: scale(0.99);
        }
    }
    .animate-pulse-gentle {
        animation: pulse-gentle 2.5s infinite ease-in-out;
    }

    @keyframes notificationFadeIn {
      from {
        opacity: 0;
        transform: translate(-50%, 10px);
      }
      to {
        opacity: 1;
        transform: translate(-50%, 0);
      }
    }
    .animate-fade-in-up {
        animation: notificationFadeIn 1s ease-out forwards;
    }
    
    @keyframes fadeInUpFast {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fade-in-up-fast {
        animation: fadeInUpFast 0.5s ease-out forwards;
    }

    @keyframes fadeInFast {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    .animate-fade-in-fast {
        animation: fadeInFast 0.3s ease-out forwards;
    }
    @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
    }
    .animate-scale-in {
        animation: scaleIn 0.3s ease-out forwards;
    }
    @keyframes intro-fade-out {
      from { opacity: 1; }
      to { opacity: 0; visibility: hidden; }
    }
    .animate-intro-fade-out {
        animation: intro-fade-out 0.5s ease-out forwards;
    }

    @keyframes intro-fade-in-scale {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-intro-fade-in-scale {
      animation: intro-fade-in-scale 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
    }

    @keyframes intro-fade-in-up {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-intro-fade-in-up {
      animation: intro-fade-in-up 1s ease-out forwards;
      opacity: 0; /* Start hidden */
    }
    
    @keyframes bg-pan {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-bg-pan {
      background-size: 200% 200%;
      animation: bg-pan 12s ease infinite;
    }
    @keyframes progress-bar {
        from { width: 0%; }
        to { width: 100%; }
    }
    .animate-progress-bar {
        animation: progress-bar 3.4s linear forwards;
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>
      
      {showIntro && <IntroLoader />}

      {!showIntro && (
        <div className="bg-slate-900 animate-fade-in-fast">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            {renderStepContent()}
            
            {showPreQuizModal && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in-fast">
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl shadow-amber-500/10 transform animate-scale-in">
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-6">
                    Será necessário responder 3 perguntas rápidas para liberar o método, tudo bem?
                </h2>
                <div className="flex flex-col gap-4 mt-8">
                    <button
                    onClick={handleConfirmQuiz}
                    className="w-full bg-amber-400 text-slate-900 rounded-lg shadow-lg shadow-amber-500/20 transform transition-[transform,background-color] duration-300 hover:bg-amber-300 hover:scale-105 p-4 flex flex-col items-center will-change-transform"
                    >
                    <span className="font-bold text-lg">
                        Sem problemas! Quero passar no concurso da Caixa.
                    </span>
                    <span className="text-sm font-medium text-slate-800/90 mt-1">
                        E garantir meu salário de R$ 16.495/mês + R$ 2.000 VA
                    </span>
                    </button>
                    <button
                    onClick={handleDeclineQuiz}
                    className="w-full text-slate-400 font-medium hover:text-white transition-colors duration-200 py-2"
                    >
                    Não, não quero passar no concurso.
                    </button>
                </div>
                </div>
            </div>
            )}

            {showFinalModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 animate-fade-in-fast">
                    <div className="bg-slate-800 border-2 border-red-500/80 rounded-xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl shadow-red-500/20 transform animate-scale-in">
                        <h2 className="text-2xl sm:text-3xl font-bold text-red-500 mb-4">NÃO DEIXE ESCAPAR!</h2>
                        <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
                           <span className="font-bold text-red-500">12 anos de espera. 500+ candidatos por vaga.</span> Esta é a sua <span className="font-bold text-amber-400">chance de sair na frente!</span> Clique em CONTINUAR e garanta seu método!
                        </p>
                        <div className="mt-8">
                             {isFinalModalButtonDelayed ? (
                                <button
                                    disabled
                                    className="w-full max-w-sm mx-auto bg-slate-700 text-slate-500 font-bold text-lg py-4 px-10 rounded-lg shadow-inner cursor-not-allowed transition-colors duration-300"
                                >
                                    Continuar ({finalModalButtonDelaySeconds})
                                </button>
                            ) : (
                                <button
                                    onClick={handleCloseFinalModal}
                                    className="w-full max-w-sm mx-auto bg-amber-400 text-slate-900 font-bold text-lg py-4 px-10 rounded-lg shadow-lg shadow-amber-500/20 transform transition-[transform,background-color] duration-300 hover:bg-amber-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50 animate-pulse-slow will-change-transform"
                                >
                                    Continuar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showExitIntentModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 animate-fade-in-fast">
                    <div className="bg-slate-800 border-2 border-red-500/80 rounded-xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl shadow-red-500/20 transform animate-scale-in">
                        <h2 className="text-2xl sm:text-3xl font-bold text-red-400 mb-4">ESPERE! LEMBRE-SE DISSO:</h2>
                        <p className="text-lg md:text-xl text-slate-200">
                            Faz <span className="font-bold text-white">12 anos</span> que não há um concurso como este. A projeção é de <span className="font-bold text-red-400">500+ candidatos por vaga.</span>
                        </p>
                        <p className="text-lg md:text-xl text-slate-200 mt-2">
                            Você tem certeza que quer desperdiçar esta chance única?
                        </p>
                        <div className="mt-8">
                            <button
                                onClick={() => setShowExitIntentModal(false)}
                                className="w-full max-w-sm mx-auto bg-amber-400 text-slate-900 font-bold text-lg py-4 px-10 rounded-lg shadow-lg shadow-amber-500/20 transform transition-[transform,background-color] duration-300 hover:bg-amber-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50 will-change-transform"
                            >
                                CONTINUAR E VER O MÉTODO
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
      )}
    </>
  );
};

export default App;