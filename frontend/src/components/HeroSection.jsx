import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "./ui/skeleton"; // Import Skeleton loader

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const searchJobHandler = () => {
    if (!query.trim()) {
      alert("Please enter a job title or keyword.");
      return;
    }

    setIsLoading(true);
    dispatch(setSearchedQuery(query));
    navigate("/browse");
    setIsLoading(false); // Consider moving this to a `.then()` or `.finally()` block if using async actions
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 sm:mt-32 mt-20 animate-fade-in md:animate-slide-up">
        {/* Skeleton loader for "No. 1 Job Hunt Website" */}
        <Skeleton
          className={`mx-auto px-4 py-1 rounded-full ${
            isLoading ? "bg-gray-300" : "bg-white text-yellow-500"
          } outline-dotted text-sm sm:text-xl font-medium`}
          visible={!isLoading}
        >
          No. 1 Job Hunt Website
        </Skeleton>

        {/* Skeleton loader for the heading */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#48bff2] transition duration-500 ease-in-out">
          {isLoading ? (
            <Skeleton className="h-10 w-3/4 mx-auto" />
          ) : (
            <>
              Search, Apply & <br />
              Get Your <span className="text-[#161D6F]">Dream Jobs</span>
            </>
          )}
        </h1>

        {/* Skeleton loader for the subheading */}
        <p className="text-sm sm:text-base md:text-lg transition-opacity duration-700 opacity-80 text-[#1b0385] font-semibold">
          {isLoading ? (
            <Skeleton className="h-6 w-1/2 mx-auto" />
          ) : (
            "JOB PORTAL - FINDS YOU A DREAM JOB"
          )}
        </p>

        {/* Skeleton loader for the input field */}
        <div className="flex w-[90%] md:w-[40%] shadow-lg border bg-white border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          {isLoading ? (
            <Skeleton className="h-10 w-full mx-auto" />
          ) : (
            <input
              type="text"
              placeholder="Find your dream jobs"
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none border-none w-full text-[#161D6F] text-base md:text-lg animate-input-focus transition-all duration-500"
            />
          )}
          
          <Button
            onClick={searchJobHandler}
            className={`rounded-r-full ${
              isLoading ? "bg-gray-400" : "bg-[#0B2F9F] hover:bg-[#161D6F]"
            } transition-transform duration-300 ease-in-out hover:scale-105`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-spin">🔄</span>
            ) : (
              <Search className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
