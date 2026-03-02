// JobList component - replace your existing one

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useGetJobsQuery } from "../redux/api/baseApi";
import Loading from "../loading";
import JobSearchPage from "../job-search/page";
import Image from "next/image";

type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  category?: string;
  description: string;
  type?: string;
  logo?: string;
};

const JobList: React.FC = () => {
  const { data, isLoading, error } = useGetJobsQuery([]);
  const jobsArray: Job[] = Array.isArray(data?.data) ? data.data : [];

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const filteredJobs = jobsArray.filter((job) => {
    const matchKeyword = job.title
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const matchLocation = location ? job.location === location : true;
    const matchCategory = category ? job.category === category : true;
    return matchKeyword && matchLocation && matchCategory;
  });

  if (isLoading) return <Loading />;

  if (error)
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Failed to load jobs. Please try again.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );

  return (
    <section className="w-full bg-white  px-6 md:px-16 py-12 md:py-16 h-screen">
      <JobSearchPage
        keyword={keyword}
        setKeyword={setKeyword}
        location={location}
        setLocation={setLocation}
        category={category}
        setCategory={setCategory}
        jobs={jobsArray}
      />

      {/* 🔥 No Results Found UI */}
      {filteredJobs.length === 0 ? (
        <div className="flex flex-col items-center  justify-center py-20 text-center">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-5">
            <svg
              className="w-10 h-10 text-indigo-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            No Jobs Found
          </h3>
          <p className="text-gray-400 text-sm mb-5">
            We couldnt find any jobs matching your search. Try different
            keywords or filters.
          </p>
          <button
            onClick={() => {
              setKeyword("");
              setLocation("");
              setCategory("");
            }}
            className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        // 🔥 Sunder Job Cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
          {filteredJobs.map((job) => (
            <Link
              key={job._id}
              href={`/job-list/${job._id}`}
              className="group relative bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl p-6 
      shadow-sm hover:shadow-2xl hover:shadow-indigo-100/40 
      hover:-translate-y-2 transition-all duration-300 ease-out"
            >
              {/* Glow Effect */}
              <div
                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/0 
      group-hover:from-indigo-50 group-hover:via-indigo-50 group-hover:to-indigo-50 
      transition-all duration-500 -z-10"
              />

              {/* Logo + Company */}
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-200 
        flex items-center justify-center text-indigo-700 font-bold text-lg 
        overflow-hidden shadow-inner"
                >
                  {job.logo ? (
                    <Image
                      src={job.logo}
                      alt={job.company}
                      width={60}
                      height={60}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    job.company?.charAt(0).toUpperCase() || "J"
                  )}
                </div>

                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-semibold text-gray-700 truncate">
                    {job.company}
                  </span>
                  <span className="text-xs text-gray-400">{job.location}</span>
                </div>
              </div>

              {/* Title */}
              <h3
                className="text-lg font-bold text-gray-900 leading-snug mb-4 
      group-hover:text-indigo-600 transition-colors line-clamp-2"
              >
                {job.title}
              </h3>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {job.type && (
                  <span className="text-xs bg-indigo-600/10 text-indigo-600 px-3 py-1.5 rounded-full font-semibold">
                    {job.type}
                  </span>
                )}
                {job.category && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full font-medium">
                    {job.category}
                  </span>
                )}
              </div>

              {/* Hover Arrow */}
              <div
                className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 
      transition-opacity duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-md">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default JobList;
