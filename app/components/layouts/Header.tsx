"use client";
import { logoutUser } from "@/app/actions/auth";
import { User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import AnnouncementBar from "./AnnouncementBar";

type HeaderProps = {
  user: Omit<User, "passwordHash"> | null;
};

const Header = ({ user }: HeaderProps) => {
  const [isVisible, setVisibility] = useState<boolean>(true);
  const [prevScrollY, setPrevScrollY] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < prevScrollY) {
        setVisibility(true);
      } else if (currentScrollY > 100) {
        setVisibility(false);
      }
      setPrevScrollY(currentScrollY);
    };
    setPrevScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);
  return (
    <>
      <header className="w-full sticky top-0 z-50">
        <div
          className={`w-full transform transition-transform duration-400 ease-in-out ${
            isVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <AnnouncementBar />
          <div className="w-full flex justify-between items-center py-3 sm:py-4 bg-white/50 shadow-sm border-b border-gray-100 backdrop-blur-sm">
            <div className="flex justify-between items-center container mx-auto px-8">
              <div className="flex flex-1 justify-start items-center gap-4 sm:gap-6">
                <button className="text-gray-500 hover:text-gray-800 md:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <nav className="hidden md:flex gap-4 lg:gap-6 text-md font-bold">
                  <Link href="#">Shop</Link>
                  <Link href="#">New Arrivals</Link>
                  <Link href="#">Sale</Link>
                </nav>
              </div>
              <Link href="#" className="absolute left-1/2 -translate-x-0.5">
                <span className="text-xl sm:text-2xl font-bold tracking-tight">
                  ALL IN ONE
                </span>
              </Link>
              <div className="flex flex-1 justify-end items-center gap-2 sm:gap-4">
                <button className="text-gray-700 hover:text-gray-900 hidden sm:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>

                {user ? (
                  <div className="flex items-center gap-2 sm:gap-4 relative">
                    <div className="relative hidden md:block">
                      <span className="text-xs sm:text-sm text-gray-700 hidden md:block">
                        {user.email}
                      </span>
                      <span className="absolute -top-1 -right-1 flex">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-sky-500"></span>
                      </span>
                    </div>
                    <Link
                      href="#"
                      className="text-xs sm:text-sm fonct-medium text-gray-700 hover:text-gray-900"
                      onClick={async (event) => {
                        event.preventDefault();
                        await logoutUser();
                        router.refresh();
                      }}
                    >
                      Sign Out
                    </Link>
                  </div>
                ) : (
                  <React.Fragment>
                    <Link href="/auth/signin">Sign In</Link>
                    <Link href="/auth/signup">Sign Up</Link>
                  </React.Fragment>
                )}

                <button className="text-gray-700 hover:text-gray-900 relative hover:animate-bounce delay-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] sm:text-xs w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center ">
                    0
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
