import React from 'react';
import type { QuizOption as QuizOptionType } from '../types';

interface QuizOptionProps {
  text: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

const QuizOption: React.FC<QuizOptionProps> = ({ text, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left bg-slate-800 border border-slate-700 rounded-lg p-4 my-2 text-base text-slate-200 hover:bg-slate-700 hover:border-green-400 hover:text-white transition-[transform,border-color,background-color] duration-300 transform hover:scale-105 active:scale-100 hover:shadow-lg hover:shadow-green-500/20 will-change-[transform,border-color]"
    >
      <div className="flex items-center gap-4">
        {icon && (
          <div className="flex-shrink-0">
            {icon}
          </div>
        )}
        <span className="flex-grow">{text}</span>
      </div>
    </button>
  );
};

export default QuizOption;
