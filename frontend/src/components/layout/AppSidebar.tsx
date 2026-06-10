import { Link, useLocation } from 'react-router-dom'
import { getPlayers } from '../../services/playerService'
import { useEffect, useState } from 'react'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/players', label: 'Players' },
  { to: '/scouting', label: 'Scouting' },
  { to: '/shortlists', label: 'Shortlists' },
]

const style = `
  @keyframes fiq-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  @keyframes fiq-scan {
    0% { transform: translateY(-100%); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(600%); opacity: 0; }
  }
  @keyframes fiq-fadein {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fiq-sidebar {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 240px;
    background: #080d12;
    border-right: 1px solid rgba(255,255,255,0.06);
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }
  .fiq-sidebar::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 180px 260px at 50% 0%, rgba(52,211,153,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .fiq-brand {
    padding: 24px 20px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    animation: fiq-fadein 0.4s ease both;
    position: relative;
  }
  .fiq-logo-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .fiq-logo-mark {
    width: 28px;
    height: 28px;
    border-radius: 7px;
    background: linear-gradient(135deg, #34d399 0%, #059669 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .fiq-logo-mark svg {
    width: 14px;
    height: 14px;
    fill: none;
    stroke: #fff;
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .fiq-brand-name {
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.3px;
    color: #fff;
    line-height: 1;
  }
  .fiq-brand-sub {
    margin-top: 2px;
    font-size: 11px;
    letter-spacing: 0.10em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    line-height: 1;
  }
  .fiq-live-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #34d399;
    margin-left: auto;
    animation: fiq-pulse 2.2s ease-in-out infinite;
    flex-shrink: 0;
  }
  .fiq-nav-section {
    flex: 1;
    padding: 18px 12px 12px;
    overflow-y: auto;
    scrollbar-width: none;
  }
  .fiq-nav-section::-webkit-scrollbar { display: none; }
  .fiq-section-label {
    font-size: 11px;
    letter-spacing: 0.10em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.2);
    padding: 0 8px;
    margin-bottom: 6px;
  }
  .fiq-nav-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 10px;
    border-radius: 8px;
    font-size: 14.5px;
    font-weight: 500;
    color: rgba(255,255,255,0.4);
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
    position: relative;
    margin-bottom: 2px;
    letter-spacing: 0.01em;
  }
  .fiq-nav-link:hover {
    background: rgba(255,255,255,0.05);
    color: rgba(255,255,255,0.8);
  }
  .fiq-nav-link.active {
    background: rgba(52,211,153,0.1);
    color: #34d399;
  }
  .fiq-nav-link.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 16px;
    border-radius: 0 3px 3px 0;
    background: #34d399;
  }
  .fiq-nav-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.5;
    flex-shrink: 0;
  }
  .fiq-nav-link.active .fiq-nav-dot {
    opacity: 1;
    background: #34d399;
    box-shadow: 0 0 6px rgba(52,211,153,0.7);
  }
  .fiq-field-grid {
    margin: 0 12px 12px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.06);
    position: relative;
    background: rgba(255,255,255,0.02);
  }
  .fiq-field-svg {
    display: block;
    width: 100%;
    height: 64px;
    opacity: 0.55;
  }
  .fiq-scan-line {
    animation: fiq-scan 4s ease-in-out infinite;
  }
  .fiq-stats {
    padding: 12px 14px 14px;
    border-top: 1px solid rgba(255,255,255,0.05);
  }
  .fiq-stats-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .fiq-stat {
    flex: 1;
    padding: 4px 0 0;
  }
  .fiq-stat-label {
    font-size: 11px;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.2);
    margin-bottom: 3px;
  }
  .fiq-stat-value {
    font-size: 22px;
    font-weight: 700;
    color: #34d399;
    letter-spacing: -0.5px;
    line-height: 1;
  }
  .fiq-stat-divider {
    width: 1px;
    height: 32px;
    background: rgba(255,255,255,0.07);
    flex-shrink: 0;
  }
  .fiq-footer {
    padding: 12px 20px 18px;
    border-top: 1px solid rgba(255,255,255,0.04);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .fiq-footer-text {
    font-size: 11px;
    color: rgba(255,255,255,0.15);
    letter-spacing: 0.05em;
  }
  .fiq-badge {
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #34d399;
    background: rgba(52,211,153,0.1);
    border: 1px solid rgba(52,211,153,0.2);
    padding: 2px 7px;
    border-radius: 20px;
  }
`

