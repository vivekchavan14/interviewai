"use client";

import React, { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { initChatSession } from "@/utils/ai.js";
import { db } from "@/utils/db";
import { Interview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [, setResponse] = useState<string>(""); // Fully initialized
  const [, setJsonResponse] = useState(""); // Fully initialized
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Construct the prompt for the AI
    const inputPrompt = `Job Position: ${title}, Job Description: ${description}, Experience Required: ${experience}, Location: ${location}, Salary: ${salary}. 
    Generate 4 interview questions relevant to the job. Please format the response as a JSON with questions and expected answers.`;

    try {
      const chatSession = await initChatSession();
      const result = await chatSession.sendMessage(inputPrompt);

      if (result?.response?.text()) {
        const resultText = result.response.text();
        setResponse(resultText);

        // Clean and parse the JSON response safely
        const JSONResponse = resultText.replace("```json", "").replace("```", "");
        try {
          const parsedJSON = JSON.parse(JSONResponse);
          console.log(parsedJSON);
          setJsonResponse(JSONResponse);

          // Insert into the database (ensure interviewId is a valid field in the schema)
          const resp = await db.insert(Interview).values({
            interviewId: uuidv4(), // Ensure interviewId is valid in schema
            jsonResponse: JSONResponse,
            jobPosition: title,
            jobDescription: description,
            Experience: experience,
            createdBy: user?.primaryEmailAddress?.emailAddress || "Unknown",
            createdAt: moment().format("YYYY-MM-DD"), // Correct date format
          }).returning({
            interviewId: Interview.interviewId, // Assuming interviewId exists in schema
          });

          console.log("Interview saved:", resp);
        } catch (err) {
          console.error("Error parsing JSON response:", err);
        }
      } else {
        console.error("Unexpected response format:", result);
      }
    } catch (error) {
      console.error("Error while fetching response:", error);
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-md bg-gray-50">
      <h2 className="font-bold text-lg text-gray-800 mb-4">+ Add New Job</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700">Interview Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter Interview title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Interview Description</label>
          <textarea
            name="description"
            placeholder="Enter Interview description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-gray-700">Semester </label>
          <input
            type="text"
            name="experience"
            placeholder="Enter experience required"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


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
          >
            Add Mock Interview
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
