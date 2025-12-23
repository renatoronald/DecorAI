
import React, { useState, useCallback } from 'react';
import ImageUploader from './components/ImageUploader';
import ComparisonView from './components/ComparisonView';
import LandingPage from './components/LandingPage';
import { decorateImage } from './services/geminiService';
import { AppStatus, DecorationResult } from './types';

const AUTO_STYLES = [
  "Estilo Moderno Minimalista com tons neutros, iluminação suave e móveis contemporâneos.",
  "Estilo Industrial com paredes de tijolos aparentes, detalhes em metal preto e couro.",
  "Estilo Escandinavo, muita luz natural, madeira clara e ambiente aconchegante.",
  "Estilo Boho Chic com muitas plantas, texturas naturais, tapetes coloridos e clima relaxado.",
  "Estilo Luxo Contemporâneo com mármore, detalhes em dourado e móveis de alto padrão.",
  "Estilo Rústico Moderno fundindo madeira bruta com elementos de design limpo.",
  "Estilo Japandi, misturando o minimalismo japonês com a funcionalidade escandinava."
];

const App: React.FC = () => {
  const [showApp, setShowApp] = useState(false);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<DecorationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = useCallback((base64: string) => {
    setOriginalImage(base64);
    setResult(null);
    setError(null);
  }, []);

  const processDecoration = async (selectedPrompt: string) => {
    if (!originalImage) {
      setError("Por favor, envie uma foto primeiro para que possamos decorá-la.");
      window.scrollTo({ top: 200, behavior: 'smooth' });
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
      setError(err.message || "Ocorreu um erro ao processar seu pedido.");
      setStatus(AppStatus.ERROR);
    }
  };

  const handleDecorate = () => {
    if (!originalImage) {
      setError("Por favor, envie uma foto primeiro.");
      return;
    }
    if (!prompt.trim()) {
      return;
    }
    processDecoration(prompt);
  };

  const handleAutoDecorate = () => {
    if (!originalImage) {
      setError("Por favor, envie uma foto primeiro no Passo 1 para usar a Decoração Automática.");
      const uploader = document.querySelector('.cursor-pointer.border-dashed');
      uploader?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

  const handleDownload = async () => {
    if (!result) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = result.decoratedImage;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const fontSize = Math.max(24, canvas.width * 0.04);
      ctx.font = `bold ${fontSize}px 'Inter', sans-serif`;
      
      ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      
      const text = "Decorado com DecorAI";
      const metrics = ctx.measureText(text);
      
      const paddingX = canvas.width * 0.04;
      const paddingY = canvas.height * 0.06;
      
      ctx.fillText(
        text, 
        canvas.width - metrics.width - paddingX, 
        canvas.height - paddingY
      );

      const watermarkedUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `decorai_projeto_${Date.now()}.png`;
      link.href = watermarkedUrl;
      link.click();
    };
  };

  if (!showApp) {
    return <LandingPage onStart={() => setShowApp(true)} />;
  }

  const isDecorateDisabled = status === AppStatus.PROCESSING || !originalImage || !prompt.trim();
  const isAutoDecorateDisabled = status === AppStatus.PROCESSING;

  return (
    <div className="min-h-screen pb-20 selection:bg-blue-100 selection:text-blue-900 bg-slate-50/30">
      <nav className="backdrop-blur-md bg-white/70 sticky top-0 z-50 px-6 py-4 mb-8 border-b border-slate-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setShowApp(false)}
          >
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2.5 rounded-xl text-white shadow-lg shadow-blue-200 ring-2 ring-white/20">
              <i className="fa-solid fa-house-chimney-window text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-none">DecorAI</h1>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">IA Design Studio</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold">
              <i className="fa-solid fa-circle-check text-emerald-500"></i>
              Powered by Gemini
            </div>
            <div className="h-4 w-px bg-slate-200"></div>
            <p className="text-slate-400 font-medium text-xs">Transformação fotorrealista</p>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6">
        <section className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-[1.1]">
            Redecore sua casa <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">usando apenas uma foto</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Mude móveis, cores e estilos instantaneamente. Carregue uma imagem e deixe nossa inteligência artificial fazer o resto.
          </p>
        </section>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 p-6 md:p-10 border border-slate-100 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
          
          <div className="space-y-10 relative z-10">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-200">1</div>
                <h3 className="text-xl font-bold text-slate-800">Selecione seu ambiente</h3>
              </div>
              <ImageUploader 
                onImageSelected={handleImageSelected} 
                selectedImage={originalImage} 
              />
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-200">2</div>
                <h3 className="text-xl font-bold text-slate-800">Como você quer decorar?</h3>
              </div>
              <div className="relative group">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ex: Transforme em uma sala moderna com tons pastéis, adicione um sofá de veludo azul e muitas plantas..."
                  className="w-full p-6 rounded-[1.5rem] border-2 border-slate-100 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all min-h-[120px] bg-slate-50 text-slate-800 placeholder:text-slate-400 font-medium"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4 mt-8">
                <button
                  onClick={handleDecorate}
                  disabled={isDecorateDisabled}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
                >
                  {status === AppStatus.PROCESSING ? (
                    <>
                      <i className="fa-solid fa-circle-notch fa-spin"></i>
                      Processando...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-wand-magic-sparkles"></i>
                      Decorar agora
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleAutoDecorate}
                  disabled={isAutoDecorateDisabled}
                  className="bg-white hover:bg-slate-50 border-2 border-blue-600 text-blue-600 font-bold py-4 px-8 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-lg"
                >
                  <i className="fa-solid fa-bolt"></i>
                  Surpreenda-me!
                </button>
              </div>

              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 text-sm font-semibold">
                  <i className="fa-solid fa-circle-exclamation text-lg"></i>
                  {error}
                </div>
              )}
            </section>

            {(result || status === AppStatus.PROCESSING) && (
              <section id="results-area" className="pt-10 border-t border-slate-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-200">3</div>
                  <h3 className="text-xl font-bold text-slate-800">Resultado do seu projeto</h3>
                </div>

                {status === AppStatus.PROCESSING ? (
                  <div className="bg-slate-50 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-4 border-2 border-dashed border-slate-200">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                      <i className="fa-solid fa-couch absolute inset-0 flex items-center justify-center text-blue-600 text-2xl"></i>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-800">Criando sua nova decoração...</h4>
                      <p className="text-slate-500">Isso pode levar alguns segundos. Estamos usando IA para renderizar seu ambiente.</p>
                    </div>
                  </div>
                ) : result && (
                  <div className="space-y-8 animate-in fade-in duration-500">
                    <ComparisonView original={result.originalImage} decorated={result.decoratedImage} />
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button 
                        onClick={handleDownload}
                        className="flex-1 bg-slate-900 hover:bg-black text-white font-bold py-4 px-8 rounded-2xl transition-all flex items-center justify-center gap-3"
                      >
                        <i className="fa-solid fa-download"></i>
                        Baixar Imagem em HD
                      </button>
                      <button 
                        onClick={handleReset}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 px-8 rounded-2xl transition-all flex items-center justify-center gap-3"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                        Recomeçar
                      </button>
                    </div>
                  </div>
                )}
              </section>
            )}
          </div>
        </div>

        <p className="mt-12 text-center text-slate-400 text-sm font-medium">
          &copy; {new Date().getFullYear()} DecorAI Studio &bull; Inteligência Artificial para Interiores
        </p>
      </main>
    </div>
  );
};

export default App;
