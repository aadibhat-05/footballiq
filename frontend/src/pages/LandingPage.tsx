import { Link } from 'react-router-dom'

const STYLE = `
  @keyframes lp-fade-up {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes lp-pulse-slow {
    0%, 100% { opacity: 0.6; }
    50%       { opacity: 1; }
  }
  @keyframes lp-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  .lp-root {
    min-height: 100vh;
    background: #060a0f;
    color: #fff;
    font-family: system-ui, -apple-system, sans-serif;
    overflow-x: hidden;
  }

  /* ── NAV ── */
  .lp-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 40px;
    background: rgba(6,10,15,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .lp-nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }
  .lp-nav-mark {
    width: 30px; height: 30px;
    border-radius: 8px;
    background: linear-gradient(135deg, #22c55e, #16a34a);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .lp-nav-mark svg {
    width: 15px; height: 15px;
    fill: none; stroke: #fff;
    stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round;
  }
  .lp-nav-wordmark {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.3px;
    color: #fff;
  }
  .lp-nav-links {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .lp-btn-ghost {
    padding: 8px 18px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    border: 1px solid rgba(255,255,255,0.1);
    transition: color 0.15s, border-color 0.15s, background 0.15s;
  }
  .lp-btn-ghost:hover {
    color: #fff;
    border-color: rgba(255,255,255,0.25);
    background: rgba(255,255,255,0.04);
  }
  .lp-btn-primary {
    padding: 8px 18px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #000;
    background: #22c55e;
    text-decoration: none;
    transition: background 0.15s, transform 0.1s;
  }
  .lp-btn-primary:hover {
    background: #16a34a;
    transform: translateY(-1px);
  }

  /* ── HERO ── */
  .lp-hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 120px 24px 80px;
    overflow: hidden;
  }
  .lp-hero-pitch {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }
  .lp-hero-pitch svg {
    width: min(900px, 100vw);
    height: auto;
    opacity: 0.07;
  }
  .lp-hero-glow {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 300px;
    background: radial-gradient(ellipse, rgba(34,197,94,0.15) 0%, transparent 70%);
    pointer-events: none;
  }
  .lp-hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 6px 14px;
    border-radius: 20px;
    border: 1px solid rgba(34,197,94,0.3);
    background: rgba(34,197,94,0.07);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #22c55e;
    animation: lp-fade-up 0.5s ease both;
  }
  .lp-hero-badge-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #22c55e;
    animation: lp-pulse-slow 2s ease-in-out infinite;
  }
  .lp-hero-h1 {
    margin-top: 24px;
    font-size: clamp(42px, 7vw, 80px);
    font-weight: 800;
    line-height: 1.0;
    letter-spacing: -2px;
    color: #fff;
    max-width: 820px;
    animation: lp-fade-up 0.5s 0.1s ease both;
  }
  .lp-hero-h1 em {
    font-style: normal;
    background: linear-gradient(90deg, #22c55e, #86efac, #22c55e);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: lp-shimmer 4s linear infinite;
  }
  .lp-hero-sub {
    margin-top: 22px;
    font-size: clamp(16px, 2.2vw, 19px);
    color: rgba(255,255,255,0.45);
    max-width: 540px;
    line-height: 1.6;
    animation: lp-fade-up 0.5s 0.2s ease both;
  }
  .lp-hero-actions {
    margin-top: 36px;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    animation: lp-fade-up 0.5s 0.3s ease both;
  }
  .lp-hero-cta-primary {
    padding: 14px 28px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 700;
    color: #000;
    background: #22c55e;
    text-decoration: none;
    letter-spacing: -0.2px;
    transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
    box-shadow: 0 0 0 0 rgba(34,197,94,0);
  }
  .lp-hero-cta-primary:hover {
    background: #16a34a;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(34,197,94,0.25);
  }
  .lp-hero-cta-secondary {
    padding: 14px 28px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    color: rgba(255,255,255,0.7);
    border: 1px solid rgba(255,255,255,0.12);
    text-decoration: none;
    transition: color 0.15s, border-color 0.15s, background 0.15s;
  }
  .lp-hero-cta-secondary:hover {
    color: #fff;
    border-color: rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.04);
  }
  .lp-hero-hint {
    margin-top: 16px;
    font-size: 12px;
    color: rgba(255,255,255,0.2);
    animation: lp-fade-up 0.5s 0.4s ease both;
  }

  /* ── STATS BAND ── */
  .lp-stats {
  border-top: 1px solid rgba(255,255,255,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  padding: 40px 40px;
}
.lp-stats-inner {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
}
.lp-stat-item {
  text-align: center;
  padding: 12px 24px;
  border-right: 1px solid rgba(255,255,255,0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.lp-stat-item:last-child { border-right: none; }
.lp-stat-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #22c55e;
  margin-bottom: 8px;
  opacity: 0.7;
}
.lp-stat-num {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.2px;
  color: #fff;
  line-height: 1.1;
}
.lp-stat-label {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255,255,255,0.35);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

  /* ── SECTION SHARED ── */
  .lp-section {
    padding: 96px 24px;
    max-width: 1080px;
    margin: 0 auto;
  }
  .lp-section-eyebrow {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #22c55e;
    margin-bottom: 14px;
  }
  .lp-section-h2 {
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 800;
    letter-spacing: -1px;
    line-height: 1.1;
    color: #fff;
    max-width: 560px;
  }
  .lp-section-sub {
    margin-top: 16px;
    font-size: 16px;
    line-height: 1.65;
    color: rgba(255,255,255,0.4);
    max-width: 500px;
  }

  /* ── FEATURES ── */
  .lp-features-grid {
    margin-top: 56px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .lp-feature-card {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 14px;
    padding: 28px 24px;
    transition: border-color 0.2s, background 0.2s;
    position: relative;
    overflow: hidden;
  }
  .lp-feature-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .lp-feature-card:hover {
    border-color: rgba(34,197,94,0.2);
    background: rgba(34,197,94,0.03);
  }
  .lp-feature-card:hover::before { opacity: 1; }
  .lp-feature-icon {
    width: 40px; height: 40px;
    border-radius: 10px;
    background: rgba(34,197,94,0.1);
    border: 1px solid rgba(34,197,94,0.2);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 18px;
    flex-shrink: 0;
  }
  .lp-feature-icon svg {
    width: 18px; height: 18px;
    fill: none; stroke: #22c55e;
    stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round;
  }
  .lp-feature-title {
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.2px;
    margin-bottom: 8px;
  }
  .lp-feature-desc {
    font-size: 13.5px;
    line-height: 1.6;
    color: rgba(255,255,255,0.4);
  }

  /* ── HOW IT WORKS ── */
  .lp-how {
    padding: 0 24px 96px;
  }
  .lp-how-inner {
    max-width: 1080px;
    margin: 0 auto;
  }
  .lp-how-steps {
    margin-top: 56px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    position: relative;
  }
  .lp-how-steps::before {
    content: '';
    position: absolute;
    top: 20px;
    left: calc(100% / 6);
    right: calc(100% / 6);
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(34,197,94,0.3), rgba(34,197,94,0.3), transparent);
  }
  .lp-how-step {
    padding: 0 32px;
    text-align: center;
  }
  .lp-how-step-num {
    width: 40px; height: 40px;
    border-radius: 50%;
    background: #060a0f;
    border: 1px solid rgba(34,197,94,0.4);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px;
    font-weight: 700;
    color: #22c55e;
    margin: 0 auto 20px;
    position: relative;
    z-index: 1;
  }
  .lp-how-step-title {
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 10px;
  }
  .lp-how-step-desc {
    font-size: 13.5px;
    line-height: 1.6;
    color: rgba(255,255,255,0.38);
  }

  /* ── CTA SECTION ── */
  .lp-cta-wrap {
    padding: 0 24px 96px;
  }
  .lp-cta {
    max-width: 1080px;
    margin: 0 auto;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(34,197,94,0.03) 50%, rgba(6,10,15,0) 100%);
    border: 1px solid rgba(34,197,94,0.18);
    padding: 72px 48px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .lp-cta::before {
    content: '';
    position: absolute;
    top: -80px; left: 50%;
    transform: translateX(-50%);
    width: 400px; height: 200px;
    background: radial-gradient(ellipse, rgba(34,197,94,0.15) 0%, transparent 70%);
    pointer-events: none;
  }
  .lp-cta-pitch {
    position: absolute;
    inset: 0;
    display: flex; align-items: center; justify-content: center;
    pointer-events: none;
  }
  .lp-cta-pitch svg {
    width: 100%; height: 100%;
    opacity: 0.04;
  }
  .lp-cta-h2 {
    font-size: clamp(28px, 4vw, 48px);
    font-weight: 800;
    letter-spacing: -1.5px;
    line-height: 1.05;
    color: #fff;
    max-width: 580px;
    margin: 0 auto;
    position: relative;
  }
  .lp-cta-sub {
    margin-top: 18px;
    font-size: 16px;
    color: rgba(255,255,255,0.4);
    max-width: 420px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
    position: relative;
  }
  .lp-cta-actions {
    margin-top: 36px;
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
  }
  .lp-cta-btn-primary {
    padding: 14px 32px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 700;
    color: #000;
    background: #22c55e;
    text-decoration: none;
    transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
  }
  .lp-cta-btn-primary:hover {
    background: #16a34a;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(34,197,94,0.3);
  }
  .lp-cta-btn-secondary {
    padding: 14px 32px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    color: rgba(255,255,255,0.65);
    border: 1px solid rgba(255,255,255,0.12);
    text-decoration: none;
    transition: color 0.15s, border-color 0.15s;
  }
  .lp-cta-btn-secondary:hover {
    color: #fff;
    border-color: rgba(255,255,255,0.28);
  }

  /* ── FOOTER ── */
  .lp-footer {
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 28px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .lp-footer-left {
    font-size: 13px;
    color: rgba(255,255,255,0.2);
  }
  .lp-footer-right {
    display: flex;
    gap: 24px;
  }
  .lp-footer-link {
    font-size: 13px;
    color: rgba(255,255,255,0.2);
    text-decoration: none;
    transition: color 0.15s;
  }
  .lp-footer-link:hover { color: rgba(255,255,255,0.6); }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .lp-nav { padding: 16px 20px; }
    .lp-nav-links { gap: 6px; }
    .lp-btn-ghost { padding: 7px 12px; font-size: 13px; }
    .lp-btn-primary { padding: 7px 14px; font-size: 13px; }
    .lp-stats { padding: 28px 20px; }
    .lp-stats-inner { grid-template-columns: repeat(2, 1fr); gap: 24px; }
    .lp-stat-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); padding-bottom: 24px; }
    .lp-stat-item:nth-child(2n) { border-right: none; }
    .lp-stat-item:last-child { border-bottom: none; }
    .lp-features-grid { grid-template-columns: 1fr; }
    .lp-how-steps { grid-template-columns: 1fr; gap: 36px; }
    .lp-how-steps::before { display: none; }
    .lp-how-step { padding: 0; text-align: left; display: flex; gap: 16px; align-items: flex-start; }
    .lp-how-step-num { margin: 0; flex-shrink: 0; }
    .lp-cta { padding: 48px 24px; }
    .lp-footer { flex-direction: column; gap: 16px; text-align: center; }
    .lp-section { padding: 64px 20px; }
  }
`

