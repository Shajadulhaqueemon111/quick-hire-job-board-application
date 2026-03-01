// lib/applicationValidation.ts
// Same rules as your backend Zod schema

export type ApplicationFormData = {
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
};

export type ValidationErrors = Partial<
  Record<keyof ApplicationFormData, string>
>;

// URL regex — same logic as Zod's z.string().url()
function isValidUrl(str: string): boolean {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateApplicationForm(
  form: ApplicationFormData,
): ValidationErrors {
  const errors: ValidationErrors = {};

  // name — z.string().min(1)
  if (!form.name.trim()) {
    errors.name = "Name is required";
  }

  // email — z.string().email()
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Invalid email format";
  }

  // resumeLink — z.string().url()  ← this was causing the backend error
  if (!form.resumeLink.trim()) {
    errors.resumeLink = "Resume link is required";
  } else if (!isValidUrl(form.resumeLink.trim())) {
    errors.resumeLink =
      "Resume must be a valid URL (e.g. https://drive.google.com/...)";
  }

  // coverNote — z.string().optional() → no validation needed

  return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
