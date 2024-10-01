"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface FormData {
  question: string;
  answerLength: string;
  language: string;
  humourLevel: number;
}

const RequestForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    question: "",
    answerLength: "short",
    language: "English",
    humourLevel: 1,
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "answerLength" || name === "humourLevel"
          ? String(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return; // Prevent multiple submissions

    setLoading(true);

    try {
      const response = await fetch("http://localhost:2000/form/ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the request.");
      }

      const data = await response.json();

      // Navigate to the response page with the data
      router.push(`/response?result=${encodeURIComponent(JSON.stringify(data))}`);
    } catch (error) {
      console.error(error);
      alert("There was an error submitting your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto text-black p-4 bg-gray-100 shadow-md rounded"
    >
      <h2 className="text-2xl text-black font-bold mb-4">Submit Your Question</h2>

      <div className="mb-4">
        <Label className="font-[600]">Question:</Label>
        <input
          type="text"
          name="question"
          value={form.question}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded mt-1"
          placeholder="Enter your question"
        />
      </div>

      <div className="mb-4">
      <Label className="font-[600]">Response:</Label>
        <select
          name="answerLength"
          value={form.answerLength}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded mt-1"
        >
          <option value="Long">Long</option>
          <option value="Short">Short</option>
        </select>
      </div>

      <div className="mb-4">
      <Label className="font-[600]">Language:</Label>
        <input
          type="text"
          name="language"
          value={form.language}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded mt-1"
          placeholder="Enter preffered language"
        />
      </div>

      <div className="mb-4">
      <Label className="font-[600]">Humor Level:</Label>
        <input
          type="range"
          name="humourLevel"
          value={form.humourLevel}
          onChange={handleChange}
          min={0}
          max={101}
          className="w-full mt-2"
        />
        <div className="text-right text-sm text-gray-600">
          {form.humourLevel}/100
        </div>
      </div>


      <Button type="submit"
        disabled={loading} className="w-full">
          {loading ? "Submitting..." : "Submit"}
      </Button>

      {/* <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Submitting..." : "Submit"}
      </button> */}
    </form>
  );
};

export default RequestForm;
