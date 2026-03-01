/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
};

const staticJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechSoft",
    location: "Remote",
    category: "IT",
  },
  {
    id: "2",
    title: "UI/UX Designer",
    company: "DesignPro",
    location: "Dhaka",
    category: "Design",
  },
];

export default function AllJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/jobs");
        const data = await res.json();

        if (data && data.length > 0) {
          setJobs(data);
        } else {
          setJobs(staticJobs);
        }
      } catch (error) {
        // If API fails → show static
        setJobs(staticJobs);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">Loading jobs...</div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">All Job Listings</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-left">
              <th className="p-3">Logo</th>
              <th className="p-3">Title</th>
              <th className="p-3">Company</th>
              <th className="p-3">Location</th>
              <th className="p-3">Category</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job: any) => (
              <tr
                key={job.id}
                className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                {/* Logo */}
                <td className="p-3">
                  {job.companyLogo ? (
                    <Image
                      src={job.companyLogo}
                      alt={job.company}
                      width={45}
                      height={45}
                      className="rounded-full object-cover border"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-gray-600">
                      {job.company.charAt(0)}
                    </div>
                  )}
                </td>

                <td className="p-3 font-medium">{job.title}</td>
                <td className="p-3">{job.company}</td>
                <td className="p-3">{job.location}</td>
                <td className="p-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                    {job.category}
                  </span>
                </td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {jobs.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No jobs available.</p>
      )}
    </div>
  );
}
