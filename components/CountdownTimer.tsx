
import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const initialTime = 15 * 60; // 15 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-slate-800 border border-amber-400/50 rounded-lg p-3 my-6 flex items-center justify-center space-x-4">
        <p className='text-white font-medium'>Esta oferta expira em:</p>
        <div className="text-2xl font-bold text-amber-400 tracking-wider">
            <span>{String(minutes).padStart(2, '0')}</span>
            <span>:</span>
            <span>{String(seconds).padStart(2, '0')}</span>
        </div>
    </div>
  );
};

export default CountdownTimer;
