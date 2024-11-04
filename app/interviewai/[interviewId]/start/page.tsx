'use client';

import { db } from '@/utils/db';
import { Interview } from '@/utils/schema';
import React, { useEffect, useState } from 'react';
import { eq } from 'drizzle-orm';

interface InterviewData {
  interviewId: string;
  jsonResponse: string;
  jobPosition: string;
  jobDescription: string;
  experience: string;
  createdBy: string;
  createdAt: string;
}

interface InterviewQuestion {
  question: string;
  expected_answer?: string;
}

const InterviewPage = ({ params }: { params: { interviewId: string } }) => {
  const [interviewData, setInterviewData] = useState<InterviewData | null>(null);
  const [interviewQuestions, setInterviewQuestions] = useState<InterviewQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [userResponse, setUserResponse] = useState('');
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);

  useEffect(() => {
    getInterviewDetails();
  }, [params.interviewId]);

  const getInterviewDetails = async () => {
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
    if (interviewQuestions[0]) {
      setMessages([{ sender: 'AI Interviewer', text: interviewQuestions[0].question }]);
    }
  };

  const handleEndInterview = () => {
    setIsInterviewStarted(false);
    setCurrentQuestionIndex(0);
    setMessages([{ sender: 'System', text: 'Interview has ended.' }]);
  };

  const handleUserResponse = () => {
    if (!userResponse.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'Candidate', text: userResponse },
    ]);

    setUserResponse('');

    if (currentQuestionIndex < interviewQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'AI Interviewer', text: interviewQuestions[currentQuestionIndex + 1].question },
      ]);
    } else {
      handleEndInterview();
    }
  };

  return (
    <div className="flex flex-col items-center h-screen p-10 bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Interview for {interviewData?.jobPosition}</h1>
        
        <div className="chat-box flex flex-col space-y-4 mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'AI Interviewer' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`p-3 rounded-lg shadow text-black ${
                  message.sender === 'AI Interviewer' ? 'bg-blue-100' : 'bg-green-100'
                }`}
              >
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {isInterviewStarted ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              className="flex-1 p-2 border rounded text-black focus:outline-none focus:border-blue-500"
              placeholder="Type your response..."
            />
            <button
              onClick={handleUserResponse}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Send
            </button>
          </div>
        ) : (
          <button
            onClick={handleStartInterview}
            className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
          >
            Start Interview
          </button>
        )}

        {isInterviewStarted && (
          <button
            onClick={handleEndInterview}
            className="px-4 py-2 bg-red-500 text-white rounded mt-4"
          >
            End Interview
          </button>
        )}
      </div>
    </div>
  );
};

export default InterviewPage;
