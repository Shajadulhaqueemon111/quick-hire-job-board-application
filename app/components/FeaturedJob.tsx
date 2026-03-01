"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo0 from "../../public/image/Featured-job-logo/Company-Logo.png";
import logo1 from "../../public/image/Featured-job-logo/CompanyLogo1.png";
import logo2 from "../../public/image/Featured-job-logo/CompanyLogo2.png";
import logo3 from "../../public/image/Featured-job-logo/CompanyLogo3.png";
import logo4 from "../../public/image/Featured-job-logo/CompanyLogo4.png";
import logo5 from "../../public/image/Featured-job-logo/CompanyLogo5.png";
import logo6 from "../../public/image/Featured-job-logo/CompanyLogo6.png";
import logo7 from "../../public/image/Featured-job-logo/CompanyLogo7.png";

const jobs = [
  {
    id: 1,
    logo: logo0,
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    description: "Revolut is looking for Email Marketing to help team ma ...",
    type: "Full Time",
    tags: [
      { label: "Marketing", color: "bg-orange-100 text-orange-500" },
      { label: "Design", color: "bg-green-100 text-green-500" },
    ],
  },
  {
    id: 2,
    logo: logo1,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, US",
    description: "Dropbox is looking for Brand Designer to help the team t ...",
    type: "Full Time",
    tags: [
      { label: "Design", color: "bg-green-100 text-green-500" },
      { label: "Business", color: "bg-indigo-100 text-indigo-600" },
    ],
  },
  {
    id: 3,
    logo: logo2,
    title: "Email Marketing",
    company: "Pitch",
    location: "Berlin, Germany",
    description:
      "Pitch is looking for Customer Manager to join marketing t ...",
    type: "Full Time",
    tags: [{ label: "Marketing", color: "bg-orange-100 text-orange-500" }],
  },
  {
    id: 4,
    logo: logo3,
    title: "Visual Designer",
    company: "Blinklist",
    location: "Granada, Spain",
    description:
      "Blinkist is looking for Visual Designer to help team desi ...",
    type: "Full Time",
    tags: [{ label: "Design", color: "bg-green-100 text-green-500" }],
  },
  {
    id: 5,
    logo: logo4,
    title: "Product Designer",
    company: "ClassPass",
    location: "Manchester, UK",
    description: "ClassPass is looking for Product Designer to help us...",
    type: "Full Time",
    tags: [
      { label: "Marketing", color: "bg-orange-100 text-orange-500" },
      { label: "Design", color: "bg-green-100 text-green-500" },
    ],
  },
  {
    id: 6,
    logo: logo5,
    title: "Lead Designer",
    company: "Canva",
    location: "Ontario, Canada",
    description: "Canva is looking for Lead Engineer to help develop n ...",
    type: "Full Time",
    tags: [
      { label: "Design", color: "bg-green-100 text-green-500" },
      { label: "Business", color: "bg-indigo-100 text-indigo-600" },
    ],
  },
  {
    id: 7,
    logo: logo6,
    title: "Brand Strategist",
    company: "GoDaddy",
    location: "Marseille, France",
    description: "GoDaddy is looking for Brand Strategist to join the team...",
    type: "Full Time",
    tags: [{ label: "Marketing", color: "bg-orange-100 text-orange-500" }],
  },
  {
    id: 8,
    logo: logo7,
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    description: "Twitter is looking for Data Analyst to help team desi ...",
    type: "Full Time",
    tags: [{ label: "Technology", color: "bg-red-100 text-red-400" }],
  },
];

const FeaturedJobs = () => {
  return (
    <section className="w-full bg-white px-6 md:px-16 py-12 md:py-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">
          Featured <span className="text-[#3b82f6]">jobs</span>
        </h2>
        <a
          href="#"
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
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {jobs.map((job) => (
          <Link
            key={job.id}
            href={`/jobs/${job.id}`}
            className="border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-indigo-200 transition-all duration-200 cursor-pointer flex flex-col gap-3 group"
          >
            {/* Top row: logo + type badge */}
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center bg-gray-50 border border-gray-100">
                <Image
                  src={job.logo}
                  alt={job.company}
                  width={44}
                  height={44}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="border border-indigo-400 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-md">
                {job.type}
              </span>
            </div>

            {/* Title */}
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

            {/* Description */}
            <p className="text-sm text-gray-400 leading-relaxed">
              {job.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto pt-1">
              {job.tags.map((tag, i) => (
                <span
                  key={i}
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${tag.color}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedJobs;
