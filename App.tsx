
import React, { useState, useCallback, useEffect } from 'react';
import ImageUploader from './components/ImageUploader';
import ComparisonView from './components/ComparisonView';
import LandingPage from './components/LandingPage';
import { decorateImage } from './services/geminiService';
import { AppStatus, DecorationResult } from './types';

// The AIStudio and Window types are removed because they are provided by the environment,
// and re-declaring them was causing duplicate identifier errors.

const QUICK_STYLES = [
  { label: "Moderno Minimalista", prompt: "Estilo minimalista com cores neutras, poucos móveis de design e luz natural abundante." },
  { label: "Industrial", prompt: "Estilo industrial com paredes de tijolos, móveis de metal e couro, tubulações aparentes e luz quente." },
  { label: "Biofílico", prompt: "Design biofílico com muitas plantas, materiais naturais como madeira clara e pedras, criando uma selva urbana." },
  { label: "Luxo Clássico", prompt: "Estilo luxuoso clássico com molduras na paredes, mármore, detalhes em ouro e tecidos de veludo." },
  { label: "Escandinavo", prompt: "Design escandinavo funcional, limpo, com madeira clara e tons de cinza e branco." },
  { label: "Cyberpunk 2077", prompt: "Estilo futurista cyberpunk com neon, tons de azul e roxo, móveis high-tech e clima noturno." }
];

