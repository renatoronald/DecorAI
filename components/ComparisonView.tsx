
import React from 'react';

interface ComparisonViewProps {
  original: string;
  decorated: string;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ original, decorated }) => {
  return (
    <div className="space-y-10 w-full">
      <div className="group relative">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-4 bg-slate-200 rounded-full"></div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado Original</label>
        </div>
        <div className="rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 bg-slate-100 aspect-video md:aspect-[16/10]">
          <img src={original} alt="Original" className="w-full h-full object-cover grayscale-[0.3]" />
        </div>
      </div>
      
      <div className="group relative">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-4 bg-slate-900 rounded-full"></div>
          <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
            Novo Design Aplicado <i className="fa-solid fa-sparkles text-amber-500"></i>
          </label>
        </div>
        <div className="rounded-[2rem] overflow-hidden shadow-2xl border-2 border-white bg-white aspect-video md:aspect-[16/10]">
          <img src={decorated} alt="Decorated" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;
