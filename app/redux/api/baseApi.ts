import { IApplication, IApplicationsResponse } from "@/app/types/applications";
import { IJob } from "@/app/types/jobs";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1",
  }),
  tagTypes: ["Jobs", "Applications"],
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => "/jobs",
      providesTags: ["Jobs"],
    }),
    getJobById: builder.query({
      query: (id: string) => `/jobs/${id}`,
      providesTags: (result, error, id) => [{ type: "Jobs", id }],
    }),
    // ✅ Add mutation to submit application
    submitApplication: builder.mutation({
      query: (applicationData: {
        jobId: string;
        name: string;
        email: string;
        resumeLink: string;
        coverNote?: string;
      }) => ({
        url: "/applications",
        method: "POST",
        body: applicationData,
      }),
      invalidatesTags: ["Applications"],
    }),
    searchJobs: builder.query({
      query: ({
        keyword,
        category,
        location,
      }: {
        keyword?: string;
        category?: string;
        location?: string;
      }) => {
        const params = new URLSearchParams();

        if (keyword) params.append("keyword", keyword);
        if (category) params.append("category", category);
        if (location) params.append("location", location);

        return `/jobs/search?${params.toString()}`;
      },
      providesTags: ["Jobs"],
    }),

    createJob: builder.mutation<IJob, Omit<IJob, "_id" | "createdAt">>({
      query: (job) => ({
        url: "/jobs/create-job",
        method: "POST",
        body: job,
      }),
      invalidatesTags: ["Jobs"],
    }),
    deleteJob: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),
    deleteApplication: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query: (id) => ({
        url: `/applications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Applications"],
    }),
    getAllApplications: builder.query<IApplicationsResponse, void>({
      query: () => "/applications",
      providesTags: ["Applications"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useSubmitApplicationMutation,
  useLazySearchJobsQuery,
  useCreateJobMutation,
  useDeleteJobMutation,
  useDeleteApplicationMutation,
  useGetAllApplicationsQuery,
} = baseApi;