const features = [
  {
    title: 'Player Profiling',
    desc: 'Deep attribute breakdowns across 100+ data points. Assess pace, technique, pressing intensity, and positional intelligence in one view.',
    icon: (
      <svg viewBox="0 0 18 18">
        <circle cx="9" cy="6" r="3"/>
        <path d="M3 16c0-3.314 2.686-6 6-6s6 2.686 6 6"/>
      </svg>
    ),
  },
  {
    title: 'Comparative Analysis',
    desc: 'Stack any two players side by side with radar charts and ranked percentiles across your entire database.',
    icon: (
      <svg viewBox="0 0 18 18">
        <polyline points="2,14 6,8 10,11 16,4"/>
        <path d="M14 4h2v2"/>
      </svg>
    ),
  },
  {
    title: 'Similarity Engine',
    desc: 'Find players who mirror your target profile. Filter by age, league, market value, and playing style to surface hidden talent.',
    icon: (
      <svg viewBox="0 0 18 18">
        <circle cx="7" cy="7" r="4"/>
        <line x1="10.5" y1="10.5" x2="16" y2="16"/>
      </svg>
    ),
  },
  {
    title: 'Transfer Fit Score',
    desc: 'Evaluate how well a prospect fits your tactical system — pressing triggers, defensive shape, buildup role — before you commit.',
    icon: (
      <svg viewBox="0 0 18 18">
        <path d="M3 9l4 4 8-8"/>
        <circle cx="9" cy="9" r="8"/>
      </svg>
    ),
  },
  {
    title: 'Shortlist Management',
    desc: 'Build, organise, and annotate recruitment shortlists. Tag players by role, priority, and contract window.',
    icon: (
      <svg viewBox="0 0 18 18">
        <rect x="2" y="3" width="14" height="13" rx="2"/>
        <line x1="5" y1="7" x2="13" y2="7"/>
        <line x1="5" y1="10" x2="10" y2="10"/>
      </svg>
    ),
  },
  {
    title: 'League Intelligence',
    desc: 'Monitor talent across 7 top divisions. Surface emerging players before they hit the open market.',
    icon: (
      <svg viewBox="0 0 18 18">
        <circle cx="9" cy="9" r="7"/>
        <line x1="2" y1="9" x2="16" y2="9"/>
        <path d="M9 2c-2.5 2-4 4.5-4 7s1.5 5 4 7"/>
        <path d="M9 2c2.5 2 4 4.5 4 7s-1.5 5-4 7"/>
      </svg>
    ),
  },
]

