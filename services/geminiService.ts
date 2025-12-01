import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Initialize the client. API_KEY is strictly from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// System instruction to enforce the persona
const SYSTEM_INSTRUCTION = `
You are a highly advanced AI interface running on a retro terminal from the 1980s. 
Your output should be technical, concise, and slightly robotic but helpful. 
Avoid markdown formatting like bold or italics if possible, as the terminal handles plain text best, 
but you can use code blocks. 
Always refer to the user as "OPERATOR".
`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
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