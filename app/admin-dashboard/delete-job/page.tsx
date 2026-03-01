"use client";
import { useState } from "react";

const initialJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp BD",
    location: "Dhaka",
    type: "Full-time",
    status: "Active",
    applicants: 42,
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "PixelHouse",
    location: "Remote",
    type: "Contract",
    status: "Active",
    applicants: 28,
    posted: "4 days ago",
  },
  {
    id: 3,
    title: "Backend Engineer (Node)",
    company: "StartupX",
    location: "Chittagong",
    type: "Full-time",
    status: "Paused",
    applicants: 15,
    posted: "1 week ago",
  },
  {
    id: 4,
    title: "Product Manager",
    company: "GrowthLab",
    location: "Dhaka",
    type: "Full-time",
    status: "Active",
    applicants: 63,
    posted: "3 days ago",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudNepal",
    location: "Remote",
    type: "Part-time",
    status: "Closed",
    applicants: 9,
    posted: "2 weeks ago",
  },
];

export default function DeleteJobPage() {
  const [jobs, setJobs] = useState(initialJobs);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [deletedName, setDeletedName] = useState("");
  const [toast, setToast] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()),
  );

  const confirmDelete = (id: number) => setConfirmId(id);

  const doDelete = () => {
    const job = jobs.find((j) => j.id === confirmId);
    setDeletedName(job?.title || "");
    setJobs(jobs.filter((j) => j.id !== confirmId));
    setConfirmId(null);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const statusColor = (s: string) =>
    s === "Active" ? "#34d399" : s === "Paused" ? "#fb923c" : "#f87171";

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a0f1e 100%)",
        minHeight: "100vh",
        color: "#e2e8f0",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        .job-row:hover { background: rgba(248,113,113,0.04) !important; }
        input:focus { outline: none; border-color: rgba(110,231,247,0.6) !important; }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes popIn { from { opacity:0; transform: scale(0.9); } to { opacity:1; transform: scale(1); } }
        .modal-overlay { animation: fadeIn 0.2s ease; }
        .modal-box { animation: popIn 0.25s ease; }
      `}</style>

      {/* Confirm Modal */}
      {confirmId !== null && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className="modal-box"
            style={{
              background: "#0d1b2a",
              border: "1px solid rgba(248,113,113,0.3)",
              borderRadius: "20px",
              padding: "36px",
              maxWidth: "420px",
              width: "90%",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🗑️</div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                marginBottom: "10px",
                color: "#f1f5f9",
              }}
            >
              Delete This Job?
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#64748b",
                marginBottom: "8px",
              }}
            >
              Youre about to permanently delete:
            </p>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#f87171",
                marginBottom: "28px",
              }}
            >
              {jobs.find((j) => j.id === confirmId)?.title}
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "#475569",
                marginBottom: "28px",
              }}
            >
              ⚠️ This action cannot be undone. All applicants for this job will
              also be removed.
            </p>
            <div
              style={{ display: "flex", gap: "12px", justifyContent: "center" }}
            >
              <button
                onClick={() => setConfirmId(null)}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  padding: "11px 24px",
                  color: "#94a3b8",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Cancel
              </button>
              <button
                onClick={doDelete}
                style={{
                  background: "linear-gradient(135deg, #f87171, #ef4444)",
                  border: "none",
                  borderRadius: "10px",
                  padding: "11px 24px",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "14px",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            zIndex: 200,
            background: "rgba(248,113,113,0.15)",
            border: "1px solid rgba(248,113,113,0.4)",
            borderRadius: "12px",
            padding: "14px 20px",
            color: "#f87171",
            fontSize: "13px",
            fontWeight: 600,
            backdropFilter: "blur(10px)",
            animation: "popIn 0.3s ease",
          }}
        >
          🗑️ {deletedName} deleted successfully
        </div>
      )}

      {/* Header */}
      <div
        style={{
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(255,255,255,0.02)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          position: "sticky",
          top: 0,
          zIndex: 5,
          backdropFilter: "blur(10px)",
        }}
      >
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 700 }}>🗑️ Delete Jobs</h1>
          <p style={{ fontSize: "13px", color: "#64748b", marginTop: "2px" }}>
            {jobs.length} job{jobs.length !== 1 ? "s" : ""} remaining
          </p>
        </div>
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#64748b",
            }}
          >
            🔍
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs to delete..."
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              padding: "9px 14px 9px 36px",
              color: "#e2e8f0",
              fontSize: "13px",
              width: "260px",
            }}
          />
        </div>
      </div>

      <div style={{ padding: "28px 32px" }}>
        {/* Warning Banner */}
        <div
          style={{
            background: "rgba(248,113,113,0.08)",
            border: "1px solid rgba(248,113,113,0.2)",
            borderRadius: "12px",
            padding: "14px 20px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "13px",
            color: "#f87171",
          }}
        >
          ⚠️ <strong>Warning:</strong>&nbsp; Deleting a job is permanent. All
          associated applications will be removed.
        </div>

        {/* Jobs List */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 24px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              fontSize: "11px",
              color: "#64748b",
              fontWeight: 600,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              display: "grid",
              gridTemplateColumns: "2fr 1.5fr 1fr 80px 80px 100px",
            }}
          >
            <div>Job Title</div>
            <div>Company</div>
            <div>Location</div>
            <div>Applicants</div>
            <div>Status</div>
            <div style={{ textAlign: "right" }}>Action</div>
          </div>

          {filtered.length === 0 ? (
            <div
              style={{ padding: "60px", textAlign: "center", color: "#475569" }}
            >
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>✅</div>
              <div style={{ fontSize: "16px", fontWeight: 600 }}>
                No jobs found
              </div>
              <div style={{ fontSize: "13px", marginTop: "6px" }}>
                All matching jobs have been removed
              </div>
            </div>
          ) : (
            filtered.map((job, i) => (
              <div
                key={job.id}
                className="job-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1.5fr 1fr 80px 80px 100px",
                  padding: "16px 24px",
                  alignItems: "center",
                  borderBottom:
                    i < filtered.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                  transition: "background 0.2s",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#f1f5f9",
                    }}
                  >
                    {job.title}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#64748b",
                      marginTop: "2px",
                    }}
                  >
                    {job.type} · {job.posted}
                  </div>
                </div>
                <div style={{ fontSize: "13px", color: "#94a3b8" }}>
                  {job.company}
                </div>
                <div style={{ fontSize: "13px", color: "#64748b" }}>
                  📍 {job.location}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontFamily: "'Space Mono', monospace",
                    color: "#6ee7f7",
                  }}
                >
                  {job.applicants}
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "11px",
                      padding: "3px 8px",
                      borderRadius: "20px",
                      background: `${statusColor(job.status)}18`,
                      color: statusColor(job.status),
                      border: `1px solid ${statusColor(job.status)}40`,
                      fontWeight: 600,
                    }}
                  >
                    ● {job.status}
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <button
                    onClick={() => confirmDelete(job.id)}
                    style={{
                      background: "rgba(248,113,113,0.12)",
                      border: "1px solid rgba(248,113,113,0.3)",
                      borderRadius: "8px",
                      padding: "7px 16px",
                      color: "#f87171",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: 600,
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "all 0.2s",
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