function PitchSVG() {
  return (
    <svg viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="800" height="520" fill="none"/>
      {/* Outer boundary */}
      <rect x="24" y="24" width="752" height="472" rx="3"
        fill="none" stroke="rgba(34,197,94,1)" strokeWidth="1.5"/>
      {/* Halfway line */}
      <line x1="400" y1="24" x2="400" y2="496"
        stroke="rgba(34,197,94,1)" strokeWidth="1.5"/>
      {/* Centre circle */}
      <circle cx="400" cy="260" r="80"
        fill="none" stroke="rgba(34,197,94,1)" strokeWidth="1.5"/>
      <circle cx="400" cy="260" r="4" fill="rgba(34,197,94,1)"/>
      {/* Left penalty area */}
      <rect x="24" y="170" width="130" height="180"
        fill="none" stroke="rgba(34,197,94,1)" strokeWidth="1.5"/>
      {/* Left six-yard box */}
      <rect x="24" y="218" width="50" height="84"
        fill="none" stroke="rgba(34,197,94,1)" strokeWidth="1.5"/>
      {/* Left penalty spot */}
      <circle cx="98" cy="260" r="3" fill="rgba(34,197,94,1)"/>
      {/* Left arc */}
      <path d="M154 218 A80 80 0 0 1 154 302"
        fill="none" stroke="rgba(34,197,94,1)" strokeWidth="1.5"/>
      {/* Right penalty area */}
      <rect x="646" y="170" width="130" height="180"
        fill="none" stroke="rgba(34,197,94,1)" strokeWidth="1.5"/>
      {/* Right six-yard box */}
      <rect x="726" y="218" width="50" height="84"
        fill="none" stroke="rgba(34,197,94,1)" strokeWidth="1.5"/>
      {/* Right penalty spot */}
      <circle cx="702" cy="260" r="3" fill="rgba(34,197,94,1)"/>
      {/* Right arc */}
      <path d="M646 218 A80 80 0 0 0 646 302"
        fill="none" stroke="rgba(34,197,94,1)" strokeWidth="1.5"/>
      {/* Corner arcs */}
      <path d="M24 40 A16 16 0 0 1 40 24" fill="none" stroke="rgba(34,197,94,1)" strokeWidth="1.5"/>
      <path d="M760 24 A16 16 0 0 1 776 40" fill="none" stroke="rgba(34,197,94,1)" strokeWidth="1.5"/>
      <path d="M24 480 A16 16 0 0 0 40 496" fill="none" stroke="rgba(34,197,94,1)" strokeWidth="1.5"/>
      <path d="M776 480 A16 16 0 0 1 760 496" fill="none" stroke="rgba(34,197,94,1)" strokeWidth="1.5"/>
    </svg>
  )
}

