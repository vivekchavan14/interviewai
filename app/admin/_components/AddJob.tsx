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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log({ title, description, location, salary, experience });
    // Reset the form
    setTitle("");
    setDescription("");
    setLocation("");
    setSalary("");
    setExperience("");
  };

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
