

import React, { useState, useEffect } from 'react';

const IntroLoader: React.FC = () => {
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFadingOut(true);
        }, 2500); // Start fade out after 2.5 seconds

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className={`fixed inset-0 bg-gradient-to-br from-slate-900 to-[#020420] flex flex-col items-center justify-center z-[100] ${isFadingOut ? 'animate-intro-fade-out' : 'animate-bg-pan'}`}>
            <div className="text-center p-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight animate-intro-fade-in-scale">
                    Metodo Cesgranrio Decifrado
                </h1>
                <p 
                    className="text-2xl sm:text-3xl text-amber-300 font-medium mt-4 animate-intro-fade-in-up" 
                    style={{ animationDelay: '0.4s' }}
                >
                    para Engenheiros(as) Civis
                </p>
            </div>
        </div>
    );
};

export default IntroLoader;