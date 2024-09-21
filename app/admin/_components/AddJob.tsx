"use client";

import React, { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
//import { chatSession } from "@/utils/ai.js";
import { initChatSession } from "@/utils/ai.js";
import { db } from "@/utils/db";
import { Interview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment";


const AddJob = () => {
  // State for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [response, setResponse] = useState<string>("");
  const [jsonResponse, setJsonResponse] = useState("")
  const { user } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const inputPrompt = `Job Position: ${title}, Job Description: ${description}, Experience Required: ${experience}, Location: ${location}, Salary: ${salary}. 
    Generate 4 interview questions relevant to the job. Please format the response as a JSON with questions and expected answers.`;

    try {
     const chatSession = await initChatSession();
     const result = await chatSession.sendMessage(inputPrompt);
      
      // Safely handle the response
      if (result?.response?.text()) {
        setResponse(result.response.text());
        console.log(result.response.text());
        const JSONResponse = ( result.response.text()).replace('```json', '').replace('```','')
        console.log(JSON.parse(JSONResponse));
        setJsonResponse(JSONResponse);

         // Insert into the database
         const resp = await db.insert(Interview).values({
            interviewId: uuidv4(),
            jsonResponse: JSONResponse,
            jobPosition: title,
            jobDescription: description,
            Experience: experience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-YYYY'),  // Correct date format
          }).returning({
            interviewId: Interview.interviewId,
          });
    
          console.log("Interview saved:", resp);

      } else {
        console.error("Unexpected response format:", result);
      }
      
    } catch (error) {
      console.error("Error while fetching response:", error);
    }
  };

  //console.log(response)




  
  return (
    <div className="p-6 rounded-lg shadow-md bg-gray-50">
      <h2 className="font-bold text-lg text-gray-800 mb-4">+ Add New Job</h2>

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
          >
            Add Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
