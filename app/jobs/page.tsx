import React from 'react';
import AddJob from './../admin/_components/AddJob';

const jobsData = [
  {
    id: 1,
    title: "Software Engineer",
    description: "Develop and maintain software applications.",
    location: "Remote",
    salary: "$80,000 - $100,000",
    experience: "2+ years",
  },
  {
    id: 2,
    title: "Product Manager",
    description: "Lead product development and strategy.",
    location: "New York, NY",
    salary: "$90,000 - $120,000",
    experience: "3+ years",
  },
  // Add more jobs as needed
];

const Page = () => {
  return (
    <div className="p-6">
      <h2 className="font-bold text-2xl mb-4">Job Board</h2>
      <h3 className="font-bold text-xl mt-10 mb-4">Available Jobs</h3>
      <div className="flex grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobsData.map((job) => (
          <div key={job.id} className="p-4 rounded-lg shadow-md bg-gray-50">
            <h4 className="font-bold text-lg text-gray-800">{job.title}</h4>
            <p className="text-gray-600">{job.description}</p>
            <p className="text-gray-700"><strong>Location:</strong> {job.location}</p>
            <p className="text-gray-700"><strong>Salary:</strong> {job.salary}</p>
            <p className="text-gray-700"><strong>Experience:</strong> {job.experience}</p>
            <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Start Interview
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
