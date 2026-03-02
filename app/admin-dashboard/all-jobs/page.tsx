"use client";

import React from "react";
import { useState } from "react";
import { Button, Modal, Space } from "antd";
import { useGetJobsQuery, useDeleteJobMutation } from "@/app/redux/api/baseApi";
import { IJob } from "@/app/types/jobs";
import Loading from "../loading";

export default function AllJobs() {
  const { data, isLoading, error } = useGetJobsQuery([]);
  const [deleteJob] = useDeleteJobMutation();

  const jobsArray: IJob[] = Array.isArray(data?.data) ? data.data : [];
  const [localJobs, setLocalJobs] = useState<IJob[]>(jobsArray);

  // Sync localJobs when API changes
  if (jobsArray.length !== localJobs.length) {
    setLocalJobs(jobsArray);
  }

  const handleDelete = (_id?: string) => {
    if (!_id) return;

    // Ant Design confirm modal
    Modal.confirm({
      title: "Are you sure you want to delete this job?",
      okText: "Yes",
      cancelText: "Cancel",
      okType: "danger",
      onOk: async () => {
        try {
          await deleteJob(_id).unwrap();
          setLocalJobs((prev) => prev.filter((job) => job._id !== _id));
          // Modal.success({ title: "Job deleted successfully" });
        } catch (err) {
          console.error(err);
          Modal.error({ title: " Failed to delete job" });
        }
      },
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-500">
        <Loading />
      </div>
    );
  }

  if (error)
    return (
      <p className="text-center text-red-500 py-10">Failed to fetch jobs.</p>
    );

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-xl rounded mt-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">All Job Listings</h2>

      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-left">
            <th className="p-3">Title</th>
            <th className="p-3">Company</th>
            <th className="p-3">Location</th>
            <th className="p-3">Category</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {localJobs.length > 0 ? (
            localJobs.map((job) => (
              <tr
                key={job._id}
                className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="p-3 font-medium">{job.title}</td>
                <td className="p-3">{job.company}</td>
                <td className="p-3">{job.location}</td>
                <td className="p-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                    {job.category}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleDelete(job._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                No jobs available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
