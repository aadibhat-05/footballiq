import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'
import AttributeRadar from '../components/dashboard/AttributeRadar'
import SimilarPlayersPanel from '../components/dashboard/SimilarPlayersPanel'
import { players } from '../data/players'
import { generateScoutReport,
         generateSummary,
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

function PlayerPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const player = players.find(
    (p) => p.id === Number(id)
  )

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

  const similarPlayers =
    getSimilarPlayers(player)

  const [comparisonPlayerId, setComparisonPlayerId] =
    useState<number>(
      players.find((p) => p.id !== player.id)?.id || player.id
    )

  const comparisonPlayer =
    players.find(
      (p) => p.id === comparisonPlayerId
    ) || player

  const [
    shortlisted,
    setShortlisted,
  ] = useState(false)
  
  useEffect(() => {
    setShortlisted(
      isShortlisted(player.id)
    )
  }, [player.id])

  return (
    <div className="space-y-8 p-10 text-white">
      {/* TOP NAVIGATION */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
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
        </div>
        <p className="mt-2 text-xl text-gray-400">
          {player.club}
        </p>
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