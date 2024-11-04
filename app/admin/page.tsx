'use client';

import React, { useEffect, useState } from "react";
import AddJob from "./_components/AddJob";
import { db } from "@/utils/db";  
import { Interview } from "@/utils/schema"; 

// Define a Job interface based on your Interview schema
interface Job {
  id: number; // Assuming this is the same as the serial id in the database
  jsonResponse: string;
  jobPosition: string;
  jobDescription: string;
  Experience: string;
  createdBy: string;
  createdAt: string;
  interviewId: string;
}

const Page = () => {
  const [jobs, setJobs] = useState<Job[]>([]); // Specify the type for jobs

  const fetchJobs = async () => {
    try {
      const jobList = await db
        .select()
        .from(Interview)
        .orderBy(Interview.createdAt);  
      
      // Assuming jobList needs type assertion to Job[]
      setJobs(jobList as Job[]); 
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();  
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="font-bold text-2xl mb-4 text-gray-800">Interview Board</h2>
      <p className="text-gray-600 mb-8">Add new mock interviews below:</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AddJob />

        <div className="md:col-span-2 p-6 rounded-lg shadow-md bg-white">
          <h3 className="font-semibold text-lg text-gray-700 mb-4">Current Interview Listings</h3>
          {jobs.length > 0 ? (
            <div className="flex grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <div key={job.interviewId} className="p-4 rounded-lg shadow-md bg-gray-50">
                  <h4 className="font-bold text-lg text-gray-800">Interview Title: {job.jobPosition}</h4>
                  <p className="text-gray-600">Interview Description: {job.jobDescription}</p>
                  <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Edit card
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No Interview listings available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
