
import React from 'react';

interface ComparisonViewProps {
  original: string;
  decorated: string;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ original, decorated }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Original</label>
        <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-video bg-slate-100">
          <img src={original} alt="Original" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-blue-500 uppercase tracking-wider flex items-center gap-2">
          <i className="fa-solid fa-sparkles"></i> Resultado DecorAI
        </label>
        <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-100 aspect-video bg-slate-100">
          <img src={decorated} alt="Decorated" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;
