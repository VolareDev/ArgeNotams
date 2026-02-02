
import { GoogleGenAI, Type } from "@google/genai";
import { Notam, NotamType, GroundingSource, FetchResult, LocationType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchNotams = async (target: string, type: LocationType): Promise<FetchResult> => {
  try {
    let contextPrompt = "";
    if (type === 'AIRPORT') {
      contextPrompt = `aeródromo ${target} en Argentina. Verifica específicamente si el aeropuerto está CERRADO o CLAUSURADO (isClosed true/false).`;
    } else if (type === 'FIR') {
      contextPrompt = `FIR ${target} (Flight Information Region) en Argentina.`;
    } else {
      contextPrompt = `avisos generales a TODAS las FIR de Argentina (NOTAMs de alcance nacional).`;
    }

    const prompt = `Actúa como especialista en aviación. Busca NOTAMs vigentes en tiempo real para: ${contextPrompt}.
    Extrae los NOTAMs activos y devuélvelos en formato JSON.
    Campos obligatorios:
    - id (número oficial, ej: A1234/24)
    - type (AGA, ANS, COM, MET, ATM, u OTHER)
    - rawText (texto original telegráfico)
    - summary (explicación clara en español)
    - validity (from/to ISO string)
    - level (INFO, WARNING, CRITICAL)
    ${type === 'AIRPORT' ? '- isClosed (boolean, true solo si el aeropuerto está totalmente inoperativo según los NOTAMs)' : ''}
    
    Si no hay NOTAMs, devuelve una lista vacía.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            notams: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING },
                  rawText: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  validity: {
                    type: Type.OBJECT,
                    properties: {
                      from: { type: Type.STRING },
                      to: { type: Type.STRING }
                    },
                    required: ["from", "to"]
                  },
                  level: { type: Type.STRING }
                },
                required: ["id", "type", "rawText", "summary", "validity", "level"]
              }
            },
            isClosed: { type: Type.BOOLEAN }
          },
          required: ["notams"]
        }
      },
    });

    const text = response.text?.trim() || '{"notams": []}';
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = { notams: [] };
    }
    
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: GroundingSource[] = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title || "Fuente Oficial AIS/EANA",
        uri: chunk.web.uri
      }));

    return { 
      notams: (data.notams || []) as Notam[], 
      sources,
      isClosed: data.isClosed || false
    };
  } catch (error) {
    console.error("Error fetching NOTAMs:", error);
    return { notams: [], sources: [] };
  }
};
