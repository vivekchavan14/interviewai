import React from "react";
import AddJob from "./_components/AddJob";
import Navbar from "@/components/Navbar";
import Header from "../jobs/_components/Header";

const Page = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
        <br/>
      <h2 className="font-bold text-2xl mb-4 text-gray-800">Job Board</h2>
      <p className="text-gray-600 mb-8">Add new jobs below:</p>

      {/* Grid for layout responsiveness */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Job Form */}
        <AddJob />

        {/* Placeholder for other content, like current job listings */}
        <div className="md:col-span-2 p-6 rounded-lg shadow-md bg-white">
          <h3 className="font-semibold text-lg text-gray-700 mb-2">
            Current Job Listings (coming soon)
          </h3>
          <p className="text-gray-600">Here you can see the list of jobs you've added.</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
