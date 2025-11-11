import React, { useState } from 'react';
import ProgressBar from './components/ProgressBar';
import StepContainer from './components/StepContainer';
import QuizOption from './components/QuizOption';
import PillarCard from './components/PillarCard';
import CountdownTimer from './components/CountdownTimer';
import { FUNNEL_STEPS } from './constants';
import type { FunnelStep } from './types';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = FUNNEL_STEPS.length;

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Handle final CTA click - e.g., redirect to checkout
      console.log('Redirecting to checkout...');
      window.location.href = 'https://checkout.example.com';
    }
  };

  const renderStepContent = () => {
    const stepData = FUNNEL_STEPS.find(s => s.step === currentStep);

    if (!stepData) {
      return <div>Erro: Etapa não encontrada.</div>;
    }

    return (
      <StepContainer step={stepData.step}>
        {stepData.preheadline && (
          <p className="text-base sm:text-lg font-semibold text-amber-400 tracking-widest uppercase mb-4">
            {stepData.preheadline}
          </p>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {stepData.headline}
        </h1>
        {stepData.subheadline && (
          <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            {stepData.subheadline}
          </p>
        )}

        {/* Quiz Content */}
        {stepData.quiz && (
          <div className="mt-8 max-w-lg mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-amber-400 mb-4">{stepData.quiz.question}</h2>
            {stepData.quiz.options.map((option, index) => (
              <QuizOption key={index} text={option.text} onClick={handleNextStep} />
            ))}
          </div>
        )}

        {/* Pillars Content */}
        {stepData.pillars && (
          <div className="mt-10 flex flex-col md:flex-row gap-6">
            {stepData.pillars.map((pillar, index) => (
              <PillarCard key={index} {...pillar} />
            ))}
          </div>
        )}

        {/* Testimonial Content */}
        {stepData.testimonial && (
            <div className="mt-8 max-w-2xl mx-auto">
                <blockquote className="bg-slate-800/50 border-l-4 border-amber-400 p-6 rounded-r-lg italic text-slate-300">
                    "{stepData.testimonial.text}"
                    <cite className="block not-italic mt-4 font-semibold text-white">
                        &mdash; {stepData.testimonial.author}
                    </cite>
                </blockquote>
            </div>
        )}
        
        {/* Final Offer */}
        {currentStep === 8 && (
            <div className="mt-8 max-w-md mx-auto">
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                    <p className="text-slate-300 line-through">De: R$ 297,00</p>
                    <p className="text-5xl font-bold text-white mt-2">Por apenas 1x de R$ 19,90</p>
                    <p className="text-amber-400 mt-1">Oferta de Lançamento por tempo limitado.</p>
                </div>
                <CountdownTimer />
            </div>
        )}


        {/* CTA Button (appears on non-quiz steps) */}
        {!stepData.quiz && (
          <div className="mt-10">
            <button
              onClick={handleNextStep}
              className="bg-amber-400 text-slate-900 font-bold text-lg py-4 px-10 rounded-lg shadow-lg shadow-amber-500/20 transform transition-all duration-300 hover:bg-amber-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50 animate-pulse-slow"
            >
              {stepData.ctaText}
            </button>
          </div>
        )}
      </StepContainer>
    );
  };
  
  // Custom animation style for the button pulse
  const animationStyles = `
    @keyframes pulse-slow {
      50% {
        box-shadow: 0 0 0 10px rgba(251, 191, 36, 0.1), 0 0 0 20px rgba(251, 191, 36, 0.05);
      }
    }
    .animate-pulse-slow {
      animation: pulse-slow 3s infinite;
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>
      <div className="bg-slate-900">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        {renderStepContent()}
      </div>
    </>
  );
};

export default App;
