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
  Please return json response using the following schema:
{
  "message": "description",
  "responseText" : {
        "analysis": "description",
        "useCases": {
            "UseCase1": "description",
            "UseCase2": "description"
        },
        "steps": {
            "Step1": "description",
            "Step2": "description",
            "Step3": "description"
        },
        "realWorldExamples": {
            "Example1": "description",
            "Example2": "description"
        }
    }
}

Please provide the following analysis in ${language} language:
1. Response should be ${limit}.
2. Language of the response should contain ${humor}% humor.
3. Explain answer of the question briefly.
3. Answer of the question should also contain two real world use cases or examples.
4. If possible share steps for a simple practical activity to understand the concepts involved in the asked question.

NOTE: all fields are compulsory and If you don't provide a value it will break the app`;

}


async function analyzeDoc(question, limit, language, humor ) {
  try {
    const model = getGeminiModel();
    const prompt = generatePrompt(question, limit, language, humor);
    // console.log(prompt);
    const result = await model.generateContent(prompt);
    // console.log(result.response.text())
    const parsedResult = JSON.parse(result.response.text());
    console.log(parsedResult)
    return parsedResult;
  } catch (error) {
    console.error("Error analyzing form:", error);
    throw error;
  }
}

export {analyzeDoc}