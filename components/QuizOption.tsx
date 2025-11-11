
import React from 'react';

interface QuizOptionProps {
  text: string;
  onClick: () => void;
}

const QuizOption: React.FC<QuizOptionProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-slate-800 border border-slate-700 rounded-lg p-4 my-2 text-slate-300 hover:bg-slate-700 hover:border-amber-400 hover:text-white transition-all duration-300 transform hover:scale-105"
    >
      {text}
    </button>
  );
};

export default QuizOption;
