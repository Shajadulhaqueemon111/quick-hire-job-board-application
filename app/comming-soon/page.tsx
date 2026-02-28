"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";

const TARGET_DATE = new Date("2025-06-01T00:00:00");

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  const calcTime = useCallback(() => {
    const diff = TARGET_DATE.getTime() - new Date().getTime();
    if (diff <= 0) return;
    setTimeLeft({
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    });
  }, []);

  useEffect(() => {
    // setMounted moved inside effect to avoid direct setState in effect body
    const init = () => setMounted(true);
    init();

    const timer = setInterval(calcTime, 1000);
    return () => clearInterval(timer);
  }, [calcTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .cs-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #0a0a14;
          color: white;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .orb {
          position: absolute; border-radius: 50%;
          filter: blur(80px); opacity: 0.25;
          animation: float 8s ease-in-out infinite;
          pointer-events: none;
        }
        .orb-1 { width: 500px; height: 500px; background: #4f46e5; top: -150px; left: -100px; animation-delay: 0s; }
        .orb-2 { width: 400px; height: 400px; background: #06b6d4; top: 30%; right: -120px; animation-delay: -3s; }
        .orb-3 { width: 300px; height: 300px; background: #8b5cf6; bottom: -100px; left: 30%; animation-delay: -5s; }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        .grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(79,70,229,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,70,229,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .particle {
          position: absolute; width: 3px; height: 3px;
          background: #4f46e5; border-radius: 50%;
          animation: rise linear infinite; opacity: 0;
        }
        @keyframes rise {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-10vh) scale(1); opacity: 0; }
        }
        .fade-up { opacity: 0; transform: translateY(30px); animation: fadeUp 0.8s ease forwards; }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
        .cs-nav {
          position: relative; z-index: 10;
          display: flex; align-items: center; justify-content: space-between;
          padding: 24px 64px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(12px);
          animation: fadeUp 0.6s ease forwards;
        }
        .cs-logo { display: flex; align-items: center; gap: 10px; }
        .cs-logo-icon {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, #4f46e5, #06b6d4);
          display: flex; align-items: center; justify-content: center;
        }
        .cs-logo-text { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: white; }
        .cs-nav-badge {
          background: rgba(79,70,229,0.15);
          border: 1px solid rgba(79,70,229,0.4);
          color: #a5b4fc; font-size: 12px; font-weight: 500;
          padding: 6px 14px; border-radius: 100px;
        }
        .home-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          color: white; font-size: 13px; font-weight: 500;
          padding: 8px 20px; border-radius: 8px;
          cursor: pointer; text-decoration: none;
          transition: all 0.2s;
          display: flex; align-items: center; gap: 8px;
        }
        .home-btn:hover { background: rgba(79,70,229,0.2); border-color: rgba(79,70,229,0.5); transform: translateY(-1px); }
        .cs-main {
          position: relative; z-index: 10; flex: 1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 60px 24px; text-align: center;
        }
        .cs-tag {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(79,70,229,0.12);
          border: 1px solid rgba(79,70,229,0.3);
          color: #a5b4fc; font-size: 12px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 8px 18px; border-radius: 100px;
          margin-bottom: 32px;
          animation: fadeUp 0.7s 0.1s ease forwards; opacity: 0;
        }
        .cs-tag-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #4f46e5;
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        .cs-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(42px, 7vw, 88px);
          font-weight: 800; line-height: 1.05;
          letter-spacing: -2px; margin-bottom: 24px;
          animation: fadeUp 0.8s 0.2s ease forwards; opacity: 0;
        }
        .cs-heading .line1 { display: block; color: white; }
        .cs-heading .line2 {
          display: block;
          background: linear-gradient(135deg, #4f46e5, #06b6d4, #8b5cf6);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .cs-sub {
          color: #6b7280; font-size: 16px; line-height: 1.7;
          max-width: 480px; margin-bottom: 56px;
          animation: fadeUp 0.8s 0.3s ease forwards; opacity: 0;
        }
        .cs-countdown {
          display: flex; align-items: center; gap: 16px;
          margin-bottom: 56px;
          animation: fadeUp 0.8s 0.4s ease forwards; opacity: 0;
        }
        .cs-unit {
          display: flex; flex-direction: column; align-items: center;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; padding: 20px 28px; min-width: 90px;
          position: relative; overflow: hidden;
        }
        .cs-unit::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(79,70,229,0.5), transparent);
        }
        .cs-num {
          font-family: 'Syne', sans-serif; font-size: 40px; font-weight: 800;
          color: white; line-height: 1; margin-bottom: 6px; transition: all 0.3s;
        }
        .cs-label { font-size: 11px; color: #4b5563; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 500; }
        .cs-sep { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: #4f46e5; margin-bottom: 20px; }
        .cs-form {
          display: flex; gap: 0; width: 100%; max-width: 480px;
          animation: fadeUp 0.8s 0.5s ease forwards; opacity: 0;
        }
        .cs-input {
          flex: 1; background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1); border-right: none;
          color: white; font-size: 14px; padding: 14px 20px;
          border-radius: 12px 0 0 12px; outline: none;
          transition: border-color 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .cs-input::placeholder { color: #4b5563; }
        .cs-input:focus { border-color: rgba(79,70,229,0.5); }
        .cs-submit {
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          border: none; color: white; font-size: 14px; font-weight: 600;
          padding: 14px 28px; border-radius: 0 12px 12px 0;
          cursor: pointer; transition: all 0.2s; white-space: nowrap;
          font-family: 'DM Sans', sans-serif;
        }
        .cs-submit:hover { background: linear-gradient(135deg, #4338ca, #4f46e5); transform: translateX(2px); }
        .cs-success {
          display: flex; align-items: center; gap: 10px;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.3);
          color: #34d399; font-size: 14px;
          padding: 14px 24px; border-radius: 12px;
          animation: fadeUp 0.5s ease forwards;
        }
        .cs-bottom {
          position: relative; z-index: 10;
          display: flex; align-items: center; justify-content: center; gap: 24px;
          padding: 20px 64px;
          border-top: 1px solid rgba(255,255,255,0.05);
          animation: fadeUp 0.8s 0.7s ease forwards; opacity: 0;
        }
        .cs-social {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          color: #6b7280; font-size: 11px; font-weight: 700;
          text-decoration: none; transition: all 0.2s;
          font-family: 'Syne', sans-serif;
        }
        .cs-social:hover { background: rgba(79,70,229,0.2); border-color: rgba(79,70,229,0.4); color: white; transform: translateY(-2px); }
        .cs-progress-wrap {
          width: 100%; max-width: 480px; margin-bottom: 48px;
          animation: fadeUp 0.8s 0.45s ease forwards; opacity: 0;
        }
        .cs-progress-label { display: flex; justify-content: space-between; font-size: 12px; color: #4b5563; margin-bottom: 8px; }
        .cs-progress-bar { height: 4px; background: rgba(255,255,255,0.06); border-radius: 100px; overflow: hidden; }
        .cs-progress-fill {
          height: 100%; background: linear-gradient(90deg, #4f46e5, #06b6d4);
          border-radius: 100px; width: 0%;
          animation: fillBar 2s 1s ease forwards;
        }
        @keyframes fillBar { from { width: 0%; } to { width: 68%; } }
        @media (max-width: 640px) {
          .cs-nav { padding: 20px 24px; }
          .cs-nav-badge { display: none; }
          .cs-bottom { padding: 20px 24px; }
          .cs-countdown { gap: 8px; }
          .cs-unit { padding: 14px 16px; min-width: 68px; }
          .cs-num { font-size: 28px; }
          .cs-sep { font-size: 24px; }
        }
      `}</style>

      <div className="cs-root">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-bg" />

        {/* Particles */}
        {mounted &&
          Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${8 + i * 8}%`,
                animationDuration: `${6 + (i % 4) * 2}s`,
                animationDelay: `${(i * 0.7) % 5}s`,
                width: i % 3 === 0 ? "4px" : "2px",
                height: i % 3 === 0 ? "4px" : "2px",
                background: i % 2 === 0 ? "#4f46e5" : "#06b6d4",
              }}
            />
          ))}

        {/* Navbar */}
        <nav className="cs-nav">
          <div className="cs-logo">
            <div className="cs-logo-icon">
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
            <span className="cs-logo-text">QuickHire</span>
          </div>

          <span className="cs-nav-badge">🚀 New features coming</span>

          <Link href="/" className="home-btn">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </Link>
        </nav>

        {/* Main */}
        <main className="cs-main">
          <div className="cs-tag">
            <div className="cs-tag-dot" />
            Something big is coming
          </div>

          <h1 className="cs-heading">
            <span className="line1">We&apos;re launching</span>
            <span className="line2">very soon</span>
          </h1>

          <p className="cs-sub">
            QuickHire is getting a massive upgrade. New features, better
            experience, more opportunities. Stay tuned!
          </p>

          {/* <div className="cs-countdown">
            {[
              { num: timeLeft.days, label: "Days" },
              { num: timeLeft.hours, label: "Hours" },
              { num: timeLeft.minutes, label: "Minutes" },
              { num: timeLeft.seconds, label: "Seconds" },
            ].map((unit, i) => (
              <React.Fragment key={unit.label}>
                {i > 0 && <span className="cs-sep">:</span>}
                <div className="cs-unit">
                  <span className="cs-num">
                    {String(unit.num).padStart(2, "0")}
                  </span>
                  <span className="cs-label">{unit.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div> */}

          <div className="cs-progress-wrap">
            <div className="cs-progress-label">
              <span>Development Progress</span>
              <span style={{ color: "#6366f1", fontWeight: 600 }}>68%</span>
            </div>
            <div className="cs-progress-bar">
              <div className="cs-progress-fill" />
            </div>
          </div>

          {!submitted ? (
            <form className="cs-form" onSubmit={handleSubmit}>
              <input
                className="cs-input"
                type="email"
                placeholder="Enter your email for early access"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="cs-submit" type="submit">
                Notify Me →
              </button>
            </form>
          ) : (
            <div className="cs-success">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              You&apos;re on the list! We&apos;ll notify you.
            </div>
          )}
        </main>

        {/* Bottom */}
        <div className="cs-bottom">
          {[
            { label: "f", href: "#" },
            { label: "in", href: "#" },
            { label: "tw", href: "#" },
            { label: "ig", href: "#" },
          ].map((s) => (
            <a key={s.label} href={s.href} className="cs-social">
              {s.label}
            </a>
          ))}
          <span
            style={{ color: "#374151", fontSize: "12px", marginLeft: "8px" }}
          >
            © 2024 QuickHire. All rights reserved.
          </span>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
