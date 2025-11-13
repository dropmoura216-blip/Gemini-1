
import React, { useState, useEffect } from 'react';
import type { SessionData } from '../types';
import { getAnalytics, clearAnalytics } from '../services/trackingService';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ isOpen, onClose }) => {
  const [analyticsData, setAnalyticsData] = useState<SessionData | null>(null);
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAnalyticsData(getAnalytics());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyToClipboard = () => {
    if (analyticsData) {
      navigator.clipboard.writeText(JSON.stringify(analyticsData, null, 2))
        .then(() => {
          setCopySuccess('Copiado!');
          setTimeout(() => setCopySuccess(''), 2000);
        })
        .catch(err => {
          setCopySuccess('Falha ao copiar.');
          setTimeout(() => setCopySuccess(''), 2000);
        });
    }
  };

  const handleClearData = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os dados de análise desta sessão?')) {
        clearAnalytics();
        setAnalyticsData(null);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 animate-fade-in-fast" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-2xl w-full text-left shadow-2xl flex flex-col max-h-[90vh] animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-amber-400">Dados de Análise da Sessão</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 overflow-auto flex-grow border border-slate-700">
          <pre className="text-xs text-slate-300 whitespace-pre-wrap break-all">
            {analyticsData ? JSON.stringify(analyticsData, null, 2) : 'Nenhum dado coletado ainda.'}
          </pre>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <button onClick={handleCopyToClipboard} className="flex-1 bg-amber-400 text-slate-900 font-bold py-2 px-4 rounded-lg hover:bg-amber-300 transition-colors">
              {copySuccess || 'Copiar JSON'}
            </button>
             <button onClick={handleClearData} className="flex-1 bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-500 transition-colors">
              Limpar Dados
            </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsModal;