function AppSidebar() {
  const location = useLocation()

  const [playerCount, setPlayerCount] =
    useState(0)
    
  useEffect(() => {
    async function loadPlayers() {
      try {
        const data = await getPlayers()
        setPlayerCount(data.length)
      } catch (error) {
        console.error(error)
      }
    }
    loadPlayers()
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <aside className="fiq-sidebar">

        {/* Brand */}
        <div className="fiq-brand">
          <div className="fiq-logo-row">
            <div className="fiq-logo-mark">
              <svg viewBox="0 0 14 14">
                <rect x="1" y="3" width="12" height="8" rx="1"/>
                <line x1="7" y1="3" x2="7" y2="11"/>
                <circle cx="7" cy="7" r="1.8"/>
              </svg>
            </div>
            <div>
              <div className="fiq-brand-name">FootballIQ</div>
              <div className="fiq-brand-sub">Tactical Intelligence</div>
            </div>
            <div className="fiq-live-dot" title="Live" />
          </div>
        </div>

        {/* Navigation */}
        <div className="fiq-nav-section">
          <div className="fiq-section-label">Workspace</div>

          {navItems.map(({ to, label }) => {
            const active = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`fiq-nav-link${active ? ' active' : ''}`}
              >
                <span className="fiq-nav-dot" />
                {label}
              </Link>
            )
          })}
        </div>

        {/* Mini pitch graphic + stats */}
        <div className="fiq-field-grid">
          <svg
            className="fiq-field-svg"
            viewBox="0 0 216 64"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect width="216" height="64" fill="none"/>
            <rect x="4" y="4" width="208" height="56" rx="2"
              fill="none" stroke="rgba(52,211,153,0.25)" strokeWidth="0.8"/>
            <line x1="108" y1="4" x2="108" y2="60"
              stroke="rgba(52,211,153,0.2)" strokeWidth="0.8"/>
            <circle cx="108" cy="32" r="14"
              fill="none" stroke="rgba(52,211,153,0.2)" strokeWidth="0.8"/>
            <circle cx="108" cy="32" r="1.5" fill="rgba(52,211,153,0.5)"/>
            <rect x="4" y="18" width="28" height="28"
              fill="none" stroke="rgba(52,211,153,0.18)" strokeWidth="0.8"/>
            <rect x="4" y="24" width="12" height="16"
              fill="none" stroke="rgba(52,211,153,0.12)" strokeWidth="0.8"/>
            <rect x="184" y="18" width="28" height="28"
              fill="none" stroke="rgba(52,211,153,0.18)" strokeWidth="0.8"/>
            <rect x="200" y="24" width="12" height="16"
              fill="none" stroke="rgba(52,211,153,0.12)" strokeWidth="0.8"/>
            <rect
              className="fiq-scan-line"
              x="4" y="4" width="208" height="2"
              fill="rgba(52,211,153,0.35)" rx="1"
            />
          </svg>

          <div className="fiq-stats">
            <div className="fiq-stats-row">
              <div className="fiq-stat">
                <div className="fiq-stat-label">Players</div>
                <div className="fiq-stat-value">{playerCount}</div>
              </div>
              <div className="fiq-stat-divider" />
              <div className="fiq-stat">
                <div className="fiq-stat-label">Leagues</div>
                <div className="fiq-stat-value">7</div>
              </div>
              <div className="fiq-stat-divider" />
              <div className="fiq-stat">
                <div className="fiq-stat-label">Tools</div>
                <div className="fiq-stat-value">4</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="fiq-footer">
          <span className="fiq-footer-text">FootballIQ v1.0</span>
          <span className="fiq-badge">Pro</span>
        </div>

      </aside>
    </>
  )
}

export default AppSidebar