
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-indigo-50 rounded-full blur-[100px] opacity-40"></div>
      </div>

      {/* Header Simplificado na Home */}
      <nav className="relative z-10 px-6 py-6 max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
            <i className="fa-solid fa-house-chimney-window text-xl"></i>
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">DecorAI</h1>
        </div>
        <button 
          onClick={onStart}
          className="text-slate-600 font-bold hover:text-blue-600 transition-colors"
        >
          Acessar App
        </button>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Lado Esquerdo: Conteúdo */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold border border-blue-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Design de Interiores com IA
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05]">
              Redecore seu <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">espaço favorito</span> <br />
              em segundos.
            </h2>
            
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed font-medium">
              Não imagine como sua sala ficaria com um novo estilo. Veja agora! Envie uma foto e deixe nossa IA profissional criar o cenário dos seus sonhos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={onStart}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-5 px-10 rounded-2xl shadow-xl shadow-blue-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                Começar Transformação
                <i className="fa-solid fa-arrow-right"></i>
              </button>
              <div className="flex items-center gap-3 px-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-semibold text-slate-500">
                  +2.5k pessoas decorando
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito: Visual/Mockup */}
          <div className="relative animate-in fade-in zoom-in duration-1000 delay-200">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80" 
                alt="Exemplo de decoração" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-check-double text-xl"></i>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Estilo Aplicado</div>
                    <div className="text-lg font-bold text-slate-800">Escandinavo Moderno</div>
                  </div>
                </div>
                <div className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold">1.2s</div>
              </div>
            </div>

            {/* Elementos flutuantes */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce duration-[3000ms]">
              <i className="fa-solid fa-couch text-blue-600 text-2xl"></i>
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-3 hidden md:flex">
              <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
              </div>
              <span className="font-bold text-slate-700">IA de Alta Precisão</span>
            </div>
          </div>
        </div>

        {/* Features Rápidas */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
              <i className="fa-solid fa-camera-retro text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800">Tire uma Foto</h3>
            <p className="text-slate-500 font-medium">Basta carregar uma imagem do seu cômodo atual. Não precisa de medidas complexas.</p>
          </div>
          <div className="space-y-4">
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
              <i className="fa-solid fa-comment-dots text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800">Descreva seu Estilo</h3>
            <p className="text-slate-500 font-medium">Diga o que você quer mudar ou use nossas sugestões automáticas de especialistas.</p>
          </div>
          <div className="space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
              <i className="fa-solid fa-cloud-arrow-down text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800">Baixe o Resultado</h3>
            <p className="text-slate-500 font-medium">Receba uma renderização fotorrealista pronta para salvar e compartilhar.</p>
          </div>
        </div>
      </main>

      {/* Footer Minimalista */}
      <footer className="bg-slate-50 py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-400 font-medium tracking-wide">
            © 2024 DECORAI STUDIO • TRANSFORMANDO ESPAÇOS COM INTELIGÊNCIA ARTIFICIAL
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
