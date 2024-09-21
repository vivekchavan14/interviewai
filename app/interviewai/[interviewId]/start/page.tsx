'use client';

import { db } from '@/utils/db';
import { Interview } from '@/utils/schema';
import React, { useEffect, useState } from 'react';
import { eq } from 'drizzle-orm';
import ChatBox from '@/components/ChatBox';
import Webcam from 'react-webcam';
import Link from 'next/link';

interface InterviewData {
  interviewId: string;
  jsonResponse: string;
  jobPosition: string;
  jobDescription: string;
  experience: string;
  createdBy: string;
  createdAt: string;
}

const InterviewPage = ({ params }: { params: { interviewId: string } }) => {
  const [interviewData, setInterviewData] = useState<InterviewData | null>(null);
  const [interviewQuestions, setInterviewQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isResponding, setIsResponding] = useState(false);

  useEffect(() => {
    GetInterviewDetails();
  }, [params.interviewId]);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(Interview)
        .where(eq(Interview.interviewId, params.interviewId));

      if (result && result.length > 0) {
        const interviewDetails = result[0];
        setInterviewData(interviewDetails);
        const parsedQuestions = JSON.parse(interviewDetails.jsonResponse);
        setInterviewQuestions(parsedQuestions);
      }
    } catch (error) {
      console.error('Error fetching interview details:', error);
    }
  };

  const handleStartInterview = () => {
    setIsInterviewStarted(true);
    setCurrentQuestionIndex(0); // Reset to first question
  };

  const handleEndInterview = () => {
    setIsInterviewStarted(false);
    setCurrentQuestionIndex(0); // Reset for future interviews
    // Optionally, navigate to an end page or perform any cleanup
  };

  return (
    <div className="flex h-screen p-10">
      {/* Video/Webcam Area */}
      <div className="relative flex-1">
        <div className="absolute inset-0">
          <Webcam audio={true} className="w-full h-full object-cover bg-black" />
        </div>
        <div className="absolute bottom-4 right-4 w-1/4 h-1/4 bg-black rounded-lg shadow-lg">
          <Webcam audio={false} className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-4 left-4">
          {!isInterviewStarted ? (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleStartInterview}
            >
              Start Call
            </button>
          ) : (
            <button
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={handleEndInterview}
            >
              End Call
            </button>
          )}
        </div>
      </div>

      {/* Chatbox Area */}
      <div className="w-1/3 bg-gray-100 p-4">
        {isInterviewStarted && interviewQuestions.length > 0 ? (
          <ChatBox
            interviewQuestions={interviewQuestions}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            isResponding={isResponding}
            setIsResponding={setIsResponding}
          />
        ) : (
          <p>Waiting to start interview...</p>
        )}
      </div>
    </div>
  );
};

export default InterviewPage;
