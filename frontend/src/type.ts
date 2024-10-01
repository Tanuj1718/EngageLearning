// src/types.ts

export interface BackendResponseWrapper {
  response: BackendResponse;
}

export interface BackendResponse {
  message: string;
  responseText: ResponseText;
}

export interface ResponseText {
  answer: string;
  useCases: Record<string, string>;
  steps: Record<string, string>;
  realWorldExamples: Record<string, string>;
}
