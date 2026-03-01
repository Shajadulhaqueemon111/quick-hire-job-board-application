"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetJobsQuery } from "../redux/api/baseApi";
import Loading from "../loading";

// Types
type Tag = { label: string; color: string };
type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  category?: string;
  description: string;
  type?: string;
  logo?: string;
  tags?: Tag[];
  createdAt?: string;
};

const JobList: React.FC = () => {
  const { data, isLoading, error } = useGetJobsQuery([]);

  // Extract jobs array from backend response
  const jobsArray: Job[] = Array.isArray(data?.data) ? data.data : [];

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error loading jobs</div>;
  if (!jobsArray.length) return <div>No featured jobs found</div>;

  return (
    <section className="w-full bg-white px-6 md:px-16 py-12 md:py-16 h-screen">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">
          Featured <span className="text-[#3b82f6]">jobs</span>
        </h2>
        <Link
          href="/jobs"
          className="flex items-center gap-2 text-indigo-600 font-semibold text-sm hover:gap-3 transition-all duration-200"
        >
          Show all jobs
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {jobsArray.map((job) => (
          <Link
            key={job._id}
            href={`/job-list/${job._id}`}
            className="border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-indigo-200 transition-all duration-200 cursor-pointer flex flex-col gap-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center bg-gray-50 border border-gray-100">
                <Image
                  src={job.logo || "/image/Featured-job-logo/Company-Logo.png"}
                  alt={job.company || "Company Logo"}
                  width={44}
                  height={44}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="border border-indigo-400 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-md">
                {job.type || "Full Time"}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                {job.title}
              </h3>
              <p className="text-sm text-gray-400 mt-0.5">
                {job.company}
                <span className="mx-1.5 text-gray-300">·</span>
                {job.location}
              </p>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed">
              {job.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto pt-1">
              {job.tags?.length ? (
                job.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${tag.color}`}
                  >
                    {tag.label}
                  </span>
                ))
              ) : (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-500">
                  No Tag
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default JobList;
