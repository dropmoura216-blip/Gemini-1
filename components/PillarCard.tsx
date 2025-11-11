import React from 'react';
import type { Pillar } from '../types';

const PillarCard: React.FC<Pillar> = ({ icon, title, description }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 flex flex-col items-center text-center space-y-3 flex-1 min-w-[260px]">
      {icon}
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-base text-slate-300">{description}</p>
    </div>
  );
};

export default PillarCard;