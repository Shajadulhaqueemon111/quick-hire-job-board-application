"use client";
import Image from "next/image";
import React, { useState } from "react";
import quickHirelogo from "../../public/image/Logo.png";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center overflow-hidden">
              <Image
                src={quickHirelogo}
                alt="quick-hire"
                width={50}
                height={50}
              />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              QuickHire
            </span>
          </div>
        </Link>
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/job-list"
            className="text-gray-600 text-sm font-medium hover:text-indigo-600 transition-colors duration-200"
          >
            Find Jobs
          </Link>
          <a
            href="#"
            className="text-gray-600 text-sm font-medium hover:text-indigo-600 transition-colors duration-200"
          >
            Browse Companies
          </a>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/login"
            className="text-gray-600 text-sm font-medium hover:text-indigo-600 transition-colors duration-200"
          >
            Login
          </Link>
          <Link href="/register">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden text-gray-700 hover:text-indigo-600 transition-colors duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          <Link
            href="comming-soon"
            className="text-gray-600 text-sm font-medium hover:text-indigo-600 transition-colors duration-200"
          >
            Find Jobs
          </Link>
          <Link
            href="/comming-soon"
            className="text-gray-600 text-sm font-medium hover:text-indigo-600 transition-colors duration-200"
          >
            Browse Companies
          </Link>
          <hr className="border-gray-100" />
          <Link
            href="/login"
            className="text-gray-600 text-sm font-medium hover:text-indigo-600 transition-colors duration-200"
          >
            Login
          </Link>
          <Link href="/register">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200 w-full">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
