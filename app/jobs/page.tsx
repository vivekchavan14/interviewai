'use client';

import React, { useEffect, useState } from 'react';
import { db } from "@/utils/db";  
import { Interview } from "@/utils/schema";  
import Link from 'next/link';

// Define the type for the job object
interface Job {
  interviewId: string;
  jsonResponse: string;
  jobPosition: string;
  jobDescription: string;
  Experience: string;
  createdBy: string;
  createdAt: string;
}

const Page = () => {
  // Explicitly define the type for jobs
  const [jobs, setJobs] = useState<Job[]>([]);

  const fetchJobs = async () => {
    try {
      const jobList = await db.select().from(Interview).orderBy(Interview.createdAt); // Fetch jobs from DB
      setJobs(jobList);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();  
  }, []);

  return (
    <div className="p-6">
      <h2 className="font-bold text-2xl mb-4">Interview Board</h2>
      <h3 className="font-bold text-xl mt-10 mb-4">Available Mock Interviews</h3>
      <div className="flex grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div key={job.interviewId} className="p-4 rounded-lg shadow-md bg-gray-50">
            <h4 className="font-bold text-lg text-gray-800">{job.jobPosition}</h4>
            <p className="text-gray-600">{job.jobDescription}</p>
            <Link href={`/interviewai/${job.interviewId}`}>
              <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Start Mock Interview
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
