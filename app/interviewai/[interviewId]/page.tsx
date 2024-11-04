'use client';

import { db } from '@/utils/db';
import { Interview } from '@/utils/schema';
import React, { useEffect, useState } from 'react';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

// Define the interface for the interview data
interface InterviewData {
  interviewId: string;
  jsonResponse: string;
  jobPosition: string;
  jobDescription: string;
  experience: string; // Ensure this matches the expected field name
  createdBy: string;
  createdAt: string;
}

const InterviewDetails = ({ params }: { params: { interviewId: string } }) => {
  const [interviewData, setInterviewData] = useState<InterviewData | null>(null);

  useEffect(() => {
    GetInterviewDetails();
  }, [params.interviewId]);

  const GetInterviewDetails = async () => {
    try {
      const result = await db.select().from(Interview)
        .where(eq(Interview.interviewId, params.interviewId));

      // Map the result to match InterviewData interface
      if (result[0]) {
        const fetchedData = result[0];
        const mappedData: InterviewData = {
          interviewId: fetchedData.interviewId,
          jsonResponse: fetchedData.jsonResponse,
          jobPosition: fetchedData.jobPosition,
          jobDescription: fetchedData.jobDescription,
          experience: fetchedData.Experience, // Map this to match the interface
          createdBy: fetchedData.createdBy,
          createdAt: fetchedData.createdAt,
        };
        setInterviewData(mappedData);
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  if (!interviewData) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{interviewData.jobPosition}</h2>
        <p className="text-gray-700 mb-2">
          <strong>Interview Description:</strong> {interviewData.jobDescription}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Created by:</strong> {interviewData.createdBy}
        </p>

        <Link href={`/interviewai/${params.interviewId}/start`}>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Start Mock Interview
          </button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewDetails;
