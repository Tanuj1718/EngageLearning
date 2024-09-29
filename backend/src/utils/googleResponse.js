import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})

const API_KEY = process.env.GEMINI_API_KEY || "API_KEY";

const genAI = new GoogleGenerativeAI(API_KEY);

function getGeminiModel() {
  return genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
      responseMimeType: "application/json", 
    },
  });
}


function generatePrompt(budget, location, language) {
  return `Analyze the budget and location extracted from a form:
Please provide the following analysis in ${language} language:
1. 5 ideas of starting a business in ${location} with ${budget} budget.
2. Each idea should contain title, description, budget_allocation(it should be a object which contains 5 key-value pairs with keys: p1, p2, p3, p4, p5), profit_margin and potential.
3. Each idea should also contain an Indian governmet_scheme (if available) for helping financially.
4. Each idea should be different.
5. There should be a separation while generating the idea so that each idea is clearly visible.

  Please ensure your response is in JSON format as per the specified schema. NOTE: all fields are compulsory and If you don't provide a value it will break the app    `;

}


async function analyzeDoc(budget, location, language ) {
  try {
    const model = getGeminiModel();
    const prompt = generatePrompt(budget, location, language);
    console.log(prompt);
    const result = await model.generateContent(prompt);
    const parsedResult = JSON.parse(result.response.text());
    return parsedResult;
  } catch (error) {
    console.error("Error analyzing form:", error);
    throw error;
  }
}

export {analyzeDoc}