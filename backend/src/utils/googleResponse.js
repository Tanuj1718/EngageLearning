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


function generatePrompt(question, limit, language, humor) {
  return `Analyze the question (${question}) extracted from a form:

Please provide the following analysis in ${language} language:
1. Response should be ${limit}.
2. Language of the response should contain ${humor}% humor.
3. Explaination of the question should contain two real world use cases or examples which are in key-value pair.
4. If possible share steps for a simple practical activity to understand the concepts involved in the asked question. Each steps should be in key value pair.
Please ensure your response is in JSON format as per the specified schema. NOTE: all fields are compulsory and If you don't provide a value it will break the app    `;

}


async function analyzeDoc(question, limit, language, humor ) {
  try {
    const model = getGeminiModel();
    const prompt = generatePrompt(question, limit, language, humor);
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