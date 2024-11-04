import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />

      {/* Wrapper for the content */}
      <MaxWidthWrapper className="mt-16 flex flex-col items-center justify-center text-center sm:mt-24">
        {/* Notification Banner */}
        <div className="mx-auto mb-6 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-gray-700">
            InterviewAI is now live! Start conducting mock interviews today!
          </p>
        </div>

        {/* Main Heading */}
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          <span className="text-blue-600">Prepare</span> for your next interview
        </h1>

        {/* Subheading */}
        <p className="mt-5 max-w-prose text-lg text-zinc-700 sm:text-2xl">
          InterviewAI provides realistic mock interview experiences to help you excel in your job search.
        </p>

        {/* Call to Action Button */}
        <Link
          href="/jobs"
          className={cn(
            buttonVariants({
              size: "lg",
              className: "mt-6",
            }),
            "text-lg"
          )}
        >
          Start Mock Interviews
        </Link>
      </MaxWidthWrapper>
      <br />
      <br />
      <MaxWidthWrapper>
        {/* "Powered by Gemini" Section */}
        <div className="bg-gray-50 py-12 px-6 rounded-lg shadow-md">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              Powered by <span className="text-blue-600">Gemini</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Leverage our advanced AI technology, powered by Gemini, to simulate real interview scenarios and enhance your preparation.
            </p>
            <div className="mt-6">
              <Link
                href="/learn-more"
                className={cn(
                  buttonVariants({
                    size: "lg",
                    variant: "outline",
                  }),
                  "text-lg"
                )}
              >
                Learn More About Our Platform
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
