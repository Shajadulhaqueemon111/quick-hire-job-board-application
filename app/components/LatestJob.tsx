import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo1 from "../../public/image/latest-job-logo/latest-job-logo-1.png";
import logo2 from "../../public/image/latest-job-logo/latest-job-logo2.png";
import logo3 from "../../public/image/latest-job-logo/latest-job-logo3.png";
import logo4 from "../../public/image/latest-job-logo/latest-job-logo4.png";
import logo5 from "../../public/image/latest-job-logo/latest-job-logo5.png";
import logo6 from "../../public/image/latest-job-logo/latest-job-logo6.png";
import logo7 from "../../public/image/latest-job-logo/latest-job-logo7.png";
import logo8 from "../../public/image/latest-job-logo/latest-job-logo8.png";

const jobs = [
  {
    id: 9,
    logo: logo1,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    tags: [
      { label: "Full-Time", color: "bg-green-100 text-green-500" },
      { label: "Marketing", color: "bg-orange-100 text-orange-400" },
      {
        label: "Design",
        color: "bg-indigo-100 text-indigo-600 border border-indigo-300",
      },
    ],
  },
  {
    id: 10,
    logo: logo2,
    title: "Social Media Assistant",
    company: "Netlify",
    location: "Paris, France",
    tags: [
      { label: "Full-Time", color: "bg-green-100 text-green-500" },
      { label: "Marketing", color: "bg-orange-100 text-orange-400" },
      {
        label: "Design",
        color: "bg-indigo-100 text-indigo-600 border border-indigo-300",
      },
    ],
  },
  {
    id: 11,
    logo: logo3,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, USA",
    tags: [
      { label: "Full-Time", color: "bg-green-100 text-green-500" },
      { label: "Marketing", color: "bg-orange-100 text-orange-400" },
      {
        label: "Design",
        color: "bg-indigo-100 text-indigo-600 border border-indigo-300",
      },
    ],
  },
  {
    id: 12,
    logo: logo4,
    title: "Brand Designer",
    company: "Maze",
    location: "San Fransisco, USA",
    tags: [
      { label: "Full-Time", color: "bg-green-100 text-green-500" },
      { label: "Marketing", color: "bg-orange-100 text-orange-400" },
      {
        label: "Design",
        color: "bg-indigo-100 text-indigo-600 border border-indigo-300",
      },
    ],
  },
  {
    id: 13,
    logo: logo5,
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    tags: [
      { label: "Full-Time", color: "bg-green-100 text-green-500" },
      { label: "Marketing", color: "bg-orange-100 text-orange-400" },
      {
        label: "Design",
        color: "bg-indigo-100 text-indigo-600 border border-indigo-300",
      },
    ],
  },
  {
    id: 14,
    logo: logo6,
    title: "Interactive Developer",
    company: "Udacity",
    location: "Hamburg, Germany",
    tags: [
      { label: "Full-Time", color: "bg-green-100 text-green-500" },
      { label: "Marketing", color: "bg-orange-100 text-orange-400" },
      {
        label: "Design",
        color: "bg-indigo-100 text-indigo-600 border border-indigo-300",
      },
    ],
  },
  {
    id: 15,
    logo: logo7,
    title: "HR Manager",
    company: "Packer",
    location: "Lucern, Switzerland",
    tags: [
      { label: "Full-Time", color: "bg-green-100 text-green-500" },
      { label: "Marketing", color: "bg-orange-100 text-orange-400" },
      {
        label: "Design",
        color: "bg-indigo-100 text-indigo-600 border border-indigo-300",
      },
    ],
  },
  {
    id: 16,
    logo: logo8,
    title: "HR Manager",
    company: "Webflow",
    location: "Lucern, Switzerland",
    tags: [
      { label: "Full-Time", color: "bg-green-100 text-green-500" },
      { label: "Marketing", color: "bg-orange-100 text-orange-400" },
      {
        label: "Design",
        color: "bg-indigo-100 text-indigo-600 border border-indigo-300",
      },
    ],
  },
];

const LatestJobs = () => {
  return (
    <section className="w-full bg-[#f8f8fc] px-6 md:px-16 py-12 md:py-16 relative overflow-hidden">
      {/* Background geometric lines */}
      <div className="absolute right-8 top-8 opacity-20 pointer-events-none hidden md:block">
        <svg width="180" height="160" viewBox="0 0 180 160" fill="none">
          <rect
            x="5"
            y="5"
            width="80"
            height="60"
            rx="5"
            stroke="#818cf8"
            strokeWidth="1.2"
            fill="none"
          />
          <rect
            x="25"
            y="25"
            width="100"
            height="75"
            rx="5"
            stroke="#818cf8"
            strokeWidth="1.2"
            fill="none"
          />
          <rect
            x="50"
            y="50"
            width="110"
            height="80"
            rx="5"
            stroke="#818cf8"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      </div>
      <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none hidden md:block">
        <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
          <rect
            x="5"
            y="5"
            width="60"
            height="45"
            rx="5"
            stroke="#818cf8"
            strokeWidth="1.2"
            fill="none"
          />
          <rect
            x="20"
            y="20"
            width="80"
            height="60"
            rx="5"
            stroke="#818cf8"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8 md:mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">
          Latest <span className="text-[#3b82f6]">jobs open</span>
        </h2>
        <a
          href="#"
          className="hidden md:flex items-center gap-2 text-indigo-600 font-semibold text-sm hover:gap-3 transition-all duration-200"
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
        </a>
      </div>

      {/* 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <Link
            key={job.id}
            href={`/latest-jobs/${job.id}`}
            className="bg-white border border-gray-200 rounded-2xl w-full h-[149px] px-8 py-6 flex items-center gap-5 hover:shadow-md hover:border-indigo-200 transition-all duration-200 cursor-pointer group"
          >
            {/* Logo */}
            <div className="w-16 h-16 shrink-0 rounded-2xl overflow-hidden flex items-center justify-center">
              <Image
                src={job.logo}
                alt={job.company}
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors duration-200">
                {job.title}
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                {job.company}
                <span className="mx-1.5 text-gray-300">•</span>
                {job.location}
              </p>
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${tag.color}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Show all jobs — mobile only */}
      <a
        href="#"
        className="flex md:hidden items-center gap-2 text-indigo-600 font-semibold text-sm mt-6"
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
      </a>
    </section>
  );
};

export default LatestJobs;
