/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const jobSchema = z.object({
  title: z.string().min(3, "Job title must be at least 3 characters"),
  company: z.string().min(2, "Company name is required"),
  location: z.string().min(2, "Location is required"),
  category: z.string().min(1, "Select a category"),
  jobType: z.string().min(1, "Select job type"),
  salary: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type JobFormData = z.infer<typeof jobSchema>;

export default function AddJob() {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
  });

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: JobFormData) => {
    console.log("Validated Data:", data);
    alert("Job Created Successfully ✅");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');

        .job-form-wrapper {
          min-height: 100vh;
          background: #0a0a0f;
          background-image:
            radial-gradient(ellipse 80% 50% at 20% -10%, rgba(99,59,255,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 85% 100%, rgba(255,92,141,0.12) 0%, transparent 55%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 16px;
          font-family: 'DM Sans', sans-serif;
        }

        .form-card {
          width: 100%;
          max-width: 740px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 52px 48px;
          backdrop-filter: blur(12px);
          box-shadow:
            0 0 0 1px rgba(99,59,255,0.08),
            0 32px 80px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .form-header {
          margin-bottom: 40px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(99,59,255,0.15);
          border: 1px solid rgba(99,59,255,0.3);
          color: #a78bfa;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 100px;
          margin-bottom: 16px;
        }

        .form-title {
          font-family: 'Fraunces', serif;
          font-size: 36px;
          font-weight: 300;
          color: #f5f3ff;
          line-height: 1.15;
          margin: 0 0 8px;
        }

        .form-title em {
          font-style: italic;
          color: #a78bfa;
        }

        .form-subtitle {
          color: rgba(255,255,255,0.35);
          font-size: 14px;
          font-weight: 300;
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
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .field-label {
          display: block;
          font-size: 13px;
          font-weight: 400;
          color: rgba(255,255,255,0.55);
          margin-bottom: 8px;
          letter-spacing: 0.01em;
        }

        .input-field {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 12px 16px;
          color: #f0eeff;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
          -webkit-appearance: none;
        }

        .input-field::placeholder {
          color: rgba(255,255,255,0.2);
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
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(255,255,255,0.3)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
        }

        select.input-field option {
          background: #1a1625;
          color: #f0eeff;
        }

        textarea.input-field {
          resize: none;
          line-height: 1.6;
        }

        .error-msg {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 6px;
          color: #f87171;
          font-size: 12px;
          font-weight: 400;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 600px) {
          .grid-2 { grid-template-columns: 1fr; }
          .form-card { padding: 32px 24px; }
          .form-title { font-size: 28px; }
        }

        .upload-zone {
          border: 1.5px dashed rgba(255,255,255,0.12);
          border-radius: 12px;
          padding: 28px;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
          background: rgba(255,255,255,0.02);
        }

        .upload-zone:hover, .upload-zone.drag-over {
          border-color: rgba(99,59,255,0.4);
          background: rgba(99,59,255,0.05);
        }

        .upload-zone input[type="file"] {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
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
          color: rgba(255,255,255,0.4);
          font-size: 13px;
          font-weight: 300;
        }

        .upload-text strong {
          color: #a78bfa;
          font-weight: 500;
        }

        .preview-wrapper {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 16px;
          padding: 12px 16px;
          background: rgba(99,59,255,0.06);
          border: 1px solid rgba(99,59,255,0.15);
          border-radius: 10px;
        }

        .preview-label {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
        }

        .submit-btn {
          width: 100%;
          padding: 15px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #6b3bff 0%, #9333ea 100%);
          color: #fff;
          font-size: 15px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
          margin-top: 8px;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .submit-btn:hover:not(:disabled)::before {
          opacity: 1;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(107,59,255,0.4);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .salary-prefix {
          position: relative;
        }

        .salary-prefix::before {
          content: '$';
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.25);
          font-size: 14px;
          pointer-events: none;
          z-index: 1;
        }

        .salary-prefix .input-field {
          padding-left: 26px;
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
                  <option value="">Select category</option>
                  <option value="IT">IT & Technology</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Design">Design & Creative</option>
                  <option value="Finance">Finance</option>
                  <option value="HR">Human Resources</option>
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
                  <option value="">Select type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Remote">Remote</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
                {errors.jobType && (
                  <p className="error-msg">⚠ {errors.jobType.message}</p>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="field-label">
                Salary{" "}
                <span
                  style={{ color: "rgba(255,255,255,0.2)", fontWeight: 300 }}
                >
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

            {/* Description */}
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

            <div className="divider" />

            {/* Logo Upload */}
            <p className="section-label">Company Logo</p>

            <div
              className={`upload-zone ${dragOver ? "drag-over" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const file = e.dataTransfer.files[0];
                if (file) setPreview(URL.createObjectURL(file));
              }}
            >
              <input type="file" accept="image/*" onChange={handleImage} />
              <div className="upload-icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                </svg>
              </div>
              <p className="upload-text">
                <strong>Click to upload</strong> or drag and drop
                <br />
                <span
                  style={{
                    fontSize: "11px",
                    marginTop: "4px",
                    display: "block",
                  }}
                >
                  PNG, JPG, SVG up to 5MB
                </span>
              </p>
            </div>

            {preview && (
              <div className="preview-wrapper">
                <Image
                  src={preview}
                  alt="Logo preview"
                  width={56}
                  height={56}
                  className="rounded-lg object-contain"
                  style={{
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.05)",
                  }}
                />
                <div>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "13px",
                      margin: 0,
                    }}
                  >
                    Logo preview
                  </p>
                  <p className="preview-label">Looks good!</p>
                </div>
              </div>
            )}

            {/* Submit */}
            <div style={{ marginTop: "32px" }}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn"
              >
                {isSubmitting ? <>Publishing...</> : <>Publish Job Listing →</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
