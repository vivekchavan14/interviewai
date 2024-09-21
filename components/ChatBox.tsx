import React, { useEffect, useState } from 'react';

interface ChatBoxProps {
  interviewQuestions: any[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  isResponding: boolean;
  setIsResponding: (value: boolean) => void;
}

const ChatBox = ({
  interviewQuestions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  isResponding,
  setIsResponding,
}: ChatBoxProps) => {
  const [messages, setMessages] = useState<{ text: string; type: string }[]>([]);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onresult = (event: any) => {
        const answer = event.results[0][0].transcript;
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: answer, type: 'user' },
        ]);
        setIsResponding(false); // Stop listening
        provideFeedback(answer); // Provide feedback after the answer
      };

      rec.onend = () => {
        if (isResponding) {
          rec.start(); // Restart recognition if still responding
        }
      };

      setRecognition(rec);
    } else {
      console.error('Speech Recognition not supported in this browser.');
    }
  }, []);

  useEffect(() => {
    if (interviewQuestions.length > 0 && currentQuestionIndex < interviewQuestions.length) {
      const currentQuestion = interviewQuestions[currentQuestionIndex];
      speakQuestion(currentQuestion);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: currentQuestion.question, type: 'bot' },
      ]);
    }
  }, [currentQuestionIndex, interviewQuestions]);

  const speakQuestion = (question: any) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(question.question);
    synth.speak(utterance);
  };

  const startListening = () => {
    if (recognition && recognition.state === 'inactive') {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition && recognition.state === 'active') {
      recognition.stop();
    }
  };

  useEffect(() => {
    if (isResponding) {
      startListening();
    } else {
      stopListening();
    }
  }, [isResponding]);

  const provideFeedback = (answer: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: 'Good answer! Moving to the next question...', type: 'bot' },
    ]);

    // Move to the next question after a short delay
    setTimeout(() => {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }, 2000); // Adjust delay as needed
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex-1 overflow-y-auto p-2 border border-gray-300 bg-white rounded-lg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 mb-2 rounded-lg ${
              msg.type === 'user' ? 'bg-blue-200' : 'bg-gray-200'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {isResponding && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 p-2 bg-gray-700 text-white rounded">
          Listening...
        </div>
      )}

      <div className="mt-2 text-sm text-gray-500">
        Press Spacebar to start speaking
      </div>
    </div>
  );
};

export default ChatBox;
