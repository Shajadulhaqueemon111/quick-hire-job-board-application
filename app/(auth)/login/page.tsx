"use client";
import React, { useState } from "react";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Satoshi:wght@300;400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        .login-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #f8f7ff;
        }

        /* ── LEFT PANEL ── */
        .login-left {
          width: 46%;
          background: #0f0e1a;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 40px 52px;
        }

        @media (max-width: 768px) {
          .login-left { display: none; }
          .login-right { width: 100% !important; }
        }

        /* Orbs */
        .l-orb {
          position: absolute; border-radius: 50%;
          filter: blur(70px); pointer-events: none;
        }
        .l-orb-1 { width: 380px; height: 380px; background: #4f46e5; opacity: 0.2; top: -100px; left: -80px; animation: lFloat 9s ease-in-out infinite; }
        .l-orb-2 { width: 280px; height: 280px; background: #06b6d4; opacity: 0.15; bottom: 60px; right: -60px; animation: lFloat 7s ease-in-out infinite reverse; }
        .l-orb-3 { width: 200px; height: 200px; background: #8b5cf6; opacity: 0.2; top: 50%; left: 40%; animation: lFloat 11s ease-in-out infinite; }
        @keyframes lFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(15px, -20px) scale(1.04); }
          66% { transform: translate(-10px, 10px) scale(0.97); }
        }

        /* Grid */
        .l-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(79,70,229,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,70,229,0.08) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        /* Floating job cards */
        .l-card {
          position: absolute;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 14px 18px;
          backdrop-filter: blur(8px);
          animation: cardFloat linear infinite;
        }
        .l-card-1 { top: 22%; left: 8%; animation-duration: 6s; animation-delay: 0s; }
        .l-card-2 { top: 55%; right: 8%; animation-duration: 8s; animation-delay: -3s; }
        .l-card-3 { bottom: 22%; left: 15%; animation-duration: 7s; animation-delay: -5s; }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .l-card-title { font-size: 13px; font-weight: 600; color: white; margin-bottom: 3px; }
        .l-card-sub { font-size: 11px; color: rgba(255,255,255,0.45); }
        .l-card-badge {
          display: inline-block; margin-top: 8px;
          background: rgba(79,70,229,0.3); border: 1px solid rgba(79,70,229,0.5);
          color: #a5b4fc; font-size: 10px; font-weight: 600;
          padding: 3px 10px; border-radius: 100px;
        }

        /* Left top logo */
        .l-logo { position: relative; z-index: 10; display: flex; align-items: center; gap: 10px; }
        .l-logo-icon {
          width: 38px; height: 38px; border-radius: 50%;
          background: linear-gradient(135deg, #4f46e5, #06b6d4);
          display: flex; align-items: center; justify-content: center;
        }
        .l-logo-text { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: white; }

        /* Left bottom text */
        .l-bottom { position: relative; z-index: 10; }
        .l-heading {
          font-family: 'Syne', sans-serif;
          font-size: 42px; font-weight: 800;
          color: white; line-height: 1.1;
          letter-spacing: -1.5px; margin-bottom: 16px;
        }
        .l-heading span {
          background: linear-gradient(135deg, #4f46e5, #06b6d4);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .l-sub { font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.7; max-width: 300px; }

        /* Stats row */
        .l-stats { display: flex; gap: 32px; margin-top: 28px; }
        .l-stat-num { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800; color: white; }
        .l-stat-label { font-size: 11px; color: rgba(255,255,255,0.35); margin-top: 2px; }

        /* ── RIGHT PANEL ── */
        .login-right {
          width: 54%;
          display: flex; align-items: center; justify-content: center;
          padding: 40px 24px;
          background: #f8f7ff;
        }

        .login-form-wrap {
          width: 100%; max-width: 420px;
          animation: rFadeUp 0.7s ease forwards;
        }
        @keyframes rFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .r-eyebrow {
          font-size: 12px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: #4f46e5; margin-bottom: 12px;
        }
        .r-title {
          font-family: 'Syne', sans-serif;
          font-size: 34px; font-weight: 800;
          color: #0f0e1a; line-height: 1.1;
          letter-spacing: -1px; margin-bottom: 8px;
        }
        .r-sub { font-size: 14px; color: #9ca3af; margin-bottom: 36px; }
        .r-sub a { color: #4f46e5; font-weight: 600; text-decoration: none; }
        .r-sub a:hover { text-decoration: underline; }

        /* Social buttons */
        .social-row { display: flex; gap: 12px; margin-bottom: 28px; }
        .social-btn {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
          background: white; border: 1.5px solid #e5e7eb;
          border-radius: 10px; padding: 11px;
          font-size: 13px; font-weight: 500; color: #374151;
          cursor: pointer; transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .social-btn:hover { border-color: #4f46e5; color: #4f46e5; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(79,70,229,0.1); }

        /* Divider */
        .divider {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 28px;
        }
        .divider-line { flex: 1; height: 1px; background: #e5e7eb; }
        .divider-text { font-size: 12px; color: #d1d5db; font-weight: 500; }

        /* Form fields */
        .field-group { margin-bottom: 18px; }
        .field-label {
          display: block; font-size: 13px; font-weight: 600;
          color: #374151; margin-bottom: 7px;
        }
        .field-wrap { position: relative; }
        .field-input {
          width: 100%; background: white;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          padding: 13px 16px;
          font-size: 14px; color: #111827;
          outline: none; transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .field-input:focus { border-color: #4f46e5; box-shadow: 0 0 0 3px rgba(79,70,229,0.1); }
        .field-input::placeholder { color: #d1d5db; }
        .pass-toggle {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: #9ca3af; padding: 0; transition: color 0.2s;
        }
        .pass-toggle:hover { color: #4f46e5; }

        /* Row */
        .form-row {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 24px;
        }
        .remember { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #6b7280; cursor: pointer; }
        .remember input[type="checkbox"] { accent-color: #4f46e5; width: 15px; height: 15px; }
        .forgot { font-size: 13px; color: #4f46e5; font-weight: 600; text-decoration: none; }
        .forgot:hover { text-decoration: underline; }

        /* Submit btn */
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
        .submit-btn:active { transform: translateY(0); }
        .btn-shine {
          position: absolute; top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          animation: shine 3s ease infinite;
        }
        @keyframes shine {
          0% { left: -100%; }
          50%, 100% { left: 150%; }
        }

        /* Spinner */
        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="login-root">
        {/* ── LEFT PANEL ── */}
        <div className="login-left">
          <div className="l-orb l-orb-1" />
          <div className="l-orb l-orb-2" />
          <div className="l-orb l-orb-3" />
          <div className="l-grid" />

          {/* Floating cards */}
          <div className="l-card l-card-1">
            <div className="l-card-title">UI/UX Designer</div>
            <div className="l-card-sub">Figma · Remote</div>
            <span className="l-card-badge">Full Time</span>
          </div>
          <div className="l-card l-card-2">
            <div className="l-card-title">Frontend Engineer</div>
            <div className="l-card-sub">React · Berlin</div>
            <span className="l-card-badge">Full Time</span>
          </div>
          <div className="l-card l-card-3">
            <div className="l-card-title">Product Manager</div>
            <div className="l-card-sub">Notion · New York</div>
            <span className="l-card-badge">Contract</span>
          </div>

          {/* Logo */}
          <div className="l-logo">
            <div className="l-logo-icon">
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
            <span className="l-logo-text">QuickHire</span>
          </div>

          {/* Bottom */}
          <div className="l-bottom">
            <h2 className="l-heading">
              Find your
              <br />
              <span>dream job</span>
              <br />
              today.
            </h2>
            <p className="l-sub">
              Join over 50,000 professionals who found their perfect role
              through QuickHire.
            </p>
            <div className="l-stats">
              <div>
                <div className="l-stat-num">5K+</div>
                <div className="l-stat-label">Companies</div>
              </div>
              <div>
                <div className="l-stat-num">50K+</div>
                <div className="l-stat-label">Job Seekers</div>
              </div>
              <div>
                <div className="l-stat-num">98%</div>
                <div className="l-stat-label">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="login-right">
          <div className="login-form-wrap">
            <p className="r-eyebrow">Welcome back</p>
            <h1 className="r-title">
              Sign in to
              <br />
              your account
            </h1>
            <p className="r-sub">
              Don&apos;t have an account?{" "}
              <Link href="/register">Create one free</Link>
            </p>

            {/* Social */}
            <div className="social-row">
              <button className="social-btn">
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
              <button className="social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </button>
            </div>

            <div className="divider">
              <div className="divider-line" />
              <span className="divider-text">or continue with email</span>
              <div className="divider-line" />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <label className="field-label">Email address</label>
                <div className="field-wrap">
                  <input
                    className="field-input"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ paddingRight: "44px" }}
                  />
                  <button
                    type="button"
                    className="pass-toggle"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
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
                      </svg>
                    ) : (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                          strokeLinecap="round"
                        />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="form-row">
                <label className="remember">
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="#" className="forgot">
                  Forgot password?
                </a>
              </div>

              <button className="submit-btn" type="submit" disabled={loading}>
                <div className="btn-shine" />
                {loading ? <div className="spinner" /> : "Sign In →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
