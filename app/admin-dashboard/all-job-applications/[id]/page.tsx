"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useGetAllApplicationsQuery } from "@/app/redux/api/baseApi";
import { IApplication } from "@/app/types/applications";
// or any icon library you like
import Loading from "@/app/loading";
import { CopyIcon } from "lucide-react";
import toast from "react-hot-toast";

const ApplicationDetailPage = () => {
  const params = useParams();
  const appId = params.id; // URL should be like /admin-dashboard/application/:id

  const { data, isLoading, error } = useGetAllApplicationsQuery();

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-500">Failed to load application.</p>;

  // find the application by id
  const applications: IApplication[] = Array.isArray(data?.data)
    ? data.data
    : [];
  const application = applications.find((app) => app._id === appId);

  if (!application)
    return (
      <p className="text-center text-gray-500 py-10">Application not found.</p>
    );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!"); // you can replace with a nicer toast
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 shadow rounded mt-6">
      <h1 className="text-2xl font-bold mb-6">Application Details</h1>

      <div className="space-y-4">
        {Object.entries(application).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded"
          >
            <div className="font-medium capitalize">
              {key.replace("_", " ")}
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-gray-800 dark:text-gray-200 break-all">
                {value as string}
              </div>
              <button
                onClick={() => copyToClipboard(value as string)}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                title="Copy"
              >
                <CopyIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationDetailPage;