function AppSidebarIcon() {
  return (
    <svg viewBox="0 0 14 14">
      <rect x="1" y="3" width="12" height="8" rx="1"/>
      <line x1="7" y1="3" x2="7" y2="11"/>
      <circle cx="7" cy="7" r="1.8"/>
    </svg>
  )
}

function LandingPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div className="lp-root">

        {/* NAV */}
        <nav className="lp-nav">
          <Link to="/" className="lp-nav-logo">
            <div className="lp-nav-mark">
              <AppSidebarIcon />
            </div>
            <span className="lp-nav-wordmark">FootballIQ</span>
          </Link>
          <div className="lp-nav-links">
            <Link to="/login" className="lp-btn-ghost">Sign in</Link>
            <Link to="/signup" className="lp-btn-primary">Get started</Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="lp-hero">
          <div className="lp-hero-pitch">
            <PitchSVG />
          </div>
          <div className="lp-hero-glow" />

          <div className="lp-hero-badge">
            <span className="lp-hero-badge-dot" />
            AI Scouting Suite
          </div>

          <h1 className="lp-hero-h1">
            The Edge That Wins<br />
            <em>Transfer Windows</em>
          </h1>

          <p className="lp-hero-sub">
            Profile players, compare talent across 7 leagues, build shortlists, and evaluate transfer fit — all in one scouting platform built for the modern game.
          </p>

          <div className="lp-hero-actions">
            <Link to="/signup" className="lp-hero-cta-primary">
              Start scouting free →
            </Link>
            <Link to="/login" className="lp-hero-cta-secondary">
              Sign in
            </Link>
          </div>

          <p className="lp-hero-hint">No credit card required · Free tier available</p>
        </section>

        {/* STATS BAND */}
        <div className="lp-stats">
            <div className="lp-stats-inner">
                {[
                    { num: 'AI Assisted', label: 'Player Analysis' },
                    { num: '7',           label: 'Top Leagues' },
                    { num: 'Real Time',   label: 'Scouting Workspace' },
                    { num: 'Secure',      label: 'Cloud Profiles' },
                ].map(s => (
                <div key={s.label} className="lp-stat-item">
                    <div className="lp-stat-dot" />
                    <div className="lp-stat-num">{s.num}</div>
                    <div className="lp-stat-label">{s.label}</div>
                </div>
                ))}
            </div>
        </div>
        {/* FEATURES */}
        <section className="lp-section">
          <div className="lp-section-eyebrow">Platform Features</div>
          <h2 className="lp-section-h2">Everything a modern scout needs</h2>
          <p className="lp-section-sub">
            From first look to final decision — FootballIQ gives you the tools to scout with precision, not guesswork.
          </p>

          <div className="lp-features-grid">
            {features.map(f => (
              <div key={f.title} className="lp-feature-card">
                <div className="lp-feature-icon">{f.icon}</div>
                <div className="lp-feature-title">{f.title}</div>
                <div className="lp-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <div className="lp-how">
          <div className="lp-how-inner">
            <div className="lp-section-eyebrow">How It Works</div>
            <h2 className="lp-section-h2">From prospect to shortlist in minutes</h2>

            <div className="lp-how-steps">
              {[
                {
                  n: '01',
                  title: 'Browse the database',
                  desc: 'Filter players by position, league, age, or attribute thresholds across 7 divisions.',
                },
                {
                  n: '02',
                  title: 'Analyse & compare',
                  desc: 'Deep-dive into profiles, run head-to-head comparisons, and find similar players automatically.',
                },
                {
                  n: '03',
                  title: 'Build your shortlist',
                  desc: 'Save targets, add scout notes, and evaluate transfer fit against your tactical needs.',
                },
              ].map(s => (
                <div key={s.n} className="lp-how-step">
                  <div className="lp-how-step-num">{s.n}</div>
                  <div>
                    <div className="lp-how-step-title">{s.title}</div>
                    <div className="lp-how-step-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="lp-cta-wrap">
          <div className="lp-cta">
            <div className="lp-cta-pitch">
              <PitchSVG />
            </div>

            <h2 className="lp-cta-h2">Ready to scout smarter?</h2>
            <p className="lp-cta-sub">
              Join clubs already using FootballIQ to find the players others miss.
            </p>

            <div className="lp-cta-actions">
              <Link to="/signup" className="lp-cta-btn-primary">
                Create free account
              </Link>
              <Link to="/login" className="lp-cta-btn-secondary">
                I already have an account
              </Link>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="lp-footer">
          <span className="lp-footer-left">© 2025 FootballIQ · Tactical Intelligence</span>
          <div className="lp-footer-right">
            <Link to="/login" className="lp-footer-link">Sign in</Link>
            <Link to="/signup" className="lp-footer-link">Sign up</Link>
          </div>
        </footer>

      </div>
    </>
  )
}

export default LandingPage