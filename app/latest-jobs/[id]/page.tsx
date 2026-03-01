"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

import { Syne, DM_Sans } from "next/font/google";
import { latestJobsData } from "@/app/data/data";
import JobDetailUI from "@/app/components/job-details";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

const LatestJobDetailPage = () => {
  const params = useParams();
  const jobId = Number(params?.id);
  const job = latestJobsData[jobId];

  if (!job) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center bg-[#f8f7ff] ${dmSans.className}`}
      >
        <h1
          className={`text-4xl font-black text-gray-900 mb-4 ${syne.className}`}
        >
          Job Not Found
        </h1>
        <p className="text-gray-500 mb-8">
          This job listing doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/"
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return <JobDetailUI job={job} />;
};

export default LatestJobDetailPage;
