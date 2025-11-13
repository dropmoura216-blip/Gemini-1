import React from 'react';

interface StepContainerProps {
  children: React.ReactNode;
  step: number;
}

const StepContainer: React.FC<StepContainerProps> = ({ children, step }) => {
  const stepSpecificClasses = () => {
    if (step === 1) {
      return 'pb-24'; // Optically center hero content higher
    }
    if (step === 6) {
      return 'pt-16 pb-32'; // Add padding top for balance and bottom for sticky cta
    }
    if (step === 8) {
      return 'pt-16'; // Push step content down for better visual balance
    }
    if (step === 9) {
      return 'pt-16 pb-24'; // Add padding for better spacing on final offer
    }
    return '';
  };
  
  return (
    <div 
      key={step} 
      className={`min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center bg-gradient-to-br from-slate-900 to-[#020420] text-white animate-fade-in ${stepSpecificClasses()}`}
    >
      <div className="max-w-2xl w-full flex flex-col items-center">
        {children}
      </div>
    </div>
  );
};

// Add fade-in animation to tailwind config if not present
// For this standalone component, let's define it in a style tag in index.html or here for simplicity
// In a real project, this would be in a global CSS or tailwind.config.js
const AnimationStyles = () => (
    <style>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fadeIn 0.7s ease-out forwards;
      }
    `}</style>
);
// This is a bit of a hack for this environment. In a real build, we'd configure tailwind.
// For now, we assume the style is injected globally.

export default StepContainer;