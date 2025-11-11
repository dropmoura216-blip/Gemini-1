

import React, { useState, useEffect } from 'react';
import ProgressBar from './components/ProgressBar';
import StepContainer from './components/StepContainer';
import QuizOption from './components/QuizOption';
import PillarCard from './components/PillarCard';
import CountdownTimer from './components/CountdownTimer';
import IntroLoader from './components/IntroLoader';
import { FUNNEL_STEPS } from './constants';
import type { FunnelStep } from './types';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [showPreQuizModal, setShowPreQuizModal] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showStickyButton, setShowStickyButton] = useState(false);
  const totalSteps = FUNNEL_STEPS.length;

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 6000); // A introdução dura 6 segundos

    return () => clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    // Reset and hide notification when step changes
    setShowNotification(false);
    if (currentStep === 1) {
        const timer = setTimeout(() => {
            setShowNotification(true);
        }, 1500); // Show notification after 1.5s on step 1
        return () => clearTimeout(timer);
    }
  }, [currentStep]);

  useEffect(() => {
    // Hide sticky button immediately when step changes
    setShowStickyButton(false);
    
    // If we are on step 6, set a timer to show it
    if (currentStep === 6) {
        const timer = setTimeout(() => {
            setShowStickyButton(true);
        }, 3000);
        
        // Cleanup function to clear the timer if the component unmounts or step changes before 3s
        return () => clearTimeout(timer);
    }
  }, [currentStep]);


  const handleNextStep = () => {
    if (currentStep === 1) {
      setShowPreQuizModal(true);
      return;
    }
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Handle final CTA click - e.g., redirect to checkout
      console.log('Redirecting to checkout...');
      window.location.href = 'https://checkout.example.com';
    }
  };
  
  const handleConfirmQuiz = () => {
    setShowPreQuizModal(false);
    setCurrentStep(2);
  };

  const handleDeclineQuiz = () => {
    setShowPreQuizModal(false);
  };

  const renderStepContent = () => {
    const stepData = FUNNEL_STEPS.find(s => s.step === currentStep);

    if (!stepData) {
      return <div>Erro: Etapa não encontrada.</div>;
    }

    return (
      <StepContainer step={stepData.step}>
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

        {/* Quiz Content */}
        {stepData.quiz && (
          <div className="mt-8 max-w-lg mx-auto w-full">
            <h2 className="text-xl md:text-2xl font-semibold text-amber-400 mb-4">{stepData.quiz.question}</h2>
            {stepData.quiz.options.map((option, index) => (
              <QuizOption key={index} text={option.text} onClick={handleNextStep} />
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

        {/* Testimonial Content */}
        {stepData.testimonial && (
            <div className="mt-8 max-w-2xl mx-auto w-full">
                <blockquote className="bg-slate-800/50 border-l-4 border-amber-400 p-6 rounded-r-lg italic text-slate-300 text-left">
                    "{stepData.testimonial.text}"
                    <cite className="block not-italic mt-4 font-semibold text-white">
                        &mdash; {stepData.testimonial.author}
                    </cite>
                </blockquote>
            </div>
        )}
        
        {/* Final Offer */}
        {currentStep === 8 && (
            <div className="mt-6 max-w-4xl mx-auto w-full text-left">
                {/* Comparison Section */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    {/* Option 1: Without Method */}
                    <div className="flex-1 bg-slate-800/40 border border-red-500/30 rounded-lg p-4 transform transition-transform hover:scale-105 hover:border-red-500/50">
                        <h3 className="font-bold text-lg text-red-400 mb-3 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            OPÇÃO 1: Tentar a Sorte
                        </h3>
                        <ul className="list-none space-y-2 text-slate-300 text-sm">
                            <li>- Enfrentar <span className="font-bold text-white">500+ candidatos por vaga</span> sozinho.</li>
                            <li>- Arriscar <span className="font-bold text-white">mais 12 anos de espera</span> por uma nova chance.</li>
                            <li>- Ser um dos <span className="font-bold text-white">92% eliminados</span> pelas armadilhas da Cesgranrio.</li>
                        </ul>
                    </div>
                    {/* Option 2: With Method */}
                    <div className="flex-1 bg-slate-800 border border-amber-400/60 rounded-lg p-4 transform transition-transform hover:scale-105 hover:border-amber-400">
                         <h3 className="font-bold text-lg text-amber-300 mb-3 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            OPÇÃO 2: Decifrar a Banca
                        </h3>
                        <ul className="list-none space-y-2 text-slate-300 text-sm">
                            <li>- Ter a estratégia exata para <span className="font-bold text-white">superar a concorrência</span>.</li>
                            <li>- Transformar a espera em <span className="font-bold text-white">aprovação e posse</span>.</li>
                            <li>- Blindar-se contra as armadilhas e <span className="font-bold text-white">garantir a vaga</span>.</li>
                        </ul>
                    </div>
                </div>

                {/* Offer Section */}
                <div className="mt-6 bg-gradient-to-t from-slate-900 to-slate-800/80 border border-slate-700 rounded-xl p-5 text-center shadow-2xl shadow-black/30">
                    <h3 className="text-xl font-bold text-white">Seu Acesso Imediato à Estratégia de Aprovação</h3>
                    <div className="my-3 text-center">
                         <p className="text-lg text-slate-400 line-through">De R$ 297,00</p>
                         <p className="text-white text-sm">Por apenas 1x de</p>
                         <p className="text-3xl font-bold text-amber-400">R$ 27,90</p>
                    </div>
                    <CountdownTimer />
                </div>
            </div>
        )}


        {/* CTA Button (appears on non-quiz steps) */}
        {!stepData.quiz && (
          <>
            {/* Normal button for step 6, shown for the first 3 seconds */}
            {currentStep === 6 && !showStickyButton && (
                <div className="mt-8">
                    <div className="relative inline-block">
                        <button
                            onClick={handleNextStep}
                            className="bg-amber-400 text-slate-900 font-bold text-lg py-4 px-10 rounded-lg shadow-lg shadow-amber-500/20 transform transition-all duration-300 hover:bg-amber-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50 animate-pulse-slow"
                        >
                            {stepData.ctaText}
                        </button>
                    </div>
                </div>
            )}
            
            {/* Sticky button for step 6 (after 3s), or normal buttons for other steps */}
            {(currentStep !== 6 || (currentStep === 6 && showStickyButton)) && (
                <div className={currentStep === 6 && showStickyButton
                    ? "fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900 to-slate-900/80 backdrop-blur-sm border-t border-slate-700 z-10 animate-fade-in-up-fast" 
                    : "mt-8"
                  }>
                    <div className="relative inline-block">
                      <button
                        onClick={handleNextStep}
                        className="bg-amber-400 text-slate-900 font-bold text-lg py-4 px-10 rounded-lg shadow-lg shadow-amber-500/20 transform transition-all duration-300 hover:bg-amber-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50 animate-pulse-slow"
                      >
                        {stepData.ctaText}
                      </button>
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
    @keyframes pulse-slow {
      50% {
        box-shadow: 0 0 0 10px rgba(251, 191, 36, 0.1), 0 0 0 20px rgba(251, 191, 36, 0.05);
      }
    }
    .animate-pulse-slow {
      animation: pulse-slow 3s infinite;
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
        animation: progress-bar 6s linear forwards;
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
                    className="w-full bg-amber-400 text-slate-900 rounded-lg shadow-lg shadow-amber-500/20 transform transition-all duration-300 hover:bg-amber-300 hover:scale-105 p-4 flex flex-col items-center"
                    >
                    <span className="font-bold text-lg">
                        Sem problemas! Quero passar no concurso da Caixa.
                    </span>
                    <span className="text-sm font-medium text-slate-800/90 mt-1">
                        E garantir meu salário de R$ 16.495/mês
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
        </div>
      )}
    </>
  );
};

export default App;