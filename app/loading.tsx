// app/loading.tsx
// Next.js automatically shows this file during page/route transitions

export default function Loading() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;1,300;1,500&family=DM+Sans:wght@300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .qh-loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #0a0a0f;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }

        /* ── Ambient glow blobs ── */
        .qh-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          animation: blobPulse 4s ease-in-out infinite alternate;
        }
        .qh-blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(107,59,255,0.18) 0%, transparent 70%);
          top: -180px; left: -100px;
          animation-delay: 0s;
        }
        .qh-blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%);
          bottom: -120px; right: -80px;
          animation-delay: 1.5s;
        }
        .qh-blob-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%);
          bottom: 40%; right: 20%;
          animation-delay: 0.8s;
        }
        @keyframes blobPulse {
          from { opacity: 0.6; transform: scale(1); }
          to   { opacity: 1;   transform: scale(1.12); }
        }

        /* ── Noise grain overlay ── */
        .qh-grain {
          position: absolute;
          inset: 0;
          opacity: 0.025;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        /* ── Center content ── */
        .qh-center {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          animation: centerFadeIn 0.5s ease forwards;
        }
        @keyframes centerFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Logo mark ── */
        .qh-logomark {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #6b3bff 0%, #9333ea 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          box-shadow:
            0 0 0 1px rgba(107,59,255,0.4),
            0 8px 32px rgba(107,59,255,0.35),
            0 0 60px rgba(107,59,255,0.15);
          animation: logoPulse 2s ease-in-out infinite;
        }
        @keyframes logoPulse {
          0%, 100% { box-shadow: 0 0 0 1px rgba(107,59,255,0.4), 0 8px 32px rgba(107,59,255,0.35), 0 0 60px rgba(107,59,255,0.15); }
          50%       { box-shadow: 0 0 0 1px rgba(107,59,255,0.6), 0 8px 40px rgba(107,59,255,0.5),  0 0 80px rgba(107,59,255,0.25); }
        }

        /* Q icon inside logomark */
        .qh-q {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-size: 28px;
          font-weight: 500;
          color: #fff;
          line-height: 1;
          letter-spacing: -1px;
        }

        /* ── Brand name ── */
        .qh-brand {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-bottom: 6px;
        }
        .qh-quick {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-weight: 300;
          font-size: 32px;
          color: #f5f3ff;
          letter-spacing: -0.5px;
        }
        .qh-hire {
          font-family: 'Fraunces', serif;
          font-style: normal;
          font-weight: 300;
          font-size: 32px;
          color: #a78bfa;
          letter-spacing: -0.5px;
        }

        .qh-tagline {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 40px;
        }

        /* ── Animated progress bar ── */
        .qh-progress-track {
          width: 200px;
          height: 2px;
          background: rgba(255,255,255,0.06);
          border-radius: 100px;
          overflow: hidden;
          margin-bottom: 18px;
        }
        .qh-progress-fill {
          height: 100%;
          width: 40%;
          background: linear-gradient(90deg, #6b3bff, #a78bfa, #ec4899);
          border-radius: 100px;
          animation: progressSlide 1.6s ease-in-out infinite;
        }
        @keyframes progressSlide {
          0%   { transform: translateX(-150%); width: 40%; }
          50%  { width: 60%; }
          100% { transform: translateX(350%); width: 40%; }
        }

        /* ── Dot row ── */
        .qh-dots {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .qh-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: rgba(167,139,250,0.5);
          animation: dotBounce 1.4s ease-in-out infinite;
        }
        .qh-dot:nth-child(1) { animation-delay: 0s; }
        .qh-dot:nth-child(2) { animation-delay: 0.18s; }
        .qh-dot:nth-child(3) { animation-delay: 0.36s; }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: scale(1);   opacity: 0.4; }
          40%           { transform: scale(1.6); opacity: 1;   }
        }

        /* ── Floating job chips ── */
        .qh-chips {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }
        .qh-chip {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          white-space: nowrap;
          animation: chipFloat linear infinite;
        }
        .qh-chip-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* Individual chip positions & speeds */
        .qh-chip:nth-child(1) { top: 18%; left: 8%;  animation-duration: 8s;  animation-delay: 0s; }
        .qh-chip:nth-child(2) { top: 25%; right: 10%; animation-duration: 10s; animation-delay: -3s; }
        .qh-chip:nth-child(3) { top: 55%; left: 5%;  animation-duration: 9s;  animation-delay: -1s; }
        .qh-chip:nth-child(4) { top: 70%; right: 8%;  animation-duration: 11s; animation-delay: -5s; }
        .qh-chip:nth-child(5) { top: 40%; left: 2%;  animation-duration: 7s;  animation-delay: -2s; }
        .qh-chip:nth-child(6) { top: 80%; left: 30%; animation-duration: 12s; animation-delay: -4s; }
        .qh-chip:nth-child(7) { top: 12%; right: 28%; animation-duration: 9s;  animation-delay: -6s; }

        @keyframes chipFloat {
          0%   { transform: translateY(0px)   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-20px); opacity: 0; }
        }
      `}</style>

      <div className="qh-loader">
        {/* Ambient background */}
        <div className="qh-blob qh-blob-1" />
        <div className="qh-blob qh-blob-2" />
        <div className="qh-blob qh-blob-3" />
        <div className="qh-grain" />

        {/* Floating job role chips */}
        <div className="qh-chips">
          {[
            { label: "UI Designer", color: "#a78bfa" },
            { label: "Full Stack Dev", color: "#34d399" },
            { label: "Product Manager", color: "#f472b6" },
            { label: "Data Analyst", color: "#38bdf8" },
            { label: "DevOps Engineer", color: "#fbbf24" },
            { label: "HR Business Partner", color: "#a78bfa" },
            { label: "Marketing Lead", color: "#f87171" },
          ].map((chip, i) => (
            <div key={i} className="qh-chip">
              <span
                className="qh-chip-dot"
                style={{ background: chip.color }}
              />
              {chip.label}
            </div>
          ))}
        </div>

        {/* Center brand */}
        <div className="qh-center">
          {/* Logo mark */}
          <div className="qh-logomark">
            <span className="qh-q">Q</span>
          </div>

          {/* Brand name */}
          <div className="qh-brand">
            <span className="qh-quick">Quick</span>
            <span className="qh-hire">Hire</span>
          </div>

          <p className="qh-tagline">Finding talent, fast</p>

          {/* Progress bar */}
          <div className="qh-progress-track">
            <div className="qh-progress-fill" />
          </div>

          {/* Bouncing dots */}
          <div className="qh-dots">
            <div className="qh-dot" />
            <div className="qh-dot" />
            <div className="qh-dot" />
          </div>
        </div>
      </div>
    </>
  );
}
