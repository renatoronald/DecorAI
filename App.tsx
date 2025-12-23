
import React, { useState, useCallback } from 'react';
import ImageUploader from './components/ImageUploader';
import ComparisonView from './components/ComparisonView';
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

      // Draw original decorated image
      ctx.drawImage(img, 0, 0);

      // Add Watermark
      const fontSize = Math.max(20, canvas.width * 0.03);
      ctx.font = `bold ${fontSize}px Inter, sans-serif`;
      
      // Shadow for readability
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      
      const text = "Decorado por DecorAI";
      const metrics = ctx.measureText(text);
      const padding = 20;
      
      ctx.fillText(
        text, 
        canvas.width - metrics.width - padding, 
        canvas.height - padding
      );

      // Trigger download
      const watermarkedUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `decoracao_ai_${Date.now()}.png`;
      link.href = watermarkedUrl;
      link.click();
    };
  };

  const isDecorateDisabled = status === AppStatus.PROCESSING || !originalImage || !prompt.trim();
  const isAutoDecorateDisabled = status === AppStatus.PROCESSING;

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <nav className="glass-morphism sticky top-0 z-50 px-6 py-4 mb-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
              <i className="fa-solid fa-house-chimney-window text-xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">DecorAI</h1>
          </div>
          <p className="hidden md:block text-slate-500 font-medium">Design de interiores inteligente</p>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6">
        {/* Hero Section */}
        <section className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
            Reimagine seu <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">cenário</span> num clique
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Envie uma foto e transforme seu ambiente. Use a caixa de texto para um estilo próprio ou o botão de <b>Decoração Automática</b> para uma surpresa instantânea.
          </p>
        </section>

        {/* Action Area */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-slate-100">
          <div className="space-y-8">
            {/* Step 1: Upload */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <h3 className="text-lg font-bold text-slate-800">Escolha seu ambiente</h3>
              </div>
              <ImageUploader 
                onImageSelected={handleImageSelected} 
                selectedImage={originalImage} 
              />
            </div>

            {/* Step 2: Description */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <h3 className="text-lg font-bold text-slate-800">Descreva as alterações</h3>
              </div>
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ex: Mude o sofá para um de couro marrom, adicione plantas no canto e troque a cor das paredes para azul marinho..."
                  className="w-full p-4 pr-12 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all h-32 resize-none text-slate-700 bg-slate-50"
                  disabled={status === AppStatus.PROCESSING}
                />
                <div className="absolute right-4 bottom-4 text-slate-300">
                  <i className="fa-solid fa-pen-nib"></i>
                </div>
              </div>
            </div>

            {/* Step 3: Action Buttons */}
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleDecorate}
                  disabled={isDecorateDisabled}
                  title={!prompt.trim() ? "Escreva algo para liberar este botão" : ""}
                  className={`w-full py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg ${
                    isDecorateDisabled
                      ? 'bg-slate-300 cursor-not-allowed shadow-none grayscale opacity-70'
                      : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200'
                  }`}
                >
                  {status === AppStatus.PROCESSING && !prompt.includes("Estilo") ? (
                    <>
                      <i className="fa-solid fa-circle-notch fa-spin"></i>
                      Decorando...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-wand-magic-sparkles"></i>
                      Decorar Agora
                    </>
                  )}
                </button>

                <button
                  onClick={handleAutoDecorate}
                  disabled={isAutoDecorateDisabled}
                  className={`w-full py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg ${
                    isAutoDecorateDisabled
                      ? 'bg-slate-300 cursor-not-allowed shadow-none grayscale opacity-70'
                      : 'bg-purple-600 hover:bg-purple-700 hover:shadow-purple-200'
                  }`}
                >
                   {status === AppStatus.PROCESSING && prompt.includes("Estilo") ? (
                    <>
                      <i className="fa-solid fa-circle-notch fa-spin"></i>
                      Criando Estilo...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-robot"></i>
                      Decoração Automática
                    </>
                  )}
                </button>
              </div>

              {status === AppStatus.SUCCESS && (
                <button
                  onClick={handleReset}
                  className="w-full py-3 rounded-2xl text-slate-500 font-semibold hover:bg-slate-100 transition-colors"
                >
                  Limpar e começar de novo
                </button>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-start gap-3 animate-pulse">
                <i className="fa-solid fa-triangle-exclamation text-red-500 mt-1"></i>
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Results Area */}
        {result && (
          <div id="results-area" className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-8">
              <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2 inline-block">Projeto Finalizado</span>
              <h3 className="text-2xl font-bold text-slate-800">Veja o antes e depois</h3>
              <p className="text-slate-500 text-sm mt-1 italic">"{result.prompt}"</p>
            </div>
            
            <ComparisonView 
              original={result.originalImage} 
              decorated={result.decoratedImage} 
            />

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={handleAutoDecorate}
                disabled={status === AppStatus.PROCESSING}
                className="bg-blue-50 border-2 border-blue-200 text-blue-700 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors disabled:opacity-50"
              >
                {status === AppStatus.PROCESSING ? (
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                ) : (
                  <i className="fa-solid fa-rotate-right"></i>
                )}
                Outra Versão
              </button>

              <button 
                onClick={handleDownload}
                className="bg-white border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
              >
                <i className="fa-solid fa-download"></i> Baixar Imagem
              </button>

              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Minha nova decoração com DecorAI',
                      text: `Olha como ficou meu ambiente usando IA! Estilo: ${result.prompt}`,
                      url: window.location.href
                    });
                  }
                }}
                className="bg-white border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
              >
                <i className="fa-solid fa-share-nodes"></i> Compartilhar
              </button>
            </div>
          </div>
        )}

        {/* Feature Highlights */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
            <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-bolt text-xl"></i>
            </div>
            <h4 className="font-bold text-slate-800 mb-2">Processamento Rápido</h4>
            <p className="text-slate-500 text-sm">Gere novos designs em questão de segundos com o poder da IA.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
            <div className="bg-orange-100 text-orange-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-camera text-xl"></i>
            </div>
            <h4 className="font-bold text-slate-800 mb-2">Fotos Reais</h4>
            <p className="text-slate-500 text-sm">Basta uma foto do seu ambiente. A IA reconhece o espaço automaticamente.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
            <div className="bg-green-100 text-green-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-couch text-xl"></i>
            </div>
            <h4 className="font-bold text-slate-800 mb-2">Estilo Livre</h4>
            <p className="text-slate-500 text-sm">Explore dezenas de estilos decorativos com o modo automático ou manual.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 pt-10 text-center">
        <p className="text-slate-400 text-sm">© 2024 DecorAI Labs. Transformando espaços com inteligência artificial.</p>
      </footer>
    </div>
  );
};

export default App;
