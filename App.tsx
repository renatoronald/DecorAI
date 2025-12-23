
import React, { useState, useCallback, useEffect } from 'react';
import ImageUploader from './components/ImageUploader';
import ComparisonView from './components/ComparisonView';
import LandingPage from './components/LandingPage';
import { decorateImage } from './services/geminiService';
import { AppStatus, DecorationResult } from './types';

const AUTO_STYLES = [
  "Estilo Moderno Minimalista",
  "Estilo Industrial Moderno",
  "Estilo Escandinavo",
  "Estilo Boho Chic com plantas",
  "Estilo Luxo Contemporâneo",
  "Estilo Japandi funcional"
];

const App: React.FC = () => {
  const [showApp, setShowApp] = useState<boolean>(false);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<DecorationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showApp]);

  const handleImageSelected = useCallback((base64: string) => {
    setOriginalImage(base64);
    setResult(null);
    setError(null);
  }, []);

  const processDecoration = async (selectedPrompt: string) => {
    if (!originalImage) {
      setError("Por favor, envie uma foto primeiro.");
      return;
    }

    setStatus(AppStatus.PROCESSING);
    setError(null);

    try {
      const decoratedImageUrl = await decorateImage(originalImage, selectedPrompt);
      const newResult: DecorationResult = {
        id: Date.now().toString(),
        originalImage,
        decoratedImage: decoratedImageUrl,
        prompt: selectedPrompt,
        timestamp: Date.now()
      };
      setResult(newResult);
      setStatus(AppStatus.SUCCESS);
      setTimeout(() => {
        document.getElementById('results-area')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } catch (err: any) {
      setError(err.message || "Erro ao processar imagem.");
      setStatus(AppStatus.ERROR);
    }
  };

  const handleDecorate = () => {
    if (!originalImage || !prompt.trim()) {
      setError("Foto e descrição são obrigatórios.");
      return;
    }
    processDecoration(prompt);
  };

  const handleAutoDecorate = () => {
    if (!originalImage) {
      setError("Envie uma foto antes de usar o estilo aleatório.");
      return;
    }
    const randomStyle = AUTO_STYLES[Math.floor(Math.random() * AUTO_STYLES.length)];
    setPrompt(randomStyle);
    processDecoration(randomStyle);
  };

  const handleReset = () => {
    setOriginalImage(null);
    setPrompt('');
    setResult(null);
    setStatus(AppStatus.IDLE);
    setError(null);
  };

  if (!showApp) {
    return <LandingPage onStart={() => setShowApp(true)} />;
  }

  const isProcessing = status === AppStatus.PROCESSING;

  return (
    <div className="min-h-screen pb-20 bg-slate-50/50 animate-fade-in">
      <nav className="glass-morphism sticky top-0 z-50 px-6 py-4 mb-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setShowApp(false)}>
            <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-house-chimney-window"></i>
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">DecorAI</h1>
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Estúdio de Design</span>
            </div>
          </div>
          <button onClick={handleReset} className="text-xs font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors flex items-center gap-2">
            <i className="fa-solid fa-rotate-left"></i>
            Limpar
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* PAINEL DE CONTROLE (ESQUERDA) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                <h3 className="font-bold text-slate-800 text-lg">Carregar Ambiente</h3>
              </div>
              <ImageUploader onImageSelected={handleImageSelected} selectedImage={originalImage} />
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                <h3 className="font-bold text-slate-800 text-lg">Definir Estilo</h3>
              </div>
              
              <div className="space-y-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Descreva o que deseja mudar... (ex: Transforme em um escritório moderno com tons de madeira)"
                  className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-blue-500 focus:bg-white outline-none text-sm h-36 resize-none transition-all placeholder:text-slate-400 font-medium"
                />
                
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleDecorate}
                    disabled={isProcessing || !originalImage || !prompt.trim()}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-100"
                  >
                    {isProcessing ? (
                      <i className="fa-solid fa-circle-notch fa-spin"></i>
                    ) : (
                      <i className="fa-solid fa-wand-magic-sparkles"></i>
                    )}
                    DECORAR AMBIENTE
                  </button>
                  
                  <button
                    onClick={handleAutoDecorate}
                    disabled={isProcessing || !originalImage}
                    className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3"
                  >
                    <i className="fa-solid fa-bolt text-blue-500"></i>
                    ESTILO ALEATÓRIO
                  </button>
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold flex items-center gap-2">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* PAINEL DE RESULTADO (DIREITA) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 min-h-[600px] flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">3</span>
                <h3 className="font-bold text-slate-800 text-lg">Projeto Finalizado</h3>
              </div>

              {!result && !isProcessing && (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-slate-100 rounded-3xl">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-200">
                    <i className="fa-solid fa-images text-4xl"></i>
                  </div>
                  <h4 className="text-slate-400 font-bold text-lg mb-2">Seu projeto aparecerá aqui</h4>
                  <p className="text-slate-300 text-sm max-w-xs font-medium">Use os controles à esquerda para iniciar sua transformação.</p>
                </div>
              )}

              {isProcessing && (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 border-4 border-blue-50 border-t-blue-600 rounded-full animate-spin"></div>
                    <i className="fa-solid fa-sparkles absolute inset-0 flex items-center justify-center text-blue-600 text-2xl animate-pulse"></i>
                  </div>
                  <h4 className="text-xl font-bold text-slate-800">IA Gerando Decoração</h4>
                  <p className="text-slate-400 font-medium text-sm mt-2">Estamos renderizando seu novo ambiente...</p>
                </div>
              )}

              {result && !isProcessing && (
                <div id="results-area" className="flex-1 flex flex-col animate-fade-in">
                  <ComparisonView original={result.originalImage} decorated={result.decoratedImage} />
                  
                  <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = result.decoratedImage;
                        link.download = `projeto-decorai-${Date.now()}.png`;
                        link.click();
                      }}
                      className="flex-[2] bg-slate-900 hover:bg-black text-white font-black py-4 px-8 rounded-2xl flex items-center justify-center gap-3 shadow-xl transition-all active:scale-[0.98]"
                    >
                      <i className="fa-solid fa-cloud-arrow-down"></i> BAIXAR EM ALTA RESOLUÇÃO
                    </button>
                    <button 
                      onClick={handleReset}
                      className="flex-1 bg-white hover:bg-red-50 border border-slate-200 text-slate-500 hover:text-red-500 font-bold py-4 px-8 rounded-2xl transition-all"
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
      
      <footer className="mt-20 text-center text-slate-400 py-10 border-t border-slate-100">
        <p className="text-[10px] font-black uppercase tracking-[0.3em]">
          Desenvolvido por Renato Monteiro • 2025 • DecorAI Studio
        </p>
      </footer>
    </div>
  );
};

export default App;
