'use client';

import React, { useEffect, useState } from 'react';
import { db } from "@/utils/db";  
import { Interview } from "@/utils/schema";  
import Link from 'next/link';

const Page = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const jobList = await db.select().from(Interview) // Fetch jobs from DB
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
      <h2 className="font-bold text-2xl mb-4">Job Board</h2>
      <h3 className="font-bold text-xl mt-10 mb-4">Available Jobs</h3>
      <div className="flex grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div key={job.interviewId} className="p-4 rounded-lg shadow-md bg-gray-50">
            <h4 className="font-bold text-lg text-gray-800">{job.jobPosition}</h4>
            <p className="text-gray-600">{job.jobDescription}</p>
            <p className="text-gray-700"><strong>Location:</strong> {job.location}</p>
            <p className="text-gray-700"><strong>Salary:</strong> {job.salary}</p>
            <p className="text-gray-700"><strong>Experience:</strong> {job.Experience}</p> {/* Ensure the field name matches your schema */}
            <Link href={`/interviewai/${job.interviewId}`}>
              <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Start Interview
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
