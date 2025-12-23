
import { GoogleGenAI } from "@google/genai";

export const decorateImage = async (base64Image: string, prompt: string): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key não configurada. Por favor, verifique o ambiente.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  // Format the base64 string (remove the prefix if present)
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
            text: `Modifique o cenário desta foto de decoração de interiores de acordo com este pedido: "${prompt}". 
                   Mantenha a estrutura básica do cômodo, mas altere os móveis, cores, texturas e iluminação conforme solicitado. 
                   O resultado deve ser fotorrealista e esteticamente agradável.`,
          },
        ],
      },
    });

    let resultImageUrl = '';
    
    // Iterate through response parts to find the generated image
    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          resultImageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!resultImageUrl) {
      throw new Error("O modelo não retornou uma imagem processada.");
    }

    return resultImageUrl;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Falha ao processar a imagem. Tente novamente.");
  }
};
