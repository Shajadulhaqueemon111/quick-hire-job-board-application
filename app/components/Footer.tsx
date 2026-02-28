import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="w-full bg-[#1e1e2d] text-white">
      <div className="px-8 md:px-16 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* ── Col 1: Logo + Description ── */}
        <div className="flex flex-col gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="4" fill="white" />
                <path
                  d="M12 2v3M12 19v3M2 12h3M19 12h3"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight">QuickHire</span>
          </div>
          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed max-w-[220px]">
            Great platform for the job seeker that passionate about startups.
            Find your dream job easier.
          </p>
        </div>

        {/* ── Col 2: About ── */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base">About</h4>
          <ul className="flex flex-col gap-3">
            {["Companies", "Pricing", "Terms", "Advice", "Privacy Policy"].map(
              (item) => (
                <li key={item}>
                  <a
                    href="/comming-soon"
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* ── Col 3: Resources ── */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base">Resources</h4>
          <ul className="flex flex-col gap-3">
            {["Help Docs", "Guide", "Updates", "Contact Us"].map((item) => (
              <li key={item}>
                <a
                  href="/comming-soon"
                  className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Col 4: Newsletter ── */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-bold text-base">
            Get job notifications
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            The latest job news, articles, sent to your inbox weekly.
          </p>
          {/* Email Input + Button */}
          <div className="flex items-center gap-0 mt-1">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 bg-[#2a2a3d] text-sm text-gray-300 placeholder-gray-500 px-4 py-3 rounded-l-lg outline-none border border-[#3a3a50] focus:border-indigo-500 transition-colors duration-200"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-3 rounded-r-lg transition-colors duration-200 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-[#2e2e40] px-8 md:px-16 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="text-gray-500 text-sm">
          2021 @ QuickHire. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          {[
            { icon: <FaFacebookF size={14} />, href: "/comming-soon" },
            { icon: <FaInstagram size={14} />, href: "/comming-soon" },
            { icon: <TbWorld size={14} />, href: "/comming-soon" },
            { icon: <FaLinkedinIn size={14} />, href: "/comming-soon" },
            { icon: <FaTwitter size={14} />, href: "/comming-soon" },
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              className="w-9 h-9 rounded-full bg-[#2a2a3d] border border-[#3a3a50] flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500 hover:bg-indigo-600 transition-all duration-200"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
