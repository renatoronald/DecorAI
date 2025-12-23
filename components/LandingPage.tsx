
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white overflow-hidden relative font-['Inter']">
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-50/50 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-indigo-50/50 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-[20%] w-[30%] h-[30%] bg-blue-50/30 rounded-full blur-[100px]"></div>
      </div>

      {/* Header na Home */}
      <nav className="relative z-50 px-6 py-8 max-w-7xl mx-auto flex justify-between items-center animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-2xl text-white shadow-xl shadow-blue-200">
            <i className="fa-solid fa-house-chimney-window text-xl"></i>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">DecorAI</h1>
        </div>
        <button 
          onClick={onStart}
          className="text-slate-600 font-bold hover:text-blue-600 transition-all px-6 py-3 rounded-xl hover:bg-blue-50"
        >
          Acessar Estúdio
        </button>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 md:pt-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Lado Esquerdo */}
          <div className="space-y-10 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              IA de Decoração Profissional
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.95]">
              Redecore com <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">uma foto.</span>
            </h2>
            
            <p className="text-xl text-slate-500 max-w-lg leading-relaxed font-medium">
              Nossa inteligência artificial analisa seu ambiente e aplica o estilo que você descrever em poucos segundos. Fotorrealista e instantâneo.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <button 
                onClick={onStart}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-black py-6 px-14 rounded-3xl shadow-2xl shadow-blue-400/30 transition-all hover:scale-[1.05] active:scale-95 flex items-center justify-center gap-4 group"
              >
                Começar Projeto
                <i className="fa-solid fa-wand-magic-sparkles group-hover:rotate-12 transition-transform"></i>
              </button>
              
              <div className="flex flex-col justify-center">
                <div className="flex -space-x-3 mb-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/150?u=decor${i}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span className="text-blue-600">+10k</span> Projetos Realizados
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito */}
          <div className="relative animate-slide-up">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white">
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80" 
                alt="Living Room Decoration" 
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                      <i className="fa-solid fa-sparkles"></i>
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900">Moderno Minimalista</h4>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Renderizado por IA</p>
                    </div>
                  </div>
                  <div className="text-emerald-500 font-black">
                    100% OK
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-slate-900 p-2.5 rounded-xl text-white">
              <i className="fa-solid fa-house-chimney-window"></i>
            </div>
            <span className="font-black text-slate-900 tracking-tighter text-xl">DECORAI STUDIO</span>
          </div>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2">
            Desenvolvedor: Renato Monteiro • 2025
          </p>
          <p className="text-slate-300 text-[10px] font-medium italic">
            Transformando visões em realidade com Gemini 2.5
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
