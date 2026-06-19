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
} from '../services/scoutNotesService'


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
    
  const [notesLoading, setNotesLoading] =
    useState(true)

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
      } finally {
        setNotesLoading(false)
      }
    }
    loadNotes()
  }, [player])

    if (loading) {
      return (
        <div className="p-10 text-white">
          Loading player...
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
      <div className="p-10 text-white">
        Player not found
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

  

  return (
    <div className="space-y-8 p-10 text-white">
      {/* TOP NAVIGATION */}
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard"
          className="rounded-xl border border-gray-800 bg-gray-950 px-4 py-2 text-sm text-gray-300 transition hover:border-green-400 hover:text-green-400"
        >
          ← Back to Dashboard
        </Link>

        <div className="flex gap-3">
          {previousPlayer && (
            <button
              onClick={() =>
                navigate(
                  `/player/${previousPlayer.id}`
                )
              }
              className="rounded-xl border border-gray-800 bg-gray-950 px-4 py-2 text-sm text-gray-300 transition hover:border-green-400 hover:text-green-400"
            >
              ← {previousPlayer.name}
            </button>
          )}

          {nextPlayer && (
            <button
              onClick={() =>
                navigate(
                  `/player/${nextPlayer.id}`
                )
              }
              className="rounded-xl border border-gray-800 bg-gray-950 px-4 py-2 text-sm text-gray-300 transition hover:border-green-400 hover:text-green-400"
            >
              {nextPlayer.name} →
            </button>
          )}
        </div>
      </div>

      {/* PLAYER HEADER */}
      <div>
        <p className="text-sm uppercase tracking-widest text-green-400">
          Player Profile 
        </p>
        <div className="mt-2 flex items-center gap-4">
          <h1 className="text-5xl font-bold">
            {player.name}
          </h1>
          <div className="flex gap-2">
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
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                shortlisted
                  ? 'bg-green-500 text-black'
                  : 'border border-gray-700 bg-gray-900 text-white'
                }`}
              >
                {shortlisted
                  ? '✓ Shortlisted'
                  : '+ Add To Shortlist'}
            </button>
            <button
              onClick={() =>
                setShowNotes(
                  !showNotes
                )
              }
              className="rounded-xl border border-gray-700 bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:border-green-500"
            >
              📝 Notes
            </button>
          </div>
        </div>
        <p className="mt-2 text-xl text-gray-400">
          {player.club}
        </p>
        {showNotes && (
          <div className="mt-6 rounded-2xl border border-gray-800 bg-gray-950 p-5">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Scout Notes
            </h3>
            <textarea
              value={newNote}
              onChange={(e) =>
                setNewNote(
                  e.target.value
                )
              }
              placeholder="Write your scouting observations..."
              className="min-h-[120px] w-full rounded-xl border border-gray-800 bg-gray-900 p-3 text-white"
            />
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
              className="mt-3 rounded-xl bg-green-500 px-4 py-2 font-semibold text-black"
            >
              Save Note
            </button>
            <div className="mt-6 space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-xl border border-gray-800 bg-gray-900 p-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-white">
                      {note.note}
                    </p>
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
                        className="text-sm text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      {new Date(
                        note.created_at
                      ).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
          </div>
        )}
      </div>

      {/* PLAYER INFO GRID */}
      <div className="grid grid-cols-2 gap-6 xl:grid-cols-5">
        <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
          <p className="text-sm text-gray-500">
            Position
          </p>

          <p className="mt-2 text-lg font-semibold">
            {player.position}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
          <p className="text-sm text-gray-500">
            Age
          </p>

          <p className="mt-2 text-lg font-semibold">
            {player.age}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
          <p className="text-sm text-gray-500">
            Archetype
          </p>

          <p className="mt-2 text-lg font-semibold text-green-400">
            {player.archetype}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
          <p className="text-sm text-gray-500">
            Market Value
          </p>

          <p className="mt-2 text-lg font-semibold text-green-400">
            {player.marketValue}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
          <p className="text-sm text-gray-500">
            Rating
          </p>

          <p className="mt-2 text-lg font-semibold text-green-400">
            {player.rating}
          </p>
        </div>
      </div>

      {/* AI SCOUT INSIGHTS */}
      <div className="rounded-2xl border border-gray-800 bg-gray-950 p-8">
        <p className="text-sm uppercase tracking-widest text-gray-500">
          AI Scout Insights
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Tactical Role
            </p>
            <p className="mt-2 font-semibold text-green-400">
              {player.tacticalRole}
            </p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Archetype
            </p>
            <p className="mt-2 font-semibold text-green-400">
              {player.archetype}
            </p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Key Strengths
            </p>
            <p className="mt-2 text-sm text-gray-300">
              {player.strengths.join(', ')}
            </p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Development Areas
            </p>
            <p className="mt-2 text-sm text-gray-300">
              {developmentAreas.join(', ')}
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <p className="mb-6 leading-8 text-gray-300">
            {summary}
          </p>
          {generatedInsights.map(
            (insight, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-800 bg-gray-900 p-4"
              >
                <p className="leading-7 text-gray-300">
                  {insight}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* SIMILAR PLAYERS */}
      <SimilarPlayersPanel
        similarPlayers={similarPlayers}
      />

      <div className="rounded-2xl border border-gray-800 bg-gray-950 p-8">
        <p className="text-sm uppercase tracking-widest text-gray-500">
          Compare Player
        </p>
        <select
          value={comparisonPlayerId}
          onChange={(e) =>
            setComparisonPlayerId(
              Number(e.target.value)
            )
          }
          className="mt-4 w-full rounded-xl border border-gray-800 bg-gray-900 p-3 text-white"
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
          <div className="mt-6">
            <PlayerComparisonCard
              playerA={player}
              playerB={comparisonPlayer}
            />
          </div>
      </div>

      {/* ATTRIBUTE RADAR */}
      <div className="rounded-2xl border border-gray-800 bg-gray-950 p-8">
        <p className="text-sm uppercase tracking-widest text-gray-500">
          Attribute Radar
        </p>

        <div className="mt-6">
          <AttributeRadar player={player} />
        </div>
      </div>

      {/* SCOUTING REPORT */}
      <div className="rounded-2xl border border-gray-800 bg-gray-950 p-8">
        <p className="text-sm uppercase tracking-widest text-gray-500">
          Scouting Report
        </p>

        <p className="mt-4 max-w-4xl leading-8 text-gray-300">
          {player.scoutingReport}
        </p>
      </div>
    </div>
  )
}

export default PlayerPage