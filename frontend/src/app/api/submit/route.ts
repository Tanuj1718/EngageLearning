// src/app/api/submit/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { question, answerLength, language, humourLevel } = await request.json();

    // TODO: Replace with your actual backend API endpoint
    const backendApiUrl = "http://localhost:2000/form/ideas";

    const backendResponse = await fetch(backendApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any required headers for your backend API
      },
      body: JSON.stringify({
        question,
        answerLength,
        language,
        humourLevel,
      }),
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json(
        { error: errorData.message || "Backend API error." },
        { status: backendResponse.status }
      );
    }

    const data = await backendResponse.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
