
import React from 'react';
import { Notam, NotamType } from '../types';

interface NotamCardProps {
  notam: Notam;
}

const NotamCard: React.FC<NotamCardProps> = ({ notam }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'border-red-500 bg-red-500/10 text-red-200';
      case 'WARNING': return 'border-amber-500 bg-amber-500/10 text-amber-200';
      default: return 'border-blue-500 bg-blue-500/10 text-blue-200';
    }
  };

  const getTagColor = (type: string) => {
    switch (type) {
      case NotamType.AGA: return 'bg-purple-600';
      case NotamType.ANS: return 'bg-emerald-600';
      case NotamType.COM: return 'bg-sky-600';
      case NotamType.MET: return 'bg-orange-600';
      case NotamType.ATM: return 'bg-indigo-600';
      default: return 'bg-slate-600';
    }
  };

  return (
    <div className={`p-4 rounded-lg border-l-4 shadow-md transition-all duration-300 ${getLevelColor(notam.level)}`}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-bold mono bg-slate-800 px-2 py-1 rounded text-white">
          {notam.id}
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase text-white ${getTagColor(notam.type)}`}>
          {notam.type}
        </span>
      </div>
      
      <p className="text-sm font-medium leading-relaxed mb-3">
        {notam.summary}
      </p>

      <div className="bg-slate-900/50 p-2 rounded mb-3">
        <p className="text-[10px] mono text-slate-400 break-words leading-tight">
          {notam.rawText}
        </p>
      </div>

      <div className="flex items-center justify-between text-[10px] opacity-70">
        <div className="flex flex-col">
          <span className="uppercase font-bold">Desde</span>
          <span>{new Date(notam.validity.from).toLocaleString('es-AR')}</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="uppercase font-bold">Hasta</span>
          <span>{new Date(notam.validity.to).toLocaleString('es-AR')}</span>
        </div>
      </div>
    </div>
  );
};

export default NotamCard;
