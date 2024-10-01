// src/app/response/page.tsx

"use client";

import { Button } from "@/components/ui/button";
import { BackendResponse, BackendResponseWrapper } from "@/type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ResponsePage: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<BackendResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const query = new URLSearchParams(window.location.search);
      const result = query.get("result");

      if (result) {
        try {
          const parsedWrapper: BackendResponseWrapper = JSON.parse(decodeURIComponent(result));
          if (parsedWrapper.response) {
            setData(parsedWrapper.response);
          } else {
            throw new Error("Response data is missing.");
          }
        } catch (err) {
          console.error("Failed to parse response data:", err);
          setError("Invalid response data received.");
          // Optionally, redirect to home after showing the error
          setTimeout(() => router.push("/"), 3000);
        }
      } else {
        // If no result is found, redirect back to home
        router.push("/");
      }
    }
  }, [router]);

  if (error) {
    return (
      <div className=" text-black bg-gray-200 flex items-center justify-center p-4">
        <div className="max-w-md bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Loading response...</p>
      </div>
    );
  }

  const { responseText } = data;
  const { analysis, useCases, steps, realWorldExamples } = responseText;

  // Helper function to render key-value pairs
  const renderKeyValue = (title: string, items: Record<string, string>) => (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">{title}:</h3>
      <ul className="list-disc list-inside space-y-1">
        {Object.entries(items).map(([key, value]) => (
          <li key={key}>
            <span className="font-medium">{key}:</span> {value}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className=" bg-[#0a0a0a] w-[80%]  p-8 rounded shadow-md border-2 border-white">
        <h2 className="text-3xl font-bold mb-6 items-center">Know It More!</h2>

        {/* Analysis */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Answer:</h3>
          <p className="mt-2">{analysis}</p>
        </div>

        {/* Use Cases */}
        {useCases && Object.keys(useCases).length > 0 && renderKeyValue("Use Cases", useCases)}

        {/* Steps */}
        {steps && Object.keys(steps).length > 0 && renderKeyValue("Activity", steps)}

        {/* Real World Examples */}
        {realWorldExamples && Object.keys(realWorldExamples).length > 0 && renderKeyValue("Real World Examples", realWorldExamples)}

        {/* Submit Another Question Button */}
        <Button
        onClick={() => router.push("/")}
        className="w-full">
        Submit Another Question
        </Button>
        {/* <button
          onClick={() => router.push("/")}
          className="mt-6 w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit Another Question
        </button> */}
      </div>
    </div>
  );
};

export default ResponsePage;
