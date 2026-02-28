import React from "react";
import Image from "next/image";
import heroMan from "../../public/image/man-image.png";
import victorLogo from "../../public/image/Vector.png";

const HeroSection = () => {
  return (
    <section className="w-full bg-[#f4f4fc] relative overflow-hidden min-h-[700px]  flex items-center">
      {/* Background geometric lines decoration */}
      <div className="absolute right-[28%] top-6 opacity-25 pointer-events-none hidden md:block">
        <svg width="200" height="180" viewBox="0 0 200 180" fill="none">
          <rect
            x="5"
            y="5"
            width="90"
            height="70"
            rx="6"
            stroke="#818cf8"
            strokeWidth="1.2"
            fill="none"
          />
          <rect
            x="30"
            y="30"
            width="110"
            height="85"
            rx="6"
            stroke="#818cf8"
            strokeWidth="1.2"
            fill="none"
          />
          <rect
            x="60"
            y="60"
            width="120"
            height="90"
            rx="6"
            stroke="#818cf8"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      </div>

      {/* ── Left Content ── */}
      <div className="relative z-20 px-8 md:px-16 py-14 flex-1 max-w-[600px]">
        {/* Heading */}
        <div className="w-[533px] ">
          <h1 className="text-[2.6rem] md:text-[3.4rem] font-black text-gray-900 leading-[1.12] tracking-tight">
            Discover
          </h1>
          <h1 className="text-[2.6rem] md:text-[3.4rem] font-black text-gray-900 leading-[1.12] tracking-tight">
            more than
          </h1>
          <h1 className="text-[2.6rem] md:text-[3.4rem] font-black text-[#3b82f6] leading-[1.12] tracking-tight mb-2">
            5000+ Jobs
          </h1>
        </div>

        {/* Wavy underline image */}
        <div className="mb-6">
          <Image
            src={victorLogo}
            alt="underline"
            width={455}
            height={32}
            className="w-[455px] h-[32px] opacity-100"
          />
        </div>

        {/* Subtitle */}
        <p className="w-[521px] h-[64px] opacity-70 text-gray-500 text-[0.88rem] md:text-[0.95rem] leading-relaxed mb-8 max-w-[360px]">
          Great platform for the job seeker that searching for
          <br />
          new career heights and passionate about startups.
        </p>

        {/* ── DESKTOP Search Box: w-[852px] h-[89px] p-[16px] ── */}
        <div
          className="hidden md:flex items-center bg-white border border-[#e5e7eb] rounded overflow-hidden"
          style={{
            width: "852px",
            height: "89px",
            padding: "16px",
            boxShadow: "0 4px 24px 0 rgba(80, 80, 180, 0.07)",
          }}
        >
          {/* Job Title Input */}
          <div className="flex items-center gap-3 flex-1 h-full border-r border-gray-200 pr-4">
            <svg
              className="w-5 h-5 text-gray-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Job title or keyword"
              className="outline-none text-sm text-gray-400 placeholder-gray-400 w-full bg-transparent"
            />
          </div>

          {/* Location Select */}
          <div className="flex items-center gap-3 flex-1 h-full pl-4 pr-4">
            <svg
              className="w-5 h-5 text-gray-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z"
              />
              <circle cx="12" cy="8" r="2" />
            </svg>
            <select className="outline-none text-sm text-gray-500 bg-transparent w-full cursor-pointer">
              <option>Florence, Italy</option>
              <option>New York, USA</option>
              <option>London, UK</option>
              <option>Dhaka, Bangladesh</option>
            </select>
            {/* Chevron */}
            <svg
              className="w-4 h-4 text-gray-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Search Button — fills the right portion, respects 16px padding */}
          <button className="bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold text-[0.95rem] rounded transition-all duration-200 shrink-0 whitespace-nowrap h-full px-8">
            Search my job
          </button>
        </div>

        {/* ── MOBILE: stacked card ── */}
        <div className="flex md:hidden flex-col bg-white rounded-xl shadow-md w-full max-w-[360px] overflow-hidden border border-gray-100">
          {/* Job Title */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
            <svg
              className="w-4 h-4 text-gray-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Job title or keyword"
              className="outline-none text-sm text-gray-400 placeholder-gray-400 w-full bg-transparent"
            />
          </div>

          {/* Location */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
            <svg
              className="w-4 h-4 text-gray-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z"
              />
              <circle cx="12" cy="8" r="2" />
            </svg>
            <select className="outline-none text-sm text-gray-500 bg-transparent w-full cursor-pointer flex-1">
              <option>Florence, Italy</option>
              <option>New York, USA</option>
              <option>London, UK</option>
              <option>Dhaka, Bangladesh</option>
            </select>
            <svg
              className="w-4 h-4 text-gray-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Button full width */}
          <button className="bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-sm font-semibold py-4 transition-all duration-200 w-full">
            Search my job
          </button>
        </div>

        {/* Popular Tags */}
        <p className="text-gray-400 text-xs mt-4">
          <span className="font-semibold text-gray-500">Popular :</span> UI
          Designer, UX Researcher, Android, Admin
        </p>
      </div>

      {/* ── Right Man Image (desktop only) ── */}
      <div
        className="hidden md:block absolute pointer-events-none select-none z-0"
        style={{
          width: "501px",
          height: "707px",
          top: "10px",
          left: "820px",
        }}
      >
        <Image
          src={heroMan}
          alt="hero-man"
          width={501}
          height={707}
          className="w-full h-full object-contain object-bottom"
          priority
        />
      </div>
    </section>
  );
};

export default HeroSection;
