"use client";

// ─────────────────────────────────────────────────────────────
// DROP-IN replacement for the Apply Form section in JobDetails
// Uses same validation rules as your backend Zod schema
// ─────────────────────────────────────────────────────────────

import React, { useState } from "react";
import { useSubmitApplicationMutation } from "@/app/redux/api/baseApi";

type Props = {
  jobId: string;
  jobTitle: string;
  company: string;
};

type FormState = {
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function isValidUrl(str: string): boolean {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  // name: z.string().min(1)
  if (!form.name.trim()) errors.name = "Name is required";

  // email: z.string().email()
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = "Invalid email format";

  // resumeLink: z.string().url()
  if (!form.resumeLink.trim()) errors.resumeLink = "Resume link is required";
  else if (!isValidUrl(form.resumeLink.trim()))
    errors.resumeLink = "Resume must be a valid URL (e.g. https://...)";

  // coverNote: z.string().optional() → no validation

  return errors;
}

function Field({
  label,
  required,
  error,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-gray-400 mt-1.5">{hint}</p>}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500 mt-1.5">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full border rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 outline-none transition-all ${
    hasError
      ? "border-red-300 bg-red-50/30 focus:border-red-400 focus:ring-2 focus:ring-red-50"
      : "border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50"
  }`;
}

export const ApplyForm: React.FC<Props> = ({ jobId, jobTitle, company }) => {
  const [submitApplication, { isLoading }] = useSubmitApplicationMutation();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    resumeLink: "",
    coverNote: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const set =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((p) => ({ ...p, [field]: e.target.value }));
      // clear field error on change
      if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
      if (apiError) setApiError(null);
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    // ── Frontend Zod-mirror validation ──
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // stop — never reaches backend
    }

    try {
      await submitApplication({
        jobId,
        name: form.name.trim(),
        email: form.email.trim(),
        resumeLink: form.resumeLink.trim(),
        coverNote: form.coverNote.trim(),
      }).unwrap();

      setSubmitted(true);
    } catch (err: unknown) {
      // Parse backend error response
      const errData = (
        err as {
          data?: {
            message?: string;
            errrorSources?: { path: string; message: string }[];
          };
        }
      )?.data;

      if (errData?.errrorSources?.length) {
        // Map backend field errors back to form fields
        const backendErrors: FormErrors = {};
        errData.errrorSources.forEach(({ path, message }) => {
          if (path in form) {
            backendErrors[path as keyof FormState] = message;
          }
        });
        if (Object.keys(backendErrors).length > 0) {
          setErrors(backendErrors);
          return;
        }
      }

      setApiError(
        errData?.message ?? "Something went wrong. Please try again.",
      );
    }
  };

  // ── Success ──
  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-black text-gray-900 mb-2">
          Application Sent!
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          We&apos;ve received your application for{" "}
          <strong className="text-gray-700">{jobTitle}</strong> at{" "}
          <strong className="text-gray-700">{company}</strong>. We&apos;ll be in
          touch soon.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", email: "", resumeLink: "", coverNote: "" });
            setErrors({});
          }}
          className="mt-5 text-sm text-indigo-600 font-semibold hover:underline"
        >
          Apply again
        </button>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-black text-gray-900 mb-1">Apply Now</h2>
      <p className="text-sm text-gray-400 mb-6">
        Fill in your details to apply for this role
      </p>

      {/* API-level error banner */}
      {apiError && (
        <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth={2}
            className="flex-shrink-0 mt-0.5"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-sm text-red-600">{apiError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {/* Full Name */}
        <Field label="Full Name" required error={errors.name}>
          <input
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={set("name")}
            className={inputClass(!!errors.name)}
          />
        </Field>

        {/* Email */}
        <Field label="Email Address" required error={errors.email}>
          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={set("email")}
            className={inputClass(!!errors.email)}
          />
        </Field>

        {/* Resume Link — validated as URL */}
        <Field
          label="Resume Link (URL)"
          required
          error={errors.resumeLink}
          hint="Must start with https:// — e.g. Google Drive, Notion, LinkedIn"
        >
          <input
            type="text" // text not url — avoids browser native popup
            placeholder="https://drive.google.com/..."
            value={form.resumeLink}
            onChange={set("resumeLink")}
            className={inputClass(!!errors.resumeLink)}
          />
        </Field>

        {/* Cover Note */}
        <Field label="Cover Note" error={errors.coverNote}>
          <textarea
            rows={4}
            placeholder="Tell us why you're a great fit for this role..."
            value={form.coverNote}
            onChange={set("coverNote")}
            className={inputClass(false) + " resize-none"}
          />
        </Field>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-100 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting…
            </>
          ) : (
            <>
              Submit Application
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </>
          )}
        </button>
      </form>
    </>
  );
};

export default ApplyForm;
