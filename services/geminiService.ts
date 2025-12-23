
import { GoogleGenAI } from "@google/genai";

export const decorateImage = async (base64Image: string, prompt: string): Promise<string> => {
  // Inicializa a IA no momento do uso para garantir a chave mais recente do ambiente
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const imageData = base64Image.split(',')[1] || base64Image;
  const mimeType = base64Image.match(/data:([^;]+);/)?.[1] || 'image/png';

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: imageData,
              mimeType: mimeType,
            },
          },
          {
            text: `ATUE COMO UM DESIGNER DE INTERIORES MASTER.
            
            TAREFA: Redecorar completamente o cenário desta foto baseado no seguinte pedido: "${prompt}".
            
            REGRAS CRÍTICAS:
            1. PRESERVE A ESTRUTURA: Não altere a posição de paredes principais, janelas ou portas.
            2. FOTORREALISMO: O resultado deve parecer uma fotografia profissional de revista de arquitetura.
            3. COERÊNCIA: Substitua móveis antigos por novos móveis de design que sigam o estilo solicitado.
            4. ILUMINAÇÃO: Aplique uma nova iluminação global que combine com o estilo sugerido (quente, fria, natural).
            5. MATERIAIS: Adicione texturas realistas (madeira, mármore, tecidos finos, metal polido).
            
            Retorne a imagem final processada.`,
          },
        ],
      },
    });

    let resultImageUrl = '';
    
    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          resultImageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!resultImageUrl) {
      throw new Error("A IA não conseguiu renderizar a imagem. Tente um prompt mais descritivo.");
    }

    return resultImageUrl;
  } catch (error: any) {
    console.error("Erro na API Gemini:", error);
    throw new Error(error.message || "Erro de conexão com a IA. Verifique sua chave.");
  }
};
