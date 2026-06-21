import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'
import AttributeRadar from '../components/dashboard/AttributeRadar'
import SimilarPlayersPanel from '../components/dashboard/SimilarPlayersPanel'
import { getPlayers } from '../services/playerService'
import type { Player } from '../types/player'
import { generateScoutReport,
         generateSummary,
         getDevelopmentAreas,
} from '../utils/generateScoutReport'
import { getSimilarPlayers } from '../utils/getSimilarPlayers'
import { useState } from 'react'
import PlayerComparisonCard from '../components/dashboard/PlayerComparisonCard'
import { useEffect } from 'react'
import {
  addToShortlist,
  removeFromShortlist,
  isShortlisted,
} from '../utils/shortlistStorage'
import type { ScoutNote } from '../services/scoutNotesService'
import {
  getNotesForPlayer,
  addNote,
  deleteNote,
  updateNote,
} from '../services/scoutNotesService'

// --- Presentational helpers (display-only, no business logic) -------------

const PITCH_COORDS: Record<string, { x: number; y: number }> = {
  GK: { x: 50, y: 92 },
  CB: { x: 50, y: 74 },
  LCB: { x: 36, y: 74 },
  RCB: { x: 64, y: 74 },
  LB: { x: 14, y: 70 },
  RB: { x: 86, y: 70 },
  LWB: { x: 14, y: 58 },
  RWB: { x: 86, y: 58 },
  CDM: { x: 50, y: 58 },
  CM: { x: 50, y: 46 },
  LCM: { x: 36, y: 46 },
  RCM: { x: 64, y: 46 },
  CAM: { x: 50, y: 32 },
  LM: { x: 14, y: 44 },
  RM: { x: 86, y: 44 },
  LW: { x: 16, y: 22 },
  RW: { x: 84, y: 22 },
  CF: { x: 50, y: 14 },
  ST: { x: 50, y: 12 },
  LST: { x: 38, y: 14 },
  RST: { x: 62, y: 14 },
}

function getPitchCoords(position: string) {
  const key = position.trim().toUpperCase()
  return PITCH_COORDS[key] ?? { x: 50, y: 50 }
}

function getRatingTier(value: number) {
  if (value >= 85) return { color: 'var(--pp-mint)', label: 'Elite' }
  if (value >= 75) return { color: '#d4b95f', label: 'Strong' }
  if (value >= 60) return { color: '#c97b4a', label: 'Developing' }
  return { color: '#7a7d85', label: 'Raw' }
}

function fileTag(num: string, label: string) {
  return `FILE ${num} — ${label.toUpperCase()}`
}

// ---------------------------------------------------------------------------


