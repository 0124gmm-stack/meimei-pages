
import { GoogleGenAI } from "@google/genai";

/**
 * Generates a chat response using the Gemini model.
 * Uses the API_KEY from environment variables directly as per guidelines.
 */
export const generateChatResponse = async (prompt: string): Promise<string> => {
  try {
    // Correctly initialize with a named parameter using process.env.API_KEY directly.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Call generateContent with the model and prompt details.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are Koda, a playful and energetic mascot for a creative developer's portfolio. 
        Keep your answers short, enthusiastic, and helpful. 
        Reference things like 'dancing', 'colors', and 'code' often. 
        Your creator is a person named 'The User' who loves pablotheflamingo.com.`,
        temperature: 0.9,
      },
    });

    // Extract text using the .text property (not a method).
    return response.text || "I'm speechless!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I hit a glitch, but let's keep dancing!";
  }
};
