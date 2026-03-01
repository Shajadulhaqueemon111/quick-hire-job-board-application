"use client";
import React, { useState } from "react";
import Link from "next/link";

const SingUp = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [role, setRole] = useState<"jobseeker" | "employer">("jobseeker");
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#10b981", "#4f46e5"][
    strength
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .signup-root {
          min-height: 100vh; display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #f8f7ff;
        }

        /* ── LEFT PANEL ── */
        .signup-left {
          width: 46%; background: #0f0e1a;
          position: relative; overflow: hidden;
          display: flex; flex-direction: column;
          justify-content: space-between;
          padding: 40px 52px;
        }
        @media (max-width: 768px) {
          .signup-left { display: none; }
          .signup-right { width: 100% !important; }
        }

        .sl-orb { position: absolute; border-radius: 50%; filter: blur(70px); pointer-events: none; }
        .sl-orb-1 { width: 350px; height: 350px; background: #06b6d4; opacity: 0.18; top: -80px; right: -60px; animation: slFloat 9s ease-in-out infinite; }
        .sl-orb-2 { width: 300px; height: 300px; background: #4f46e5; opacity: 0.2; bottom: 80px; left: -60px; animation: slFloat 7s ease-in-out infinite reverse; }
        .sl-orb-3 { width: 180px; height: 180px; background: #f59e0b; opacity: 0.12; top: 40%; left: 45%; animation: slFloat 11s ease-in-out infinite; }
        @keyframes slFloat {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(12px, -18px); }
        }

        .sl-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(6,182,212,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.07) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        /* Steps visual */
        .sl-steps { position: relative; z-index: 10; }
        .sl-step {
          display: flex; align-items: flex-start; gap: 16px;
          margin-bottom: 28px;
        }
        .sl-step-icon {
          width: 40px; height: 40px; border-radius: 10px; shrink: 0;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .sl-step-icon.active { background: rgba(79,70,229,0.25); border-color: rgba(79,70,229,0.5); }
        .sl-step-title { font-size: 14px; font-weight: 600; color: white; margin-bottom: 3px; }
        .sl-step-sub { font-size: 12px; color: rgba(255,255,255,0.38); line-height: 1.5; }

        .sl-logo { position: relative; z-index: 10; display: flex; align-items: center; gap: 10px; }
        .sl-logo-icon {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg, #06b6d4, #4f46e5);
          display: flex; align-items: center; justify-content: center;
        }
        .sl-logo-text { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: white; }

        .sl-bottom { position: relative; z-index: 10; }
        .sl-heading {
          font-family: 'Syne', sans-serif;
          font-size: 40px; font-weight: 800;
          color: white; line-height: 1.1;
          letter-spacing: -1.5px; margin-bottom: 14px;
        }
        .sl-heading span {
          background: linear-gradient(135deg, #06b6d4, #4f46e5);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .sl-sub { font-size: 14px; color: rgba(255,255,255,0.38); line-height: 1.7; max-width: 300px; }

        /* ── RIGHT PANEL ── */
        .signup-right {
          width: 54%; display: flex; align-items: center; justify-content: center;
          padding: 40px 24px; background: #f8f7ff;
          overflow-y: auto;
        }

        .signup-form-wrap {
          width: 100%; max-width: 440px;
          animation: rFadeUp 0.7s ease forwards;
        }
        @keyframes rFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .r-eyebrow { font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #06b6d4; margin-bottom: 12px; }
        .r-title { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: #0f0e1a; line-height: 1.1; letter-spacing: -1px; margin-bottom: 8px; }
        .r-sub { font-size: 14px; color: #9ca3af; margin-bottom: 28px; }
        .r-sub a { color: #4f46e5; font-weight: 600; text-decoration: none; }
        .r-sub a:hover { text-decoration: underline; }

        /* Role toggle */
        .role-toggle {
          display: flex; background: white; border: 1.5px solid #e5e7eb;
          border-radius: 10px; padding: 4px; gap: 4px; margin-bottom: 24px;
        }
        .role-btn {
          flex: 1; padding: 9px; border-radius: 7px;
          font-size: 13px; font-weight: 600; cursor: pointer;
          border: none; transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .role-btn.active { background: #4f46e5; color: white; box-shadow: 0 2px 8px rgba(79,70,229,0.3); }
        .role-btn.inactive { background: transparent; color: #9ca3af; }
        .role-btn.inactive:hover { color: #374151; }

        /* Social */
        .social-row { display: flex; gap: 12px; margin-bottom: 24px; }
        .social-btn {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
          background: white; border: 1.5px solid #e5e7eb;
          border-radius: 10px; padding: 11px;
          font-size: 13px; font-weight: 500; color: #374151;
          cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .social-btn:hover { border-color: #4f46e5; color: #4f46e5; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(79,70,229,0.1); }

        /* Divider */
        .divider { display: flex; align-items: center; gap: 14px; margin-bottom: 24px; }
        .divider-line { flex: 1; height: 1px; background: #e5e7eb; }
        .divider-text { font-size: 12px; color: #d1d5db; font-weight: 500; }

        /* Fields */
        .field-row { display: flex; gap: 14px; }
        .field-group { margin-bottom: 16px; flex: 1; }
        .field-label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 7px; }
        .field-wrap { position: relative; }
        .field-input {
          width: 100%; background: white; border: 1.5px solid #e5e7eb;
          border-radius: 10px; padding: 12px 16px;
          font-size: 14px; color: #111827; outline: none;
          transition: all 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .field-input:focus { border-color: #4f46e5; box-shadow: 0 0 0 3px rgba(79,70,229,0.1); }
        .field-input::placeholder { color: #d1d5db; }
        .pass-toggle {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer; color: #9ca3af; padding: 0; transition: color 0.2s;
        }
        .pass-toggle:hover { color: #4f46e5; }

        /* Strength bar */
        .strength-row { display: flex; gap: 4px; margin-top: 8px; }
        .strength-seg {
          flex: 1; height: 3px; border-radius: 100px;
          background: #e5e7eb; transition: background 0.3s;
        }
        .strength-label { font-size: 11px; margin-top: 4px; font-weight: 600; }

        /* Agree */
        .agree-row { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 20px; }
        .agree-row input[type="checkbox"] { accent-color: #4f46e5; width: 15px; height: 15px; margin-top: 2px; flex-shrink: 0; }
        .agree-text { font-size: 12px; color: #6b7280; line-height: 1.6; }
        .agree-text a { color: #4f46e5; font-weight: 600; text-decoration: none; }

        /* Submit */
        .submit-btn {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          border: none; border-radius: 10px;
          color: white; font-size: 15px; font-weight: 600;
          cursor: pointer; transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          position: relative; overflow: hidden;
        }
        .submit-btn:hover { background: linear-gradient(135deg, #4338ca, #4f46e5); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(79,70,229,0.3); }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
        .btn-shine {
          position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          animation: shine 3s ease infinite;
        }
        @keyframes shine { 0% { left: -100%; } 50%, 100% { left: 150%; } }
        .spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="signup-root">
        {/* ── LEFT PANEL ── */}
        <div className="signup-left">
          <div className="sl-orb sl-orb-1" />
          <div className="sl-orb sl-orb-2" />
          <div className="sl-orb sl-orb-3" />
          <div className="sl-grid" />

          <div className="sl-logo">
            <div className="sl-logo-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="4" fill="white" />
                <path
                  d="M12 2v3M12 19v3M2 12h3M19 12h3"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="sl-logo-text">QuickHire</span>
          </div>

          {/* Steps */}
          <div className="sl-steps">
            {[
              {
                icon: "👤",
                title: "Create your profile",
                sub: "Tell us about yourself and your goals",
                active: true,
              },
              {
                icon: "🔍",
                title: "Browse opportunities",
                sub: "Explore thousands of curated job listings",
                active: false,
              },
              {
                icon: "🚀",
                title: "Get hired fast",
                sub: "Connect directly with top companies",
                active: false,
              },
            ].map((step, i) => (
              <div className="sl-step" key={i}>
                <div className={`sl-step-icon ${step.active ? "active" : ""}`}>
                  <span style={{ fontSize: "18px" }}>{step.icon}</span>
                </div>
                <div>
                  <div className="sl-step-title">{step.title}</div>
                  <div className="sl-step-sub">{step.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="sl-bottom">
            <h2 className="sl-heading">
              Start your
              <br />
              <span>career journey</span>
              <br />
              here.
            </h2>
            <p className="sl-sub">
              Free forever. No credit card required. Join 50,000+ professionals.
            </p>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="signup-right">
          <div className="signup-form-wrap">
            <p className="r-eyebrow">Get started free</p>
            <h1 className="r-title">
              Create your
              <br />
              account
            </h1>
            <p className="r-sub">
              Already have an account? <Link href="/login">Sign in here</Link>
            </p>

            {/* Role toggle */}
            <div className="role-toggle">
              <button
                className={`role-btn ${role === "jobseeker" ? "active" : "inactive"}`}
                onClick={() => setRole("jobseeker")}
                type="button"
              >
                🔍 Job Seeker
              </button>
              <button
                className={`role-btn ${role === "employer" ? "active" : "inactive"}`}
                onClick={() => setRole("employer")}
                type="button"
              >
                🏢 Employer
              </button>
            </div>

            {/* Social */}
            <div className="social-row">
              <button className="social-btn" type="button">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>
              <button className="social-btn" type="button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </button>
            </div>

            <div className="divider">
              <div className="divider-line" />
              <span className="divider-text">or sign up with email</span>
              <div className="divider-line" />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="field-row">
                <div className="field-group">
                  <label className="field-label">Full Name</label>
                  <input
                    className="field-input"
                    type="text"
                    placeholder="John Doe"
                    value={form.fullname}
                    onChange={(e) =>
                      setForm({ ...form, fullname: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Email</label>
                  <input
                    className="field-input"
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Password</label>
                <div className="field-wrap">
                  <input
                    className="field-input"
                    type={showPass ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                    style={{ paddingRight: "44px" }}
                  />
                  <button
                    type="button"
                    className="pass-toggle"
                    onClick={() => setShowPass(!showPass)}
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      {showPass ? (
                        <>
                          <path
                            d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
                            strokeLinecap="round"
                          />
                          <line
                            x1="1"
                            y1="1"
                            x2="23"
                            y2="23"
                            strokeLinecap="round"
                          />
                        </>
                      ) : (
                        <>
                          <path
                            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                            strokeLinecap="round"
                          />
                          <circle cx="12" cy="12" r="3" />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
                {form.password && (
                  <>
                    <div className="strength-row">
                      {[1, 2, 3, 4].map((s) => (
                        <div
                          key={s}
                          className="strength-seg"
                          style={{
                            background:
                              s <= strength ? strengthColor : "#e5e7eb",
                          }}
                        />
                      ))}
                    </div>
                    <p
                      className="strength-label"
                      style={{ color: strengthColor }}
                    >
                      {strengthLabel}
                    </p>
                  </>
                )}
              </div>

              <div className="field-group">
                <label className="field-label">Confirm Password</label>
                <div className="field-wrap">
                  <input
                    className="field-input"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat your password"
                    value={form.confirm}
                    onChange={(e) =>
                      setForm({ ...form, confirm: e.target.value })
                    }
                    required
                    style={{
                      paddingRight: "44px",
                      borderColor:
                        form.confirm && form.confirm !== form.password
                          ? "#ef4444"
                          : "",
                    }}
                  />
                  <button
                    type="button"
                    className="pass-toggle"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      {showConfirm ? (
                        <>
                          <path
                            d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"
                            strokeLinecap="round"
                          />
                          <line
                            x1="1"
                            y1="1"
                            x2="23"
                            y2="23"
                            strokeLinecap="round"
                          />
                        </>
                      ) : (
                        <>
                          <path
                            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                            strokeLinecap="round"
                          />
                          <circle cx="12" cy="12" r="3" />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
                {form.confirm && form.confirm !== form.password && (
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#ef4444",
                      marginTop: "6px",
                    }}
                  >
                    Passwords do not match
                  </p>
                )}
              </div>

              <div className="agree-row">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  required
                />
                <p className="agree-text">
                  I agree to the <a href="#">Terms of Service</a> and{" "}
                  <a href="#">Privacy Policy</a>. I understand my data will be
                  used to match me with relevant opportunities.
                </p>
              </div>

              <button
                className="submit-btn"
                type="submit"
                disabled={loading || !agree}
              >
                <div className="btn-shine" />
                {loading ? <div className="spinner" /> : "Create Account →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingUp;
