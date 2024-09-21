'use client';

import React, { useEffect, useState } from "react";
import AddJob from "./_components/AddJob";
import Navbar from "@/components/Navbar";
import Header from "../jobs/_components/Header";
import { db } from "@/utils/db";  
import { Interview } from "@/utils/schema"; 

const Page = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const jobList = await db.select().from(Interview).orderBy('createdAt', 'desc');  // Fetch jobs from DB
      setJobs(jobList);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();  // Fetch jobs when component mounts
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="font-bold text-2xl mb-4 text-gray-800">Job Board</h2>
      <p className="text-gray-600 mb-8">Add new jobs below:</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AddJob />

        <div className="md:col-span-2 p-6 rounded-lg shadow-md bg-white">
          <h3 className="font-semibold text-lg text-gray-700 mb-4">Current Job Listings</h3>
          {jobs.length > 0 ? (
            <div className="flex grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <div key={job.interviewId} className="p-4 rounded-lg shadow-md bg-gray-50">
                  <h4 className="font-bold text-lg text-gray-800">{job.jobPosition}</h4>
                  <p className="text-gray-600">{job.jobDescription}</p>
                  <p className="text-gray-700"><strong>Location:</strong> {job.location}</p>
                  <p className="text-gray-700"><strong>Salary:</strong> {job.salary}</p>
                  <p className="text-gray-700"><strong>Experience:</strong> {job.experience}</p>
                  <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                    Edit Job
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No job listings available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
