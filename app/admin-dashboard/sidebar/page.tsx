"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ── Inline SVG Icons (no external deps needed) ───────────────
const IconHome = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconPlus = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconList = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <path d="M9 18h11M9 12h11M9 6h11M4 18h.01M4 12h.01M4 6h.01" />
  </svg>
);

const IconUsers = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const IconStats = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const IconMenu = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconX = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ── Nav Items ────────────────────────────────────────────────
const navItems = [
  { name: "Dashboard", path: "/admin-dashboard", icon: <IconHome /> },
  { name: "Add Job", path: "/admin-dashboard/add-job", icon: <IconPlus /> },
  { name: "All Jobs", path: "/admin-dashboard/all-jobs", icon: <IconList /> },
  {
    name: "All Applications",
    path: "/admin-dashboard/all-job-applications",
    icon: <IconUsers />,
  },
  { name: "Statistics", path: "/admin-dashboard/stats", icon: <IconStats /> },
];

const ACCENT = "#f97316"; // ← change accent color here

const Sidebar = () => {
  const pathname = usePathname();
  // Mobile drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <style>{`
        /* ── Collapsed icon sidebar (sm) ── */
        .qs-sidebar {
          position: fixed;
          top: 0; left: 0;
          height: 100vh;
          background: #0b0b12;
          border-right: 1px solid rgba(255,255,255,0.07);
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 40;
          transition: width 0.25s ease;
          overflow: hidden;
        }

        /* sm (mobile): icon-only collapsed strip */
        .qs-sidebar          { width: 64px; }
        .qs-label            { display: none; }
        .qs-logo-text        { display: none; }
        .qs-footer-text      { display: none; }
        .qs-toggle-btn       { display: none; }

        /* lg+: full expanded sidebar */
        @media (min-width: 1024px) {
          .qs-sidebar          { width: 220px; align-items: stretch; }
          .qs-label            { display: inline; }
          .qs-logo-text        { display: block; }
          .qs-footer-text      { display: block; }
          .qs-toggle-btn       { display: flex; }
          .qs-nav-item         { justify-content: flex-start !important; padding: 10px 14px !important; }
          .qs-logo-wrap        { justify-content: flex-start !important; padding: 20px 18px !important; }
        }

        /* Main content offset */
        .qs-main {
          margin-left: 64px;
          transition: margin-left 0.25s ease;
          min-height: 100vh;
        }
        @media (min-width: 1024px) {
          .qs-main { margin-left: 220px; }
        }

        /* Mobile full drawer (over icon strip) */
        .qs-drawer {
          position: fixed;
          top: 0; left: 0;
          height: 100vh;
          width: 220px;
          background: #0b0b12;
          border-right: 1px solid rgba(255,255,255,0.1);
          z-index: 50;
          transform: translateX(-100%);
          transition: transform 0.28s cubic-bezier(.4,0,.2,1);
          display: flex;
          flex-direction: column;
        }
        .qs-drawer.open      { transform: translateX(0); }
        .qs-overlay {
          display: none;
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.55);
          z-index: 45;
        }
        .qs-overlay.open     { display: block; }

        @media (min-width: 1024px) {
          .qs-drawer           { display: none !important; }
          .qs-overlay          { display: none !important; }
          .qs-hamburger        { display: none !important; }
        }

        /* Nav item base */
        .qs-nav-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 10px 0;
          width: 100%;
          border: none;
          background: transparent;
          cursor: pointer;
          border-radius: 10px;
          border-left: 2px solid transparent;
          color: rgba(255,255,255,0.35);
          font-size: 13px;
          font-weight: 400;
          font-family: inherit;
          text-decoration: none;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
          white-space: nowrap;
        }
        .qs-nav-item:hover {
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.7);
        }
        .qs-nav-item.active {
          background: rgba(249,115,22,0.12);
          color: ${ACCENT};
          border-left: 2px solid ${ACCENT};
          font-weight: 500;
        }

        /* Tooltip for icon-only strip */
        .qs-tip-wrap { position: relative; width: 100%; display: flex; justify-content: center; }
        .qs-tip-wrap .qs-tooltip {
          position: absolute;
          left: calc(100% + 10px);
          top: 50%; transform: translateY(-50%);
          background: #1a1a26;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.8);
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 6px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.15s;
          z-index: 99;
        }
        .qs-tip-wrap:hover .qs-tooltip { opacity: 1; }

        /* Active icon glow (collapsed) */
        .qs-nav-item.active .qs-icon-box {
          background: rgba(249,115,22,0.18);
          border: 1px solid rgba(249,115,22,0.35);
          border-radius: 10px;
          box-shadow: 0 0 12px rgba(249,115,22,0.2);
        }
        .qs-icon-box {
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 10px;
          border: 1px solid transparent;
          flex-shrink: 0;
          transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
        }

        /* Hamburger btn (visible on sm inside icon strip) */
        .qs-hamburger {
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          margin-bottom: 6px;
        }
      `}</style>

      {/* ══ Collapsed Icon Strip (always visible, sm + lg) ══ */}
      <Link href={"/"}>
        <aside className="qs-sidebar">
          {/* Logo */}
          <div
            className="qs-logo-wrap"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "18px 0",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              width: "100%",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                background: `linear-gradient(135deg, ${ACCENT}, #c44e08)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 800,
                fontSize: 15,
                flexShrink: 0,
              }}
            >
              Q
            </div>
            <div className="qs-logo-text" style={{ marginLeft: 10 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#f0eeff",
                }}
              >
                Quick Hire
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 9,
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.06em",
                }}
              >
                JOB ADMIN
              </p>
            </div>
          </div>

          {/* Hamburger (sm only — opens drawer) */}
          <div
            style={{
              padding: "10px 0 4px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              className="qs-hamburger"
              onClick={() => setDrawerOpen(true)}
            >
              <IconMenu />
            </button>
          </div>

          {/* Icon nav */}
          <nav
            style={{
              flex: 1,
              width: "100%",
              padding: "4px 6px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <div key={item.path} className="qs-tip-wrap">
                  <Link
                    href={item.path}
                    style={{ width: "100%", textDecoration: "none" }}
                  >
                    <div className={`qs-nav-item ${isActive ? "active" : ""}`}>
                      <div className="qs-icon-box">{item.icon}</div>
                      <span className="qs-label">{item.name}</span>
                    </div>
                  </Link>
                  {/* Tooltip shown only on collapsed strip */}
                  <span className="qs-tooltip">{item.name}</span>
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div
            className="qs-footer-text"
            style={{
              padding: "12px 16px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              fontSize: 10,
              color: "rgba(255,255,255,0.2)",
              width: "100%",
            }}
          >
            © 2026 Admin Panel
          </div>
        </aside>
      </Link>

      {/* ══ Mobile Full Drawer (sm only) ══ */}
      <div
        className={`qs-overlay ${drawerOpen ? "open" : ""}`}
        onClick={() => setDrawerOpen(false)}
      />
      <aside className={`qs-drawer ${drawerOpen ? "open" : ""}`}>
        {/* Drawer Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 18px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: `linear-gradient(135deg, ${ACCENT}, #c44e08)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 800,
                fontSize: 14,
              }}
            >
              Q
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#f0eeff",
                }}
              >
                Quick Hire
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 9,
                  color: "rgba(255,255,255,0.25)",
                  letterSpacing: "0.05em",
                }}
              >
                JOB ADMIN
              </p>
            </div>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconX />
          </button>
        </div>

        {/* Drawer Nav */}
        <nav
          style={{
            flex: 1,
            padding: "10px 10px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                style={{ textDecoration: "none" }}
                onClick={() => setDrawerOpen(false)}
              >
                <div
                  className={`qs-nav-item ${isActive ? "active" : ""}`}
                  style={{ justifyContent: "flex-start", padding: "10px 14px" }}
                >
                  <div className="qs-icon-box">{item.icon}</div>
                  <span
                    style={{ fontSize: 13, fontWeight: isActive ? 500 : 400 }}
                  >
                    {item.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            fontSize: 10,
            color: "rgba(255,255,255,0.2)",
          }}
        >
          © 2026 Admin Panel
        </div>
      </aside>

      {/* ══ Main content area ══ */}
      <div className="qs-main">{/* your page content here */}</div>
    </>
  );
};

export default Sidebar;
