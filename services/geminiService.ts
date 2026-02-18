
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getTaskBreakdown = async (title: string, description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Break down the following task into exactly 4 or 5 clear, actionable subtasks:
      Title: ${title}
      Description: ${description}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subtasks: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING
              }
            }
          },
          required: ["subtasks"]
        }
      }
    });

    const data = JSON.parse(response.text || '{"subtasks": []}');
    return data.subtasks as string[];
  } catch (error) {
    console.error("Gemini breakdown error:", error);
    return [];
  }
};
