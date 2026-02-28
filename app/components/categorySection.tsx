"use client";
import React, { useState } from "react";

const categories = [
  {
    id: 1,
    title: "Design",
    jobs: 235,
    icon: (active: boolean) => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M6 26L13 19M20 4L28 12L14 26L6 26L6 18L20 4Z"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 8L20 12"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Sales",
    jobs: 756,
    icon: (active: boolean) => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M6 24V18M11 24V14M16 24V10M21 24V6M26 24V12"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          cx="16"
          cy="7"
          r="3"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Marketing",
    jobs: 140,
    icon: (active: boolean) => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M8 20V14L24 8V26L8 20Z"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 20L6 26"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M19 10C21 13, 21 19, 19 22"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Finance",
    jobs: 325,
    icon: (active: boolean) => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect
          x="5"
          y="8"
          width="22"
          height="16"
          rx="2"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="16"
          cy="16"
          r="4"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M5 13H27"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Technology",
    jobs: 436,
    icon: (active: boolean) => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect
          x="5"
          y="5"
          width="22"
          height="16"
          rx="2"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M11 27H21M16 21V27"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Engineering",
    jobs: 542,
    icon: (active: boolean) => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M10 10L6 16L10 22"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 10L26 16L22 22"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 24L18 8"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 7,
    title: "Business",
    jobs: 211,
    icon: (active: boolean) => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect
          x="8"
          y="12"
          width="16"
          height="14"
          rx="2"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M12 12V10C12 8 20 8 20 10V12"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8 18H24"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="1.5"
        />
        <circle cx="16" cy="18" r="2" fill={active ? "white" : "#4f46e5"} />
      </svg>
    ),
  },
  {
    id: 8,
    title: "Human Resource",
    jobs: 346,
    icon: (active: boolean) => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle
          cx="16"
          cy="10"
          r="4"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="8"
          cy="12"
          r="3"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="1.5"
          fill="none"
        />
        <circle
          cx="24"
          cy="12"
          r="3"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M6 26C6 22 10 20 16 20C22 20 26 22 26 26"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M2 26C2 23 5 22 8 22"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M30 26C30 23 27 22 24 22"
          stroke={active ? "white" : "#4f46e5"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const CategorySection = () => {
  const [activeId, setActiveId] = useState(3);

  return (
    <section className="w-full bg-white px-6 md:px-16 py-12 md:py-16">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-8 md:mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900">
          Explore by <span className="text-[#3b82f6]">category</span>
        </h2>
        {/* Show all jobs — desktop only in header */}
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

      {/* ── DESKTOP: 4-column grid, cards vertical ── */}
      <div className="hidden md:grid grid-cols-4 gap-4">
        {categories.map((cat) => {
          const isActive = cat.id === activeId;
          return (
            <div
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className={`
                cursor-pointer rounded-xl p-6 border transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-600 border-indigo-600 shadow-lg shadow-indigo-200"
                    : "bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md"
                }
              `}
            >
              <div className="mb-6">{cat.icon(isActive)}</div>
              <h3
                className={`text-lg font-bold mb-1 ${isActive ? "text-white" : "text-gray-900"}`}
              >
                {cat.title}
              </h3>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm ${isActive ? "text-indigo-100" : "text-gray-400"}`}
                >
                  {cat.jobs} jobs available
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={isActive ? "white" : "#9ca3af"}
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── MOBILE: single column, horizontal rows ── */}
      <div className="flex flex-col md:hidden gap-3">
        {categories.map((cat) => {
          const isActive = cat.id === activeId;
          return (
            <div
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className={`
                cursor-pointer rounded-xl px-5 py-4 border flex items-center gap-4 transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-600 border-indigo-600"
                    : "bg-white border-gray-200"
                }
              `}
            >
              {/* Icon */}
              <div className="shrink-0">{cat.icon(isActive)}</div>

              {/* Text */}
              <div className="flex-1">
                <p
                  className={`text-base font-bold leading-tight ${isActive ? "text-white" : "text-gray-900"}`}
                >
                  {cat.title}
                </p>
                <p
                  className={`text-sm mt-0.5 ${isActive ? "text-indigo-100" : "text-gray-400"}`}
                >
                  {cat.jobs} jobs available
                </p>
              </div>

              {/* Arrow */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isActive ? "white" : "#9ca3af"}
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </div>
          );
        })}
      </div>

      {/* Show all jobs — mobile only, bottom */}
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

export default CategorySection;
