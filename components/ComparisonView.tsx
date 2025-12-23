
import React from 'react';

interface ComparisonViewProps {
  original: string;
  decorated: string;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ original, decorated }) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Antes: Original</label>
        </div>
        <div className="rounded-[1.5rem] overflow-hidden shadow-md border border-slate-100 aspect-video bg-slate-50">
          <img src={original} alt="Original" className="w-full h-full object-cover grayscale-[0.2]" />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">
            <i className="fa-solid fa-sparkles"></i> Depois: Transformado por IA
          </label>
        </div>
        <div className="rounded-[1.5rem] overflow-hidden shadow-2xl border-4 border-blue-50 aspect-video bg-white">
          <img src={decorated} alt="Decorated" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;
