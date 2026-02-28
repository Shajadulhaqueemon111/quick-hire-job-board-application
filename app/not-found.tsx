"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 px-6">
      <div className="text-center text-white max-w-xl">
        {/* Big 404 */}
        <h1 className="text-[120px] md:text-[160px] font-black leading-none opacity-20">
          404
        </h1>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Oops! Page not found
        </h2>

        {/* Description */}
        <p className="text-indigo-100 mb-8 text-base md:text-lg">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition-all duration-200"
          >
            <Home size={18} />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 border border-white/40 px-6 py-3 rounded-lg hover:bg-white/10 transition-all duration-200"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
