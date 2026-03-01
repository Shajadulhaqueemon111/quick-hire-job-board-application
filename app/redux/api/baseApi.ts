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
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useSubmitApplicationMutation,
} = baseApi;
