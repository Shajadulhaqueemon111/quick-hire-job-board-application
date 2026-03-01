"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useGetJobByIdQuery } from "@/app/redux/api/baseApi";
import Loading from "@/app/loading";
import ApplyForm from "@/app/application-validation/application-form";

type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  category?: string;
  description: string;
  createdAt: string;
  type?: string;
  salary?: string;
  deadline?: string;
  logo?: string;
  tags?: { label: string; color: string }[];
  responsibilities?: string[];
  requirements?: string[];
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

function categoryStyle(cat?: string) {
  const map: Record<string, string> = {
    "Software Development": "bg-indigo-50 text-indigo-600",
    Design: "bg-pink-50 text-pink-600",
    Marketing: "bg-orange-50 text-orange-600",
    HR: "bg-green-50 text-green-600",
    Finance: "bg-blue-50 text-blue-600",
    DevOps: "bg-purple-50 text-purple-600",
  };
  return map[cat ?? ""] ?? "bg-gray-100 text-gray-500";
}

const JobDetails: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error } = useGetJobByIdQuery(id);
  const job: Job | null =
    (data as { data?: Job })?.data ?? (data as Job) ?? null;

  const [tab, setTab] = useState<"description" | "company">("description");

  if (isLoading) return <Loading />;

  if (error || !job) {
    return (
      <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <h2 className="text-xl font-black text-gray-800 mb-2">
            Job not found
          </h2>
          <p className="text-sm text-gray-400">
            This listing may have been removed.
          </p>
        </div>
      </div>
    );
  }

  const posted = timeAgo(job.createdAt);
  const catStyle = categoryStyle(job.category);
  const avatarLetter = job.company?.[0]?.toUpperCase() ?? "J";

  const responsibilities = job.responsibilities ?? [
    `Develop and maintain ${job.category ?? "software"} solutions for ${job.company}`,
    "Write clean, scalable, and well-documented code",
    "Collaborate with cross-functional teams to define and ship features",
    "Participate in code reviews and contribute to engineering standards",
    "Debug and resolve technical issues across the stack",
    `Continuously improve skills in ${job.category ?? "your area"}`,
  ];

  const requirements = job.requirements ?? [
    `2+ years of relevant experience as a ${job.title}`,
    "Strong analytical and problem-solving skills",
    "Excellent written and verbal communication",
    "Ability to work both independently and as part of a team",
    `Comfortable working in ${job.location} or remotely`,
  ];

  return (
    <div className="min-h-screen bg-[#f5f6fa] py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_370px] gap-6 items-start">
        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col gap-5">
          {/* Hero card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-md">
                {job.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-full h-full object-contain rounded-2xl"
                  />
                ) : (
                  <span className="text-white text-2xl font-black">
                    {avatarLetter}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                  {job.title}
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  {job.company}
                  <span className="mx-2 text-gray-200">·</span>
                  {job.location}
                </p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="border border-indigo-400 text-indigo-600 text-sm font-semibold px-4 py-1.5 rounded-lg">
                {job.type ?? "Full Time"}
              </span>
              {job.category && (
                <span
                  className={`text-xs font-bold px-3 py-1.5 rounded-full ${catStyle}`}
                >
                  {job.category}
                </span>
              )}
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  icon: "💰",
                  label: "Salary",
                  value: job.salary ?? "Negotiable",
                },
                { icon: "📍", label: "Location", value: job.location },
                { icon: "🕐", label: "Posted", value: posted },
                {
                  icon: "📅",
                  label: "Deadline",
                  value: job.deadline
                    ? new Date(job.deadline).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Open",
                },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 font-medium mb-1">
                    {item.icon} {item.label}
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Tags */}
            {job.tags && job.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {job.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full ${tag.color}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Tab bar */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex">
              {(["description", "company"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-4 text-sm font-semibold transition-all duration-200 ${
                    tab === t
                      ? "bg-indigo-600 text-white"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {t === "description" ? "Job Description" : "About Company"}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            {tab === "description" ? (
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-black text-gray-900 mb-3">
                    About the Role
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-black text-gray-900 mb-4">
                    Responsibilities
                  </h2>
                  <ul className="flex flex-col gap-3">
                    {responsibilities.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-gray-500"
                      >
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 text-xs font-bold">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-black text-gray-900 mb-4">
                    Requirements
                  </h2>
                  <ul className="flex flex-col gap-3">
                    {requirements.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-gray-500"
                      >
                        <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 text-xs font-bold">
                          →
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-black text-gray-900 mb-3">
                  About {job.company}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  {job.company} is a company in the{" "}
                  <span className="font-semibold text-gray-700">
                    {job.category ?? "technology"}
                  </span>{" "}
                  space, based in{" "}
                  <span className="font-semibold text-gray-700">
                    {job.location}
                  </span>
                  . We are building great products and looking for passionate
                  people to join our team.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    {
                      icon: "🏢",
                      label: "Industry",
                      value: job.category ?? "Technology",
                    },
                    { icon: "📍", label: "Location", value: job.location },
                    {
                      icon: "💼",
                      label: "Job Type",
                      value: job.type ?? "Full Time",
                    },
                    { icon: "🕐", label: "Posted", value: posted },
                    { icon: "✅", label: "Status", value: "Active" },
                    {
                      icon: "📂",
                      label: "Category",
                      value: job.category ?? "General",
                    },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-400 flex items-center gap-1.5 mb-1">
                        {item.icon} {item.label}
                      </p>
                      <p className="text-sm font-bold text-gray-800">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN — Apply Form ── */}
        <div className="lg:sticky lg:top-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            {/* ApplyForm handles its own state, validation, success & error */}
            <ApplyForm jobId={id} jobTitle={job.title} company={job.company} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
