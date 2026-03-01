"use client";

import { useState, useEffect, useRef } from "react";
import Header from "./header/page";

function Sparkline({
  data,
  color,
  fill,
}: {
  data: number[];
  color: string;
  fill: string;
}) {
  const w = 80,
    h = 32;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min + 1)) * h;
    return `${x},${y}`;
  });
  const polyline = points.join(" ");
  const areaPoints = `0,${h} ${polyline} ${w},${h}`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polygon points={areaPoints} fill={fill} />
      <polyline
        points={polyline}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BarChart({
  data,
}: {
  data: { label: string; value: number; color: string }[];
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "10px",
        height: "120px",
        padding: "0 4px",
      }}
    >
      {data.map((d, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            height: "100%",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.4)",
              fontWeight: 300,
            }}
          >
            {d.value}
          </span>
          <div
            style={{
              width: "100%",
              flex: 1,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                width: "100%",
                height: `${(d.value / max) * 100}%`,
                background: d.color,
                borderRadius: "6px 6px 4px 4px",
                minHeight: "4px",
                transition: "height 1s ease",
                boxShadow: `0 0 12px ${d.color}55`,
              }}
            />
          </div>
          <span
            style={{
              fontSize: "10px",
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.04em",
            }}
          >
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Donut Chart ───────────────────────────────────────────────
function DonutChart({
  segments,
}: {
  segments: { label: string; value: number; color: string }[];
}) {
  const total = segments.reduce((a, b) => a + b.value, 0);
  const r = 52,
    cx = 64,
    cy = 64,
    strokeW = 14;
  const circumference = 2 * Math.PI * r;

  // Pre-calculate arc values using reduce — no mutation
  const arcs = segments.reduce<
    { dash: number; gap: number; offset: number; cumulative: number }[]
  >((result, seg) => {
    const prev = result.length > 0 ? result[result.length - 1].cumulative : 0;
    const pct = seg.value / total;
    const dash = pct * circumference;
    const gap = circumference - dash;
    const offset = circumference - prev * circumference;
    return [...result, { dash, gap, offset, cumulative: prev + pct }];
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
      <svg width="128" height="128" viewBox="0 0 128 128">
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeW}
        />
        {segments.map((seg, i) => {
          const { dash, gap, offset } = arcs[i];
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeW}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform={`rotate(-90 ${cx} ${cy})`}
              style={{ filter: `drop-shadow(0 0 4px ${seg.color}88)` }}
            />
          );
        })}
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fill="#f5f3ff"
          fontSize="18"
          fontWeight="300"
          fontFamily="Fraunces, serif"
        >
          {total}
        </text>
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          fill="rgba(255,255,255,0.25)"
          fontSize="9"
          fontFamily="DM Sans, sans-serif"
          letterSpacing="1"
        >
          TOTAL
        </text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {segments.map((seg, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: seg.color,
                flexShrink: 0,
                boxShadow: `0 0 6px ${seg.color}`,
              }}
            />
            <span
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.45)",
                fontWeight: 300,
              }}
            >
              {seg.label}
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.6)",
                marginLeft: "auto",
                fontWeight: 400,
              }}
            >
              {seg.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Counter({ to, duration = 1200 }: { to: number; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = to / (duration / 16);
    const t = setInterval(() => {
      start += step;
      if (start >= to) {
        setVal(to);
        clearInterval(t);
      } else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(t);
  }, [to, duration]);
  return <>{val}</>;
}

// ── Main Dashboard ────────────────────────────────────────────
export default function DashboardPage() {
  const stats = [
    {
      label: "Total Jobs",
      value: 24,
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        </svg>
      ),
      color: "#a78bfa",
      glow: "rgba(167,139,250,0.2)",
      border: "rgba(167,139,250,0.2)",
      bg: "rgba(167,139,250,0.08)",
      sparkData: [4, 7, 5, 9, 8, 12, 10, 14, 11, 16, 18, 24],
      sparkColor: "#a78bfa",
      sparkFill: "rgba(167,139,250,0.1)",
      change: "+12%",
      up: true,
    },
    {
      label: "Applications",
      value: 138,
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
      color: "#34d399",
      glow: "rgba(52,211,153,0.2)",
      border: "rgba(52,211,153,0.2)",
      bg: "rgba(52,211,153,0.08)",
      sparkData: [12, 20, 18, 30, 25, 40, 38, 55, 60, 90, 115, 138],
      sparkColor: "#34d399",
      sparkFill: "rgba(52,211,153,0.1)",
      change: "+34%",
      up: true,
    },
    {
      label: "Active Jobs",
      value: 8,
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      color: "#38bdf8",
      glow: "rgba(56,189,248,0.2)",
      border: "rgba(56,189,248,0.2)",
      bg: "rgba(56,189,248,0.08)",
      sparkData: [10, 9, 11, 8, 10, 7, 9, 8, 10, 9, 8, 8],
      sparkColor: "#38bdf8",
      sparkFill: "rgba(56,189,248,0.1)",
      change: "-2",
      up: false,
    },
    {
      label: "Total Users",
      value: 57,
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      color: "#f472b6",
      glow: "rgba(244,114,182,0.2)",
      border: "rgba(244,114,182,0.2)",
      bg: "rgba(244,114,182,0.08)",
      sparkData: [10, 18, 22, 28, 30, 35, 38, 42, 45, 50, 54, 57],
      sparkColor: "#f472b6",
      sparkFill: "rgba(244,114,182,0.1)",
      change: "+8",
      up: true,
    },
  ];

  const barData = [
    { label: "Jan", value: 4, color: "rgba(167,139,250,0.6)" },
    { label: "Feb", value: 7, color: "rgba(167,139,250,0.6)" },
    { label: "Mar", value: 5, color: "rgba(167,139,250,0.6)" },
    { label: "Apr", value: 10, color: "rgba(167,139,250,0.6)" },
    { label: "May", value: 8, color: "#a78bfa" },
    { label: "Jun", value: 14, color: "#a78bfa" },
    { label: "Jul", value: 11, color: "#6b3bff" },
    { label: "Aug", value: 18, color: "#6b3bff" },
  ];

  const donutData = [
    { label: "IT & Tech", value: 10, color: "#a78bfa" },
    { label: "Design", value: 6, color: "#f472b6" },
    { label: "Marketing", value: 5, color: "#34d399" },
    { label: "HR & Ops", value: 3, color: "#38bdf8" },
  ];

  const recentJobs = [
    {
      title: "Senior Product Designer",
      company: "Figma Corp",
      type: "Remote",
      time: "2h ago",
      color: "#a78bfa",
    },
    {
      title: "Full Stack Engineer",
      company: "Stripe",
      type: "Full-time",
      time: "5h ago",
      color: "#34d399",
    },
    {
      title: "Growth Marketing Lead",
      company: "Notion Labs",
      type: "Hybrid",
      time: "1d ago",
      color: "#38bdf8",
    },
    {
      title: "DevOps Engineer",
      company: "Vercel",
      type: "Contract",
      time: "2d ago",
      color: "#f472b6",
    },
    {
      title: "HR Business Partner",
      company: "Acme Inc.",
      type: "Part-time",
      time: "3d ago",
      color: "#fbbf24",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .db-wrap {
          min-height: 100vh;
          background: #0a0a0f;
          background-image:
            radial-gradient(ellipse 70% 40% at 10% 0%, rgba(99,59,255,0.14) 0%, transparent 55%),
            radial-gradient(ellipse 50% 35% at 90% 95%, rgba(236,72,153,0.09) 0%, transparent 50%);
          padding: 40px 32px;
          font-family: 'DM Sans', sans-serif;
          color: #f0eeff;
        }

        /* Welcome banner */
        .welcome-banner {
          background: linear-gradient(135deg, rgba(107,59,255,0.25) 0%, rgba(147,51,234,0.15) 50%, rgba(236,72,153,0.15) 100%);
          border: 1px solid rgba(107,59,255,0.25);
          border-radius: 20px;
          padding: 36px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 60px rgba(107,59,255,0.1), inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .welcome-banner::before {
          content: '';
          position: absolute;
          top: -40px; right: -40px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .wb-greeting {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #a78bfa;
          font-weight: 500;
          margin-bottom: 8px;
        }
        .wb-title {
          font-family: 'Fraunces', serif;
          font-size: 30px;
          font-weight: 300;
          color: #f5f3ff;
          margin: 0 0 8px;
          line-height: 1.2;
        }
        .wb-title em { font-style: italic; color: #a78bfa; }
        .wb-sub {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          font-weight: 300;
          max-width: 380px;
        }
        .wb-badges { display: flex; gap: 8px; margin-top: 20px; flex-wrap: wrap; }
        .wb-badge {
          display: flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px;
          padding: 5px 12px;
          font-size: 11px;
          color: rgba(255,255,255,0.45);
          font-weight: 300;
        }
        .wb-badge-dot { width: 6px; height: 6px; border-radius: 50%; }
        .wb-illustration {
          flex-shrink: 0;
          width: 130px; height: 100px;
          background: rgba(107,59,255,0.1);
          border: 1px solid rgba(107,59,255,0.15);
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-size: 52px;
          font-weight: 300;
          color: rgba(167,139,250,0.4);
        }

        /* Stats grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        @media (max-width: 900px) { .stats-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 520px) { .stats-grid { grid-template-columns: 1fr; } }

        .stat-card {
          background: rgba(255,255,255,0.03);
          border-radius: 16px;
          padding: 22px;
          border: 1px solid rgba(255,255,255,0.06);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative;
          overflow: hidden;
        }
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
        }
        .stat-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .stat-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }
        .stat-change {
          font-size: 11px; font-weight: 500;
          padding: 3px 8px; border-radius: 100px;
        }
        .stat-value {
          font-family: 'Fraunces', serif;
          font-size: 34px;
          font-weight: 300;
          color: #f5f3ff;
          line-height: 1;
          margin-bottom: 4px;
        }
        .stat-label {
          font-size: 12px; color: rgba(255,255,255,0.3);
          font-weight: 300; margin-bottom: 14px;
        }

        /* Charts row */
        .charts-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }
        @media (max-width: 720px) { .charts-row { grid-template-columns: 1fr; } }

        .chart-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        .chart-title {
          font-family: 'Fraunces', serif;
          font-size: 17px;
          font-weight: 300;
          color: #f5f3ff;
          margin: 0 0 4px;
        }
        .chart-sub { font-size: 11px; color: rgba(255,255,255,0.25); font-weight: 300; margin-bottom: 20px; }

        /* Recent jobs */
        .bottom-row {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 16px;
        }
        @media (max-width: 760px) { .bottom-row { grid-template-columns: 1fr; } }

        .recent-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        .section-title {
          font-family: 'Fraunces', serif;
          font-size: 17px; font-weight: 300;
          color: #f5f3ff; margin: 0 0 4px;
        }
        .section-sub { font-size: 11px; color: rgba(255,255,255,0.25); font-weight: 300; margin-bottom: 20px; }

        .job-row {
          display: flex; align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          gap: 12px;
          transition: background 0.15s;
          border-radius: 8px;
        }
        .job-row:last-child { border-bottom: none; }
        .job-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .job-info { flex: 1; min-width: 0; }
        .job-row-title { font-size: 13px; color: rgba(255,255,255,0.7); font-weight: 400; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .job-row-company { font-size: 11px; color: rgba(255,255,255,0.25); font-weight: 300; margin-top: 2px; }
        .job-type-pill {
          font-size: 10px; padding: 3px 9px; border-radius: 100px;
          color: rgba(255,255,255,0.45); border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03); white-space: nowrap;
        }
        .job-time { font-size: 10px; color: rgba(255,255,255,0.2); white-space: nowrap; }

        /* Tips card */
        .tips-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        .tip-item {
          display: flex; gap: 10px; align-items: flex-start;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          font-size: 12px; color: rgba(255,255,255,0.4);
          font-weight: 300; line-height: 1.6;
        }
        .tip-item:last-child { border-bottom: none; }
        .tip-num {
          width: 20px; height: 20px; border-radius: 6px; flex-shrink: 0;
          background: rgba(107,59,255,0.15); border: 1px solid rgba(107,59,255,0.25);
          color: #a78bfa; font-size: 10px; font-weight: 500;
          display: flex; align-items: center; justify-content: center;
          margin-top: 1px;
        }
      `}</style>

      <div className="db-wrap">
        {/* ── Welcome Banner ── */}

        <div className="welcome-banner">
          <div>
            <p className="wb-greeting">Admin Dashboard</p>
            <h1 className="wb-title">
              Good morning, <em>Admin</em> 👋
            </h1>
            <p className="wb-sub">
              Heres whats happening with{" "}
              <strong style={{ color: "rgba(255,255,255,0.6)" }}>
                Quick Hire
              </strong>{" "}
              today. Stay on top of your listings.
            </p>
            <div className="wb-badges">
              <span className="wb-badge">
                <span
                  className="wb-badge-dot"
                  style={{ background: "#34d399" }}
                />
                8 Active Jobs
              </span>
              <span className="wb-badge">
                <span
                  className="wb-badge-dot"
                  style={{ background: "#a78bfa" }}
                />
                138 Applications
              </span>
              <span className="wb-badge">
                <span
                  className="wb-badge-dot"
                  style={{ background: "#f472b6" }}
                />
                57 Users
              </span>
            </div>
          </div>
          <div className="wb-illustration">Q</div>
        </div>

        {/* ── Stat Cards ── */}
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-card"
              style={{ borderColor: s.border }}
            >
              <div className="stat-card-top">
                <div
                  className="stat-icon"
                  style={{
                    background: s.bg,
                    color: s.color,
                    border: `1px solid ${s.border}`,
                  }}
                >
                  {s.icon}
                </div>
                <span
                  className="stat-change"
                  style={{
                    background: s.up
                      ? "rgba(52,211,153,0.1)"
                      : "rgba(248,113,113,0.1)",
                    color: s.up ? "#34d399" : "#f87171",
                  }}
                >
                  {s.up ? "↑" : "↓"} {s.change}
                </span>
              </div>
              <p className="stat-value">
                <Counter to={s.value} />
              </p>
              <p className="stat-label">{s.label}</p>
              <Sparkline
                data={s.sparkData}
                color={s.sparkColor}
                fill={s.sparkFill}
              />
            </div>
          ))}
        </div>

        {/* ── Charts Row ── */}
        <div className="charts-row">
          {/* Bar chart */}
          <div className="chart-card">
            <p className="chart-title">Jobs Posted</p>
            <p className="chart-sub">Monthly breakdown — 2024</p>
            <BarChart data={barData} />
          </div>

          {/* Donut chart */}
          <div className="chart-card">
            <p className="chart-title">By Category</p>
            <p className="chart-sub">Distribution of active listings</p>
            <DonutChart segments={donutData} />
          </div>
        </div>

        {/* ── Bottom Row ── */}
        <div className="bottom-row">
          {/* Recent Jobs */}
          <div className="recent-card">
            <p className="section-title">Recent Listings</p>
            <p className="section-sub">Latest jobs added to the board</p>
            {recentJobs.map((job, i) => (
              <div key={i} className="job-row">
                <span
                  className="job-dot"
                  style={{
                    background: job.color,
                    boxShadow: `0 0 6px ${job.color}`,
                  }}
                />
                <div className="job-info">
                  <p className="job-row-title">{job.title}</p>
                  <p className="job-row-company">{job.company}</p>
                </div>
                <span className="job-type-pill">{job.type}</span>
                <span className="job-time">{job.time}</span>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="tips-card">
            <p className="section-title">Quick Tips</p>
            <p className="section-sub">Make the most of Quick Hire</p>
            {[
              "Post new jobs from the Add Job page.",
              "View or delete listings in All Jobs.",
              "Keep postings fresh for better reach.",
              "Reply to applications within 48 hrs.",
            ].map((tip, i) => (
              <div key={i} className="tip-item">
                <span className="tip-num">{i + 1}</span>
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
