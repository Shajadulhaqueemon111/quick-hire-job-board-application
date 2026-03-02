/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

type Props = {
  keyword: string;
  setKeyword: any;
  location: string;
  setLocation: any;
  category: string;
  setCategory: any;
  jobs: any[];
  onSearch?: () => void;
};

export default function JobSearchPage({
  keyword,
  setKeyword,
  location,
  setLocation,
  category,
  setCategory,

  jobs = [],
  onSearch,
}: Props) {
  const [draftKeyword, setDraftKeyword] = useState(keyword);
  const [draftLocation, setDraftLocation] = useState(location);
  const [draftCategory, setDraftCategory] = useState(category);

  const categories = Array.from(
    new Set(jobs.map((job) => job.category).filter(Boolean)),
  );
  const locations = Array.from(
    new Set(jobs.map((job) => job.location).filter(Boolean)),
  );

  const handleSearch = () => {
    setKeyword(draftKeyword);
    setLocation(draftLocation);
    setCategory(draftCategory);
    onSearch?.();
  };

  return (
    <div className="w-full flex justify-center mb-10">
      <div className="flex flex-col md:flex-row items-stretch md:items-center w-full max-w-4xl bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 flex-1 border-b md:border-b-0 md:border-r border-gray-200">
          <svg
            className="w-5 h-5 text-gray-400 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Job title or keyword"
            className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            value={draftKeyword}
            onChange={(e) => setDraftKeyword(e.target.value)}
          />
        </div>

        {/* 📍 Location Select */}
        <div className="flex items-center gap-3 px-5 py-4 flex-1 border-b md:border-b-0 md:border-r border-gray-200">
          <svg
            className="w-5 h-5 text-gray-400 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5z"
            />
          </svg>
          <select
            className="w-full text-sm text-gray-700 outline-none bg-transparent appearance-none cursor-pointer"
            value={draftLocation}
            onChange={(e) => setDraftLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map((loc: any) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/*  Category Select */}
        <div className="flex items-center gap-3 px-5 py-4 flex-1 border-b md:border-b-0 md:border-r border-gray-200">
          <svg
            className="w-5 h-5 text-gray-400 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
          <select
            className="w-full text-sm text-gray-700 outline-none bg-transparent appearance-none cursor-pointer"
            value={draftCategory} //
            onChange={(e) => setDraftCategory(e.target.value)} //
          >
            <option value="">All Categories</option>
            {categories.map((cat: any) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="px-4 py-3 flex items-center justify-center">
          <button
            onClick={handleSearch}
            className="w-full md:w-auto px-7 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
          >
            Search my job
          </button>
        </div>
      </div>
    </div>
  );
}
