'use client';

import { db } from '@/utils/db';
import { Interview } from '@/utils/schema';
import React, { useEffect, useState } from 'react';
import { eq } from 'drizzle-orm';
import ChatBox from '@/components/ChatBox';
import Webcam from 'react-webcam';

const Page = ({ params }: { params: { interviewId: string } }) => {

  const [interviewData, setInterviewData] = useState<any>();

  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, [params.interviewId]);

  const GetInterviewDetails = async () => {
    const result = await db.select().from(Interview)
      .where(eq(Interview.interviewId, params.interviewId));
    console.log(result);
    setInterviewData(result[0]);
  };

  return (
    <div className="flex h-screen p-10">
      {/* Video Call Area */}
      <div className="relative flex-1">
        {/* Fullscreen Webcam */}
        <div className="absolute inset-0">
          <Webcam
            audio={true}
            className="w-full h-full object-cover bg-black"
          />
        </div>

        {/* Peer Webcam */}
        <div className="absolute bottom-4 right-4 w-1/4 h-1/4 bg-black rounded-lg shadow-lg">
          <Webcam
            audio={false}
            className="w-full h-full object-cover"
          />
        </div>

        {/* End Call button */}
        <div className="absolute bottom-4 left-4">
          <button
            // onClick={endCall}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            End Call
          </button>
        </div>
      </div>

      {/* Chatbox Area */}
      <div className="w-1/3 bg-gray-100 p-4">
        <ChatBox />
      </div>
    </div>
  );
};

export default Page;
