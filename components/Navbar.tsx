import Link from "next/link";

import { cn } from "@/lib/utils";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { MobileNav } from "@/components/MobileNav";
import { IoIosFlash } from "react-icons/io";

const Navbar = () => {
  // Replace with your auth logic, e.g., Clerk: const { userId } = auth();
  const isUserSignedIn = false;

  return (
    <nav
      className={cn(
        "sticky top-0 inset-x-0 z-30 h-16 border-b border-gray-200 bg-white/80 backdrop-blur-lg shadow-sm transition-all"
      )}
    >
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-40">
            <div className="group flex items-center space-x-2">
              <IoIosFlash className="text-blue-500 group-hover:text-blue-700 transition duration-200" />
              <span className="text-xl font-semibold text-gray-800 group-hover:text-gray-900 transition-all">
                InterviewAI
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-1 sm:gap-4">
            {/* Mobile Menu */}
            {!isUserSignedIn ? (
              <MobileNav />
            ) : (
              <Link
                className={buttonVariants({
                  size: "sm",
                  className: "sm:hidden mr-3",
                })}
                href="/jobs"
              >
                Dashboard
              </Link>
            )}

            {/* Desktop Links */}
            <div className="hidden sm:flex items-center space-x-6">
              {!isUserSignedIn ? (
                <>
                  <Link
                    href="/pricing"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/sign-in"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up"
                    className={buttonVariants({
                      size: "sm",
                    })}
                  >
                    Get started
                  </Link>
                </>
              ) : (
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Dashboard
                </Link>
              )}
            </div>

            {/* User profile mockup (replace with real user avatar if available) */}
            {isUserSignedIn && (
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full border-2 border-gray-300 bg-gray-100 shadow-sm"></div>
              </div>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