const App: React.FC = () => {
  const [showApp, setShowApp] = useState<boolean>(false);
  const [hasKey, setHasKey] = useState<boolean>(true);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<DecorationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fix for API key checking logic using window.aistudio
  useEffect(() => {
    const checkKey = async () => {
      // @ts-ignore: aistudio is provided by the environment
      if (window.aistudio) {
        // @ts-ignore
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    if (showApp) {
      checkKey();
      window.scrollTo(0, 0);
    }
  }, [showApp]);

  // Handle opening the key selector and mitigating race conditions as per guidelines
  const handleOpenKeySelector = async () => {
    // @ts-ignore: aistudio is provided by the environment
    if (window.aistudio) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      // Assume the key selection was successful to avoid race conditions
      setHasKey(true);
    }
  };

  const processDecoration = async (selectedPrompt: string) => {
    if (!originalImage) return;

    setStatus(AppStatus.PROCESSING);
    setError(null);

    try {
      const decoratedImageUrl = await decorateImage(originalImage, selectedPrompt);
      setResult({
        id: Date.now().toString(),
        originalImage,
        decoratedImage: decoratedImageUrl,
        prompt: selectedPrompt,
        timestamp: Date.now()
      });
      setStatus(AppStatus.SUCCESS);
      setTimeout(() => {
        document.getElementById('results-area')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } catch (err: any) {
      // If the request fails with this specific error, reset key selection state
      if (err.message?.includes("Requested entity was not found")) setHasKey(false);
      setError(err.message || "Falha na geração.");
      setStatus(AppStatus.ERROR);
    }
  };

  const handleDecorate = () => {
    if (!originalImage || !prompt.trim()) {
      setError("Preencha a descrição ou escolha um estilo.");
      return;
    }
    processDecoration(prompt);
  };

  const handleReset = () => {
    setOriginalImage(null);
    setPrompt('');
    setResult(null);
    setStatus(AppStatus.IDLE);
    setError(null);
  };

  if (!showApp) return <LandingPage onStart={() => setShowApp(true)} />;

  const isProcessing = status === AppStatus.PROCESSING;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col animate-fade-in">
      {/* NAVBAR */}
      <nav className="glass-morphism sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowApp(false)}>
            <div className="bg-slate-900 p-2 rounded-xl text-white shadow-lg">
              <i className="fa-solid fa-house-chimney-window"></i>
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">DecorAI</h1>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Powered by Gemini</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {!hasKey && (
              <button onClick={handleOpenKeySelector} className="text-[10px] font-black bg-red-100 text-red-600 px-3 py-1.5 rounded-lg flex items-center gap-2">
                <i className="fa-solid fa-key"></i> CONFIGURAR API
              </button>
            )}
            <button onClick={handleReset} className="text-xs font-bold text-slate-400 hover:text-red-500 flex items-center gap-2 transition-colors">
              <i className="fa-solid fa-rotate-left"></i> RECOMEÇAR
            </button>
          </div>
        </div>
      </nav>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* PAINEL ESQUERDO: INPUTS */}
          <div className="lg:col-span-5 space-y-8">
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px]">01</span>
                Ambiente Atual
              </h3>
              <ImageUploader onImageSelected={setOriginalImage} selectedImage={originalImage} />
            </section>

            <section className={`bg-white rounded-3xl p-8 shadow-sm border border-slate-200 transition-all ${!originalImage ? 'opacity-50' : 'opacity-100'}`}>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px]">02</span>
                Visão de Design
              </h3>
              
              <div className="space-y-6">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={!originalImage || isProcessing}
                  placeholder="Ex: Transforme em uma sala industrial moderna com sofá cinza e plantas..."
                  className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 focus:border-slate-900 outline-none text-sm h-32 resize-none transition-all"
                />

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">Estilos Rápidos</label>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_STYLES.map((style) => (
                      <button
                        key={style.label}
                        onClick={() => setPrompt(style.prompt)}
                        disabled={!originalImage || isProcessing}
                        className="px-4 py-2 bg-slate-50 hover:bg-slate-200 rounded-full text-xs font-bold text-slate-600 transition-all border border-slate-100"
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleDecorate}
                  disabled={isProcessing || !originalImage || !prompt.trim() || !hasKey}
                  className="w-full bg-slate-900 hover:bg-black disabled:bg-slate-200 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                >
                  {isProcessing ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
                  {isProcessing ? "Renderizando..." : "Aplicar Decoração"}
                </button>

                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold flex items-center gap-3">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    {error}
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* PAINEL DIREITO: RESULTADO */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-4 md:p-10 shadow-sm border border-slate-200 min-h-[600px] flex flex-col sticky top-28">
              {!result && !isProcessing && (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 text-slate-200 animate-pulse">
                    <i className="fa-solid fa-palette text-5xl"></i>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-2">Pronto para a transformação?</h4>
                  <p className="text-slate-400 text-sm max-w-xs mx-auto">Envie sua foto e descreva seu sonho para ver a mágica da IA acontecer.</p>
                </div>
              )}

              {isProcessing && (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin"></div>
                    <i className="fa-solid fa-sparkles absolute inset-0 flex items-center justify-center text-slate-900 text-2xl"></i>
                  </div>
                  <h4 className="text-xl font-black text-slate-900">Arquiteto de IA Trabalhando</h4>
                  <p className="text-slate-400 text-sm mt-3 animate-pulse italic">Analisando iluminação e mobiliário...</p>
                </div>
              )}

              {result && !isProcessing && (
                <div id="results-area" className="flex-1 animate-fade-in flex flex-col">
                  <ComparisonView original={result.originalImage} decorated={result.decoratedImage} />
                  
                  <div className="mt-12 flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-100">
                    <button 
                      onClick={() => {
                        const a = document.createElement('a');
                        a.href = result.decoratedImage;
                        a.download = `DecorAI-${Date.now()}.png`;
                        a.click();
                      }}
                      className="flex-[2] bg-slate-900 text-white font-black py-5 px-10 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      <i className="fa-solid fa-download"></i> SALVAR PROJETO EM HD
                    </button>
                    <button 
                      onClick={handleReset}
                      className="flex-1 bg-white border border-slate-200 text-slate-500 font-black py-5 px-10 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all"
                    >
                      DESCARTAR
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER ASSINATURA */}
      <footer className="mt-20 py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-[1px] bg-slate-200"></div>
            <i className="fa-solid fa-gem text-slate-300 text-[10px]"></i>
            <div className="w-8 h-[1px] bg-slate-200"></div>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
            Desenvolvido por <span className="text-slate-900">Renato Monteiro</span> • 2025
          </p>
          <p className="text-[9px] font-medium text-slate-300 mt-2 italic">
            DecorAI Studio • Inteligência Artificial para Arquitetura & Design
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
