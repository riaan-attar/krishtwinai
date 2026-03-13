import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI: GoogleGenerativeAI | null = null;

export const generateTreatmentPlan = async (diseaseName: string, plantName: string) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not set in environment variables. Please add it to your .env file.");
  }

  if (!genAI) {
    genAI = new GoogleGenerativeAI(apiKey);
  }
  
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `As an agricultural expert, provide a highly effective treatment plan for the disease "${diseaseName}" on a "${plantName}" plant.
Format the output EXACTLY as a JSON object (do not include markdown formatting like \`\`\`json) with the following structure:
{
  "symptoms": ["point 1", "point 2"],
  "treatment": ["point 1", "point 2", "point 3"],
  "prevention": ["point 1", "point 2"]
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    
    // Strip markdown formatting if the model still includes it
    const jsonStr = text.replace(/^```json/i, '').replace(/```$/i, '').trim();
    
    const parsed = JSON.parse(jsonStr) as { symptoms: string[], treatment: string[], prevention: string[] };
    return parsed;
  } catch (error) {
    console.error("Error with Gemini API:", error);
    throw new Error("Failed to generate treatment plan using Gemini API.");
  }
};