function PlayerPage() {
  const { id } = useParams()

  const navigate = useNavigate()

  const [players, setPlayers] =
    useState<Player[]>([])
    
  const [loading, setLoading] =
    useState(true)

  const [comparisonPlayerId, setComparisonPlayerId] =
    useState<number>(0)

  const [notes, setNotes] =
    useState<ScoutNote[]>([])
  
  const [newNote, setNewNote] =
    useState('')

  const [editingNoteId, setEditingNoteId] =
    useState<number | null>(null)
    
  const [editingText, setEditingText] =
    useState('')

  const player = players.find(
    (p) => p.id === Number(id)
  )

  const [showNotes, setShowNotes] =
   useState(false)
    
  const [
    shortlisted,
    setShortlisted,
  ] = useState(false)

    useEffect(() => {
      async function loadPlayers() {
        try {
          const data =
            await getPlayers()
            
          setPlayers(data)
        } catch (error) {
          console.error(error)
        } finally {
          setLoading(false)
        }
      }
      loadPlayers()
    }, [])

    useEffect(() => {
      async function checkShortlist() {
        const currentPlayer =
          players.find(
            (p) => p.id === Number(id)
          )
        if (!currentPlayer) return
        const result =
          await isShortlisted(
            currentPlayer.id
          )
        setShortlisted(result)
      }
      checkShortlist()
    }, [players, id])

  useEffect(() => {
    async function loadNotes() {
      if (!player) return
      try {
        const data =
          await getNotesForPlayer(
            player.id
          )
        setNotes(data)
      } catch (error) {
        console.error(error)
      } 
    }
    loadNotes()
  }, [player])

    if (loading) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#08090b] text-white">
          <div className="flex flex-col items-center gap-3">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-gray-800 border-t-green-400" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-600">Pulling file…</p>
          </div>
        </div>
      )
    }

  const currentIndex = players.findIndex(
    (p) => p.id === Number(id)
  )

  const previousPlayer =
    currentIndex > 0
      ? players[currentIndex - 1]
      : null

  const nextPlayer =
    currentIndex < players.length - 1
      ? players[currentIndex + 1]
      : null

  if (!player) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08090b] text-white">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-600">404 / No record</p>
          <p className="mt-2 text-lg font-semibold text-gray-200">Player not found</p>
          <Link
            to="/dashboard"
            className="mt-5 inline-block rounded-lg border border-gray-800 bg-gray-950 px-4 py-2 text-sm text-gray-300 transition hover:border-green-500/60 hover:text-green-400"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }
  
  const generatedInsights =
    generateScoutReport(player)

  const summary =
    generateSummary(player)

  const developmentAreas =
    getDevelopmentAreas(player)

  const similarPlayers =
    getSimilarPlayers(
      player,
      players
    )

    if (
      comparisonPlayerId === 0 &&
      players.length > 1
    ) {
      setComparisonPlayerId(
        players.find(
          (p) => p.id !== player.id
        )?.id || player.id
      )
    }

  const comparisonPlayer =
    players.find(
      (p) => p.id === comparisonPlayerId
    ) || player

  // Display-only derivations
  const ratingValue = Number(player.rating) || 0
  const ratingPct = Math.max(0, Math.min(100, ratingValue))
  const ratingTier = getRatingTier(ratingPct)
  const dialRadius = 40
  const dialCircumference = 2 * Math.PI * dialRadius
  const dialOffset = dialCircumference - (ratingPct / 100) * dialCircumference
  const pitchDot = getPitchCoords(player.position)

  return (
    <div className="pp-root min-h-screen bg-[#08090b] pb-20 text-[#e7e9ec]">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .pp-root {
              --pp-void: #08090b;
              --pp-panel: #0e1013;
              --pp-line: #1d2026;
              --pp-mint: #22c55e;
              --pp-mint-soft: #34d399;
              --pp-mono: ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace;
            }
            .pp-mono { font-family: var(--pp-mono); }
            .pp-dossier {
              background-image:
                radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);
              background-size: 14px 14px;
            }
            .pp-dial-ring {
              transition: stroke-dashoffset 1.1s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .pp-pulse {
              animation: pp-pulse-anim 2.4s ease-in-out infinite;
            }
            @keyframes pp-pulse-anim {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.55; transform: scale(1.6); }
            }
            .pp-stamp {
              border: 1px solid rgba(34,197,94,0.35);
              color: var(--pp-mint);
              transform: rotate(-3deg);
            }
            .pp-dashed {
              border-top: 1px dashed var(--pp-line);
            }
          `,
        }}
      />

      <div className="mx-auto max-w-7xl space-y-10 px-6 pt-8 sm:px-10">

        {/* TOP NAVIGATION */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/dashboard"
            className="group inline-flex items-center gap-2 pp-mono text-xs uppercase tracking-[0.15em] text-gray-500 transition hover:text-green-400"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="transition group-hover:-translate-x-0.5">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Dashboard
          </Link>

          <div className="flex items-center gap-1 pp-mono text-xs uppercase tracking-[0.15em] text-gray-500">
            {previousPlayer && (
              <button
                onClick={() =>
                  navigate(
                    `/player/${previousPlayer.id}`
                  )
                }
                className="group inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 transition hover:text-green-400"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="transition group-hover:-translate-x-0.5">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {previousPlayer.name}
              </button>
            )}
            <span className="text-gray-800">/</span>
            {nextPlayer && (
              <button
                onClick={() =>
                  navigate(
                    `/player/${nextPlayer.id}`
                  )
                }
                className="group inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 transition hover:text-green-400"
              >
                {nextPlayer.name}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="transition group-hover:translate-x-0.5">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* DOSSIER HERO */}
        <div className="pp-dossier relative overflow-hidden rounded-2xl border border-[#1d2026] bg-[#0e1013]">
          <div className="flex flex-col gap-8 p-7 sm:p-9 lg:flex-row lg:items-stretch lg:gap-10">

            {/* PITCH POSITION MAP */}
            <div className="flex shrink-0 flex-col items-center">
              <p className="pp-mono mb-3 self-start text-[10px] uppercase tracking-[0.2em] text-gray-600">
                Position Map
              </p>
              <svg width="108" height="148" viewBox="0 0 100 130" className="overflow-visible">
                <rect x="2" y="2" width="96" height="126" rx="4" stroke="#272b33" strokeWidth="1.2" fill="none" />
                <line x1="2" y1="65" x2="98" y2="65" stroke="#272b33" strokeWidth="1" />
                <circle cx="50" cy="65" r="11" stroke="#272b33" strokeWidth="1" fill="none" />
                <rect x="22" y="2" width="56" height="20" stroke="#272b33" strokeWidth="1" fill="none" />
                <rect x="22" y="108" width="56" height="20" stroke="#272b33" strokeWidth="1" fill="none" />
                <circle cx={pitchDot.x} cy={(pitchDot.y / 100) * 130} r="3.4" fill="#22c55e" className="pp-pulse" style={{ transformOrigin: `${pitchDot.x}px ${(pitchDot.y / 100) * 130}px` }} />
                <circle cx={pitchDot.x} cy={(pitchDot.y / 100) * 130} r="3.4" fill="#22c55e" />
              </svg>
              <p className="pp-mono mt-3 text-sm font-semibold text-green-400">{player.position}</p>
            </div>

            {/* CORE IDENTITY */}
            <div className="flex-1 border-[#1d2026] lg:border-x lg:px-10">
              <div className="flex items-center gap-2 pp-mono text-[10px] uppercase tracking-[0.2em] text-gray-600">
                <span className="h-1 w-1 rounded-full bg-green-500" />
                Scouting Dossier · No. {player.id}
              </div>

              <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                {player.name}
              </h1>

              <p className="mt-2 text-base text-gray-400">
                {player.club} <span className="mx-2 text-gray-700">·</span> {player.age} years
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                  {player.archetype}
                </span>
                <span className="rounded-full border border-gray-700 bg-gray-900 px-3 py-1 text-xs font-medium text-gray-300">
                  {player.tacticalRole}
                </span>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    if (shortlisted) {
                      removeFromShortlist(
                        player.id
                      )
                      setShortlisted(false)
                    } else {
                      addToShortlist(
                        player
                      )
                      setShortlisted(true)
                    }
                  }}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    shortlisted
                      ? 'bg-green-500 text-black hover:bg-green-400'
                      : 'border border-gray-700 bg-transparent text-white hover:border-green-500/60 hover:text-green-400'
                    }`}
                  >
                    {shortlisted ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12.5L9.5 17L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                      </svg>
                    )}
                    {shortlisted ? 'Shortlisted' : 'Add to Shortlist'}
                </button>
                <button
                  onClick={() =>
                    setShowNotes(
                      !showNotes
                    )
                  }
                  className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                    showNotes
                      ? 'border-green-500/60 text-green-400'
                      : 'border-gray-700 text-white hover:border-green-500/60'
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h12l4 4v12H4V4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  Field Notes
                  {notes.length > 0 && (
                    <span className="pp-mono rounded-full bg-green-500/15 px-1.5 text-[11px] text-green-400">
                      {notes.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* RATING DIAL + VALUE */}
            <div className="flex shrink-0 flex-row items-center gap-8 lg:flex-col lg:items-end lg:justify-between">
              <div className="flex flex-col items-center">
                <svg width="104" height="104" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r={dialRadius} stroke="#1d2026" strokeWidth="6" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r={dialRadius}
                    stroke={ratingTier.color}
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={dialCircumference}
                    strokeDashoffset={dialOffset}
                    transform="rotate(-90 50 50)"
                    className="pp-dial-ring"
                  />
                  <text x="50" y="46" textAnchor="middle" className="pp-mono" fontSize="22" fontWeight="700" fill="#ffffff">
                    {player.rating}
                  </text>
                  <text x="50" y="62" textAnchor="middle" className="pp-mono" fontSize="7" letterSpacing="1.5" fill="#6b7280">
                    RATING
                  </text>
                </svg>
                <span className="pp-mono mt-1 text-[10px] uppercase tracking-[0.2em]" style={{ color: ratingTier.color }}>
                  {ratingTier.label}
                </span>
              </div>

              <div className="pp-stamp rounded px-3 py-2 text-right">
                <p className="pp-mono text-[9px] uppercase tracking-[0.2em] opacity-70">Market Value</p>
                <p className="pp-mono text-lg font-bold">{player.marketValue}</p>
              </div>
            </div>
          </div>

          {/* FIELD NOTES (expandable) */}
          {showNotes && (
            <div className="pp-dashed border-t px-7 py-7 sm:px-9">
              <div className="flex items-center justify-between">
                <p className="pp-mono text-xs uppercase tracking-[0.2em] text-gray-500">Field Notes</p>
                <p className="pp-mono text-xs text-gray-600">{notes.length} {notes.length === 1 ? 'entry' : 'entries'}</p>
              </div>

              <textarea
                value={newNote}
                onChange={(e) =>
                  setNewNote(
                    e.target.value
                  )
                }
                placeholder="Log a scouting observation…"
                className="mt-4 min-h-[100px] w-full resize-y rounded-lg border border-[#1d2026] bg-[#08090b] p-3.5 text-sm text-white placeholder:text-gray-600 focus:border-green-500/50 focus:outline-none"
              />
              <div className="mt-3 flex justify-end">
                <button
                  onClick={async () => {
                    if (!newNote.trim())
                      return
                    try {
                      await addNote(
                        player.id,
                        newNote
                      )
                      const updatedNotes =
                        await getNotesForPlayer(
                          player.id
                        )
                      setNotes(
                        updatedNotes
                      )
                      setNewNote('')
                    } catch (error) {
                      console.error(error)
                    }
                  }}
                  className="rounded-lg bg-green-500 px-5 py-2 text-sm font-semibold text-black transition hover:bg-green-400"
                >
                  Log Note
                </button>
              </div>

              <div className="mt-6 divide-y divide-[#1d2026]">
                {notes.length === 0 && (
                  <p className="py-4 text-center text-sm text-gray-600">No notes logged for this player yet.</p>
                )}
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="flex items-start justify-between gap-4 py-3.5 first:pt-0"
                  >
                    <div>
                      {editingNoteId === note.id ? (
                        <div className="space-y-3">
                          <textarea
                            value={editingText}
                            onChange={(e) =>
                              setEditingText(
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg border border-[#1d2026] bg-[#08090b] p-3 text-sm text-white"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={async () => {
                                try {
                                  await updateNote(
                                    note.id,
                                    editingText
                                  )
                                  const updatedNotes =
                                    await getNotesForPlayer(
                                      player.id
                                    )
                                  setNotes(
                                    updatedNotes
                                  )
                                  setEditingNoteId(
                                    null
                                  )
                                } catch (error) {
                                  console.error(error)
                                }
                              }}
                              className="rounded bg-green-500 px-3 py-1 text-xs font-semibold text-black"
                            >
                              Save
                            </button>
                            <button
                              onClick={() =>
                                setEditingNoteId(
                                  null
                                )
                              }
                              className="rounded border border-gray-700 px-3 py-1 text-xs"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm leading-6 text-gray-200">
                          {note.note}
                        </p>
                      )}
                      <p className="pp-mono mt-1.5 text-[11px] text-gray-600">
                        {new Date(
                          note.created_at
                        ).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setEditingNoteId(
                            note.id
                          )
                          setEditingText(
                            note.note
                          )
                        }}
                        className="shrink-0 text-xs font-medium text-green-400/70 transition hover:text-green-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            await deleteNote(
                              note.id
                            )
                            const updatedNotes =
                              await getNotesForPlayer(
                                player.id
                              )
                            setNotes(
                              updatedNotes
                            )
                          } catch (error) {
                            console.error(error)
                          }
                        }}
                        className="shrink-0 text-xs font-medium text-red-400/70 transition hover:text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                    </div>
                  ))}
                </div>
            </div>
          )}
        </div>

        {/* AI SCOUT INSIGHTS */}
        <div>
          <div className="flex items-center justify-between border-b border-[#1d2026] pb-3">
            <p className="pp-mono text-xs uppercase tracking-[0.2em] text-gray-500">
              {fileTag('01', 'AI Scout Insights')}
            </p>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-[#1d2026]">
            <div className="grid divide-y divide-[#1d2026] sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
              <div className="p-4">
                <p className="pp-mono text-[10px] uppercase tracking-[0.2em] text-gray-600">Tactical Role</p>
                <p className="mt-2 font-semibold text-green-400">{player.tacticalRole}</p>
              </div>
              <div className="p-4">
                <p className="pp-mono text-[10px] uppercase tracking-[0.2em] text-gray-600">Archetype</p>
                <p className="mt-2 font-semibold text-green-400">{player.archetype}</p>
              </div>
              <div className="p-4">
                <p className="pp-mono text-[10px] uppercase tracking-[0.2em] text-gray-600">Key Strengths</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">{player.strengths.join(', ')}</p>
              </div>
              <div className="p-4">
                <p className="pp-mono text-[10px] uppercase tracking-[0.2em] text-gray-600">Development Areas</p>
                <p className="mt-2 text-sm leading-6 text-gray-300">{developmentAreas.join(', ')}</p>
              </div>
            </div>
          </div>

          <p className="mt-6 max-w-3xl leading-8 text-gray-300">
            {summary}
          </p>

          <div className="mt-5 space-y-0 divide-y divide-[#1d2026] border-t border-[#1d2026]">
            {generatedInsights.map(
              (insight, index) => (
                <div
                  key={index}
                  className="flex gap-4 py-4"
                >
                  <span className="pp-mono mt-0.5 shrink-0 text-xs text-green-500/70">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="leading-7 text-gray-300">
                    {insight}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* SIMILAR PLAYERS */}
        <div>
          <div className="flex items-center justify-between border-b border-[#1d2026] pb-3">
            <p className="pp-mono text-xs uppercase tracking-[0.2em] text-gray-500">
              {fileTag('02', 'Similar Players')}
            </p>
          </div>
          <div className="mt-6">
            <SimilarPlayersPanel
              similarPlayers={similarPlayers}
            />
          </div>
        </div>

        {/* COMPARE PLAYER */}
        <div>
          <div className="flex items-center justify-between border-b border-[#1d2026] pb-3">
            <p className="pp-mono text-xs uppercase tracking-[0.2em] text-gray-500">
              {fileTag('03', 'Head-to-Head')}
            </p>
          </div>

          <div className="mt-6 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <div className="pp-mono rounded-lg border border-[#1d2026] bg-[#0e1013] px-4 py-2.5 text-sm font-semibold text-white">
              {player.name}
            </div>
            <span className="pp-mono text-center text-xs text-gray-600 sm:px-1">VS</span>
            <div className="relative flex-1">
              <select
                value={comparisonPlayerId}
                onChange={(e) =>
                  setComparisonPlayerId(
                    Number(e.target.value)
                  )
                }
                className="w-full appearance-none rounded-lg border border-[#1d2026] bg-[#0e1013] p-2.5 pr-10 text-sm text-white focus:border-green-500/50 focus:outline-none"
                >
                  {players
                    .filter((p) => p.id !== player.id)
                    .map((p) => (
                      <option
                        key={p.id}
                        value={p.id}
                      > 
                        {p.name}
                      </option>
                    ))}
                </select>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="mt-6">
              <PlayerComparisonCard
                playerA={player}
                playerB={comparisonPlayer}
              />
            </div>
        </div>

        {/* ATTRIBUTE RADAR */}
        <div>
          <div className="flex items-center justify-between border-b border-[#1d2026] pb-3">
            <p className="pp-mono text-xs uppercase tracking-[0.2em] text-gray-500">
              {fileTag('04', 'Attribute Radar')}
            </p>
          </div>
          <div className="mt-6">
            <AttributeRadar player={player} />
          </div>
        </div>

        {/* SCOUTING REPORT */}
        <div>
          <div className="flex items-center justify-between border-b border-[#1d2026] pb-3">
            <p className="pp-mono text-xs uppercase tracking-[0.2em] text-gray-500">
              {fileTag('05', 'Scouting Report')}
            </p>
            <span className="pp-stamp rounded px-2 py-0.5 text-[9px] uppercase tracking-[0.2em]">
              Confidential
            </span>
          </div>
          <p className="mt-6 max-w-4xl border-l-2 border-green-500/40 pl-5 leading-8 text-gray-300">
            {player.scoutingReport}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PlayerPage