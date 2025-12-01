import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// System instruction to enforce the persona
const SYSTEM_INSTRUCTION = `
You are a highly advanced AI interface running on a retro terminal from the 1980s. 
Your output should be technical, concise, and slightly robotic but helpful. 
Avoid markdown formatting like bold or italics if possible, as the terminal handles plain text best, 
but you can use code blocks. 
Always refer to the user as "OPERATOR".
`;

let ai: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

const getAiClient = (): GoogleGenAI => {
  if (!ai) {
    // API_KEY is strictly from process.env.API_KEY, injected via vite.config.ts
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY is missing from environment variables.");
    }
    ai = new GoogleGenAI({ apiKey: apiKey || "" });
  }
  return ai;
};

export const getChatSession = (): Chat => {
  if (!chatSession) {
    const client = getAiClient();
    chatSession = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGeminiStream = async (message: string): Promise<AsyncIterable<GenerateContentResponse>> => {
  const chat = getChatSession();
  try {
    const result = await chat.sendMessageStream({ message });
    return result;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};