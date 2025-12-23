
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      {/* Background Decorativo - Blobs de gradiente suaves */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-50/50 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-indigo-50/50 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-[20%] w-[30%] h-[30%] bg-blue-50/30 rounded-full blur-[100px]"></div>
      </div>

      {/* Header na Home */}
      <nav className="relative z-50 px-6 py-6 max-w-7xl mx-auto flex justify-between items-center animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-2xl text-white shadow-xl shadow-blue-200 ring-4 ring-white">
            <i className="fa-solid fa-house-chimney-window text-xl"></i>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">DecorAI</h1>
        </div>
        <button 
          onClick={onStart}
          className="text-slate-600 font-bold hover:text-blue-600 transition-all hover:bg-blue-50 px-5 py-2.5 rounded-xl border border-transparent hover:border-blue-100"
        >
          Acessar Estúdio
        </button>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-8 md:pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Lado Esquerdo: Texto e Ação */}
          <div className="space-y-10 animate-slide-left">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600/5 text-blue-700 rounded-full text-sm font-extrabold border border-blue-600/10 uppercase tracking-wider">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              A Nova Era do Design de Interiores
            </div>
            
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.02]">
              Redecore com <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">uma única foto.</span>
            </h2>
            
            <p className="text-xl text-slate-500 max-w-xl leading-relaxed font-medium">
              Transforme ambientes vazios ou desatualizados em projetos de revista instantaneamente. Nossa IA entende seu espaço e aplica o estilo dos seus sonhos em segundos.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <button 
                onClick={onStart}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-6 px-12 rounded-[2rem] shadow-2xl shadow-blue-400/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4 group"
              >
                Começar agora
                <i className="fa-solid fa-wand-magic-sparkles group-hover:rotate-12 transition-transform"></i>
              </button>
              
              <div className="flex flex-col justify-center">
                <div className="flex -space-x-3 mb-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/150?u=user${i}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-bold text-slate-400">
                  <span className="text-blue-600">+5.000</span> projetos gerados
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito: Preview de IA */}
          <div className="relative animate-slide-up delay-200">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-[12px] border-white ring-1 ring-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1616489953149-755e74f2e93d?auto=format&fit=crop&w=1200&q=80" 
                alt="Exemplo de Transformação" 
                className="w-full h-[500px] object-cover"
              />
              {/* Overlay de Status da IA */}
              <div className="absolute inset-x-6 bottom-8 bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] flex items-center justify-between border border-white/50 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                    <i className="fa-solid fa-sparkles text-2xl"></i>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Status da Renderização</div>
                    <div className="text-xl font-black text-slate-900">Estilo Moderno Boho</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-emerald-500 font-black flex items-center gap-1.5">
                    <i className="fa-solid fa-bolt text-xs"></i> 100%
                  </span>
                  <span className="text-slate-400 text-[10px] font-bold">CONCLUÍDO</span>
                </div>
              </div>
            </div>

            {/* Badges Flutuantes Decorativos */}
            <div className="absolute -top-10 -right-8 bg-white p-5 rounded-3xl shadow-2xl flex items-center gap-3 animate-bounce duration-[5000ms] border border-slate-100">
              <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-camera"></i>
              </div>
              <span className="font-bold text-slate-700">Fotorrealista</span>
            </div>
            
            <div className="absolute -bottom-6 -left-10 bg-white p-5 rounded-3xl shadow-2xl flex items-center gap-3 animate-pulse border border-slate-100 hidden md:flex">
              <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-brain"></i>
              </div>
              <span className="font-bold text-slate-700">IA Inteligente</span>
            </div>
          </div>
        </div>

        {/* Passos Rápidos */}
        <section className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12 animate-slide-up delay-400">
          {[
            { 
              icon: "fa-camera-retro", 
              title: "Tire uma foto", 
              desc: "Capture seu ambiente de qualquer ângulo, a IA cuida da perspectiva.",
              color: "bg-blue-100 text-blue-600"
            },
            { 
              icon: "fa-palette", 
              title: "Escolha o estilo", 
              desc: "Descreva seus desejos ou escolha entre dezenas de estilos curados.",
              color: "bg-purple-100 text-purple-600"
            },
            { 
              icon: "fa-check-double", 
              title: "Baixe o Projeto", 
              desc: "Receba o resultado em alta definição e pronto para ser executado.",
              color: "bg-emerald-100 text-emerald-600"
            }
          ].map((step, idx) => (
            <div key={idx} className="group p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500">
              <div className={`${step.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform`}>
                <i className={`fa-solid ${step.icon}`}></i>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="bg-slate-50 py-16 border-t border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2 rounded-xl text-white">
              <i className="fa-solid fa-house-chimney-window"></i>
            </div>
            <span className="font-black text-slate-900 tracking-tighter">DECORAI STUDIO</span>
          </div>
          <div className="text-slate-400 font-bold text-xs uppercase tracking-widest">
            Desenvolvido com IA de Próxima Geração • 2024
          </div>
          <div className="flex gap-6 text-slate-400">
            <i className="fa-brands fa-instagram text-xl hover:text-blue-600 cursor-pointer transition-colors"></i>
            <i className="fa-brands fa-pinterest text-xl hover:text-red-500 cursor-pointer transition-colors"></i>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
