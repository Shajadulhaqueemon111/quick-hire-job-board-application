/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateJobMutation } from "@/app/redux/api/baseApi";
import toast from "react-hot-toast";

const jobSchema = z.object({
  title: z.string().min(3, "Job title must be at least 3 characters"),
  company: z.string().min(2, "Company name is required"),
  location: z.string().min(2, "Location is required"),
  category: z.string().min(1, "Select a category"),
  jobType: z.string().min(1, "Select job type"),
  salary: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export type JobFormData = z.infer<typeof jobSchema>;

export interface IJob {
  _id?: string;
  title: string;
  company: string;
  location: string;
  category: string;
  jobType: string;
  description: string;
  salary?: string;
  createdAt?: Date;
}

export default function AddJob() {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [createJob, { isLoading }] = useCreateJobMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
  });

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: JobFormData) => {
    try {
      await createJob(data).unwrap();
      toast.success(" Job Created Successfully");
      reset();
      setPreview(null);
    } catch (err: any) {
      console.error(err);
      toast.error(" Failed to create job");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

        body {
          font-family: 'DM Sans', sans-serif;
          margin: 0;
          padding: 0;
        }

        .job-form-wrapper {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #0a0a0f;
          background-image:
            radial-gradient(ellipse 80% 50% at 20% -10%, rgba(99,59,255,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 85% 100%, rgba(255,92,141,0.12) 0%, transparent 55%);
          padding: 48px 16px;
        }

        .form-card {
          width: 100%;
          max-width: 720px;
          background: rgba(255,255,255,0.04);
          border-radius: 24px;
          padding: 48px;
          backdrop-filter: blur(12px);
          box-shadow:
            0 0 0 1px rgba(99,59,255,0.08),
            0 32px 80px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .form-header {
          margin-bottom: 32px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(99,59,255,0.15);
          border-radius: 100px;
          padding: 4px 12px;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          color: #a78bfa;
          margin-bottom: 12px;
        }

        .form-title {
          font-family: 'Fraunces', serif;
          font-size: 32px;
          font-weight: 300;
          color: #f5f3ff;
          margin: 0 0 8px;
        }

        .form-title em {
          font-style: italic;
          color: #a78bfa;
        }

        .form-subtitle {
          color: rgba(255,255,255,0.35);
          font-size: 14px;
          margin: 0;
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent);
          margin: 32px 0;
        }

        .section-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-bottom: 16px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .field-label {
          display: block;
          font-size: 13px;
          font-weight: 400;
          color: rgba(255,255,255,0.55);
          margin-bottom: 6px;
        }

        .input-field {
          width: 100%;
          padding: 12px 16px;
          font-size: 14px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: #f0eeff;
          outline: none;
          transition: all 0.2s;
        }

        .input-field::placeholder {
          color: rgba(255,255,255,0.3);
        }

        .input-field:focus {
          border-color: rgba(99,59,255,0.5);
          background: rgba(99,59,255,0.06);
          box-shadow: 0 0 0 3px rgba(99,59,255,0.1);
        }

        .input-field.has-error {
          border-color: rgba(248,113,113,0.5);
          background: rgba(248,113,113,0.04);
        }

        select.input-field {
          cursor: pointer;
          padding-right: 36px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(255,255,255,0.3)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .upload-zone {
          border: 1.5px dashed rgba(255,255,255,0.12);
          border-radius: 12px;
          padding: 28px;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s;
          background: rgba(255,255,255,0.02);
          position: relative;
        }

        .upload-zone.drag-over {
          border-color: rgba(99,59,255,0.4);
          background: rgba(99,59,255,0.05);
        }

        .upload-icon {
          width: 40px;
          height: 40px;
          margin: 0 auto 10px;
          background: rgba(99,59,255,0.15);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .upload-text {
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.4);
        }

        .preview-wrapper {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 16px;
          padding: 12px 16px;
          background: rgba(99,59,255,0.06);
          border-radius: 10px;
        }

        .submit-btn {
          width: 100%;
          padding: 15px;
          margin-top: 16px;
          border-radius: 12px;
          border: none;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          background: linear-gradient(135deg, #6b3bff 0%, #9333ea 100%);
          color: #fff;
          transition: all 0.25s ease;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(107,59,255,0.4);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 600px) {
          .grid-2 { grid-template-columns: 1fr; }
          .form-card { padding: 32px 24px; }
          .form-title { font-size: 28px; }
        }
      `}</style>

      <div className="job-form-wrapper">
        <div className="form-card">
          {/* Header */}
          <div className="form-header">
            <div className="badge">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="3" fill="#a78bfa" />
              </svg>
              New Posting
            </div>
            <h1 className="form-title">
              Post a <em>new</em> job
            </h1>
            <p className="form-subtitle">
              Fill in the details below to publish your listing
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Basic Info */}
            <p className="section-label">Basic Information</p>

            <div className="form-group">
              <label className="field-label">Job Title</label>
              <input
                {...register("title")}
                placeholder="e.g. Senior Product Designer"
                className={`input-field ${errors.title ? "has-error" : ""}`}
              />
              {errors.title && (
                <p className="error-msg">⚠ {errors.title.message}</p>
              )}
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="field-label">Company</label>
                <input
                  {...register("company")}
                  placeholder="Acme Inc."
                  className={`input-field ${errors.company ? "has-error" : ""}`}
                />
                {errors.company && (
                  <p className="error-msg">⚠ {errors.company.message}</p>
                )}
              </div>
              <div className="form-group">
                <label className="field-label">Location</label>
                <input
                  {...register("location")}
                  placeholder="Dhaka, Bangladesh"
                  className={`input-field ${errors.location ? "has-error" : ""}`}
                />
                {errors.location && (
                  <p className="error-msg">⚠ {errors.location.message}</p>
                )}
              </div>
            </div>

            <div className="divider" />

            {/* Job Details */}
            <p className="section-label">Job Details</p>

            <div className="grid-2">
              <div className="form-group">
                <label className="field-label">Category</label>
                <select
                  {...register("category")}
                  className={`input-field ${errors.category ? "has-error" : ""}`}
                >
                  <option className="text-black" value="">
                    Select category
                  </option>
                  <option className="text-black" value="IT">
                    IT & Technology
                  </option>
                  <option className="text-black" value="Marketing">
                    Marketing
                  </option>
                  <option className="text-black" value="Design">
                    Design & Creative
                  </option>
                  <option className="text-black" value="Finance">
                    Finance
                  </option>
                  <option className="text-black" value="HR">
                    Human Resources
                  </option>
                </select>
                {errors.category && (
                  <p className="error-msg">⚠ {errors.category.message}</p>
                )}
              </div>
              <div className="form-group">
                <label className="field-label">Job Type</label>
                <select
                  {...register("jobType")}
                  className={`input-field ${errors.jobType ? "has-error" : ""}`}
                >
                  <option className="text-black" value="">
                    Select type
                  </option>
                  <option className="text-black" value="Full-time">
                    Full-time
                  </option>
                  <option className="text-black" value="Part-time">
                    Part-time
                  </option>
                  <option className="text-black" value="Remote">
                    Remote
                  </option>
                  <option className="text-black" value="Contract">
                    Contract
                  </option>
                  <option className="text-black" value="Internship">
                    Internship
                  </option>
                </select>
                {errors.jobType && (
                  <p className="error-msg">⚠ {errors.jobType.message}</p>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="field-label">
                Salary{" "}
                <span style={{ color: "rgba(255,255,255,0.2)" }}>
                  (optional)
                </span>
              </label>
              <div className="salary-prefix">
                <input
                  {...register("salary")}
                  placeholder="e.g. 60,000 – 80,000 / year"
                  className="input-field"
                />
              </div>
            </div>

            <div className="divider" />

            <p className="section-label">Description</p>

            <div className="form-group">
              <label className="field-label">Job Description</label>
              <textarea
                rows={6}
                {...register("description")}
                placeholder="Describe the role, responsibilities, and requirements..."
                className={`input-field ${errors.description ? "has-error" : ""}`}
              />
              {errors.description && (
                <p className="error-msg">⚠ {errors.description.message}</p>
              )}
            </div>

            <button type="submit" disabled={isLoading} className="submit-btn">
              {isLoading ? "Publishing..." : "Publish Job Listing →"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
