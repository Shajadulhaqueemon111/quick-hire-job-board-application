/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Syne, DM_Sans } from "next/font/google";
import { Job } from "../data/data";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

type ApplyForm = {
  name: string;
  email: string;
  resumeUrl: string;
  coverNote: string;
};

const JobDetailUI = ({ job }: { job: Job }) => {
  const [form, setForm] = useState<ApplyForm>({
    name: "",
    email: "",
    resumeUrl: "",
    coverNote: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "company">(
    "description",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className={`min-h-screen bg-[#f8f7ff] ${dmSans.className}`}>
      {/* ── Navbar ── */}
      <nav className="bg-white border-b border-gray-100 px-6 md:px-16 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="4" fill="white" />
              <path
                d="M12 2v3M12 19v3M2 12h3M19 12h3"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span
            className={`text-lg font-black text-gray-900 ${syne.className}`}
          >
            QuickHire
          </span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors font-medium"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 12H5M12 5l-7 7 7 7"
            />
          </svg>
          Back to jobs
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── LEFT: Job Details ── */}
          <div className="flex-1 min-w-0">
            {/* Job Header Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6 shadow-sm">
              <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-black text-2xl">
                    {job.company[0]}
                  </div>
                  <div>
                    <h1
                      className={`text-2xl font-black text-gray-900 ${syne.className}`}
                    >
                      {job.title}
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                      {job.company}
                      <span className="mx-2 text-gray-300">·</span>
                      {job.location}
                    </p>
                  </div>
                </div>
                <span className="border border-indigo-400 text-indigo-600 text-sm font-semibold px-4 py-1.5 rounded-lg">
                  {job.type}
                </span>
              </div>

              {/* Meta info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { icon: "💰", label: "Salary", value: job.salary },
                  { icon: "📍", label: "Location", value: job.location },
                  { icon: "🕐", label: "Posted", value: job.posted },
                  { icon: "📅", label: "Deadline", value: job.deadline },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">
                      {item.icon} {item.label}
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag: any, i: any) => (
                  <span
                    key={i}
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${tag.color}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 mb-6 w-fit shadow-sm">
              {(["description", "company"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab === "description" ? "Job Description" : "About Company"}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "description" ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm space-y-8">
                <div>
                  <h2
                    className={`text-lg font-black text-gray-900 mb-3 ${syne.className}`}
                  >
                    About the Role
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {job.about}
                  </p>
                </div>

                <div>
                  <h2
                    className={`text-lg font-black text-gray-900 mb-3 ${syne.className}`}
                  >
                    Responsibilities
                  </h2>
                  <ul className="space-y-2">
                    {job.responsibilities.map((r: any, i: any) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-gray-600"
                      >
                        <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2
                    className={`text-lg font-black text-gray-900 mb-3 ${syne.className}`}
                  >
                    Requirements
                  </h2>
                  <ul className="space-y-2">
                    {job.requirements.map((r, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-gray-600"
                      >
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 12h14"
                            />
                          </svg>
                        </span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2
                    className={`text-lg font-black text-gray-900 mb-3 ${syne.className}`}
                  >
                    Benefits
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {job.benefits.map((b, i) => (
                      <span
                        key={i}
                        className="bg-green-50 text-green-700 border border-green-100 text-xs font-semibold px-3 py-1.5 rounded-full"
                      >
                        ✦ {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-black text-2xl">
                    {job.company[0]}
                  </div>
                  <div>
                    <h2
                      className={`text-xl font-black text-gray-900 ${syne.className}`}
                    >
                      {job.company}
                    </h2>
                    <p className="text-sm text-gray-400">{job.location}</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {job.companyDesc}
                </p>
              </div>
            )}
          </div>

          {/* ── RIGHT: Apply Form ── */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm sticky top-24">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3
                    className={`text-xl font-black text-gray-900 mb-2 ${syne.className}`}
                  >
                    Application Sent!
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Your application has been submitted to{" "}
                    <strong>{job.company}</strong>. They will get back to you
                    soon.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        resumeUrl: "",
                        coverNote: "",
                      });
                    }}
                    className="text-indigo-600 text-sm font-semibold hover:underline"
                  >
                    Apply again
                  </button>
                </div>
              ) : (
                <>
                  <h3
                    className={`text-xl font-black text-gray-900 mb-1 ${syne.className}`}
                  >
                    Apply Now
                  </h3>
                  <p className="text-sm text-gray-400 mb-6">
                    Fill in your details to apply for this role
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all placeholder-gray-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all placeholder-gray-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Resume Link (URL)
                      </label>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/..."
                        value={form.resumeUrl}
                        onChange={(e) =>
                          setForm({ ...form, resumeUrl: e.target.value })
                        }
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all placeholder-gray-300"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Google Drive, Notion, or any public link
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Cover Note
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us why you're a great fit for this role..."
                        value={form.coverNote}
                        onChange={(e) =>
                          setForm({ ...form, coverNote: e.target.value })
                        }
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all placeholder-gray-300 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                    >
                      {loading ? (
                        <svg
                          className="animate-spin w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="white"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="white"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                      ) : (
                        <>
                          Submit Application
                          <svg
                            width="16"
                            height="16"
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
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailUI;
