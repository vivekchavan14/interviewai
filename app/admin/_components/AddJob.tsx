"use client";

import React, { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AddJob = () => {
  // State for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState(""); // Added experience state
  const [error, setError] = useState(""); // State to hold error messages
  const [loading, setLoading] = useState(false); // State to indicate loading

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const inputPrompt = `Job Position: ${title}, Job Description: ${description}, Experience Required: ${experience}, Location: ${location}, Salary: ${salary}. 
    Generate 4 interview questions relevant to the job. Please format the response as a JSON with questions and expected answers.`;

    // Reset the form and error message
    setTitle("");
    setDescription("");
    setLocation("");
    setSalary("");
    setExperience("");
    setError("");
    setLoading(true); // Start loading

    try {
      const result = await sendMessage(inputPrompt); // Call the updated sendMessage function
      console.log(result);
    } catch (error) {
      console.error("Error while fetching response:", error);
      setError("Failed to fetch response. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  // Mock implementation of sendMessage
  const sendMessage = async (inputPrompt: string) => {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`, // Replace with your actual API key
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: { text: inputPrompt } }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.message}`);
    }

    return await response.json();
  };

  return (
    <div className="p-6 rounded-lg shadow-md bg-gray-50">
      <h2 className="font-bold text-lg text-gray-800 mb-4">+ Add New Job</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Job Title */}
        <div>
          <label className="block text-gray-700">Job Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter job title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-gray-700">Job Description</label>
          <textarea
            name="description"
            placeholder="Enter job description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        {/* Job Experience */}
        <div>
          <label className="block text-gray-700">Experience</label>
          <input
            type="text"
            name="experience"
            placeholder="Enter experience required"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Job Location */}
        <div>
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Job Salary */}
        <div>
          <label className="block text-gray-700">Salary</label>
          <input
            type="text"
            name="salary"
            placeholder="Enter salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={cn(
              buttonVariants({
                size: "lg",
                variant: "default",
              }),
              "w-full"
            )}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Adding Job..." : "Add Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
