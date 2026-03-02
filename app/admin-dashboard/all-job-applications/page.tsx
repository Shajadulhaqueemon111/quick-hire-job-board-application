"use client";

import React from "react";
import { Button, Modal } from "antd";
import {
  useGetAllApplicationsQuery,
  useDeleteApplicationMutation,
} from "@/app/redux/api/baseApi";
import Loading from "../loading";
import { IApplication } from "@/app/types/applications";
import Link from "next/link";

export default function AllJobsApplication() {
  const { data, isLoading, error } = useGetAllApplicationsQuery();
  const [deleteApplication] = useDeleteApplicationMutation();

  const applications: IApplication[] = Array.isArray(data?.data)
    ? data.data
    : [];

  const handleDelete = async (_id?: string) => {
    if (!_id) return;

    Modal.confirm({
      title: "Are you sure you want to delete this application?",
      okText: "Yes",
      cancelText: "Cancel",
      okType: "danger",
      onOk: async () => {
        try {
          await deleteApplication(_id).unwrap();
          Modal.success({ title: "Application deleted successfully" });
        } catch (err) {
          console.error(err);
          Modal.error({ title: "Failed to delete application" });
        }
      },
    });
  };

  if (isLoading) return <Loading />;
  if (error)
    return (
      <p className="text-center text-red-500 py-10">
        Failed to fetch applications.
      </p>
    );

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-xl rounded mt-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">All Job Applications</h2>

      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Job ID</th>
            <th className="p-3">Resume</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {applications.length > 0 ? (
            applications.map((app) => (
              <tr
                key={app._id}
                className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="p-3 font-medium">{app.name}</td>
                <td className="p-3">{app.email}</td>
                <td className="p-3">{app.jobId}</td>
                <td className="p-3">
                  <a
                    href={app.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Resume
                  </a>
                </td>
                <td className="p-3 text-center space-x-2">
                  <Link
                    href={`/admin-dashboard/all-job-applications/${app._id}`}
                  >
                    <Button type="default">View</Button>
                  </Link>
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleDelete(app._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                No applications available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
