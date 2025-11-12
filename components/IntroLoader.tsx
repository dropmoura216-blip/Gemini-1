

import React, { useState, useEffect } from 'react';

const IntroLoader: React.FC = () => {
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        // Start fade out before the component is unmounted in App.tsx
        const timer = setTimeout(() => {
            setIsFadingOut(true);
        }, 3500); // Start fade out after 3.5 seconds

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className={`fixed inset-0 bg-gradient-to-br from-slate-900 to-[#020420] flex flex-col items-center justify-center z-[100] ${isFadingOut ? 'animate-intro-fade-out' : 'animate-bg-pan'}`}>
            <div className="text-center p-4">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight animate-intro-fade-in-scale">
                    Método Cesgranrio Decifrado
                </h1>
                <p 
                    className="text-lg sm:text-xl text-slate-300 font-medium mt-6 animate-intro-fade-in-up" 
                    style={{ animationDelay: '0.5s' }}
                >
                    A oportunidade que Engenheiros(as) Civis esperaram por <span className="font-bold text-amber-300">12 anos</span>.
                </p>
                <div 
                    className="mt-4 animate-intro-fade-in-up" 
                    style={{ animationDelay: '1.2s' }}
                >
                    <p className="text-xl sm:text-2xl text-amber-300 font-bold">
                        Salário de R$ 16.495/mês
                    </p>
                    <p className="text-base sm:text-lg text-slate-300 font-medium">
                        + R$ 2.000 de Vale Alimentação
                    </p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-2 bg-slate-700/50">
                <div className="h-full bg-amber-400 animate-progress-bar"></div>
            </div>
        </div>
    );
};

export default IntroLoader;