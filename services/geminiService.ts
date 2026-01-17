import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize specific client only when needed to handle potential missing key gracefully
let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient && apiKey) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const generateBabeoResponse = async (userPrompt: string): Promise<string> => {
  const client = getAiClient();
  if (!client) {
    return "I'm currently resting. Please check back later (API Key missing).";
  }

  try {
    const response = await client.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: `You are Babeo, a gentle, nurturing, and professional parenting assistant for the BabeoLife website. 
        Your tone is calm, reassuring, and non-judgmental. 
        Target audience: Sleep-deprived new parents.
        
        Guidelines:
        1. Keep answers concise (under 100 words preferably).
        2. Use soft language (e.g., "gentle," "little one," "it's okay").
        3. Base advice on general pediatric consensus but always include a disclaimer to consult a doctor for medical issues.
        4. Do not be alarmist. If a topic is serious, gently guide them to professional help.
        5. Format clearly.
        `,
        temperature: 0.7,
      }
    });

    return response.text || "I'm having a little trouble thinking clearly right now. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a moment of silence. Please try asking again in a bit.";
  }
};
