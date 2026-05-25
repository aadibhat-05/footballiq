import { useState } from 'react'
import PlayerCard from '../components/player/playercard'
import { players } from '../data/players'
import StatsCard from '../components/dashboard/StatsCard'
import PlayerAnalysisPanel from '../components/dashboard/PlayerAnalysisPanel'

function HomePage() {
  const [selectedPlayerId, setSelectedPlayerId] =
    useState<number | null>(null)

  const [comparePlayerId, setComparePlayerId] =
    useState<number | null>(null)
  const [searchQuery, setSearchQuery] =
    useState('')
  const selectedPlayer =
    players.find(
      (player) => player.id === selectedPlayerId
    ) || players[0]
  const filteredPlayers = players.filter(
  (player) =>
    player.name
      .toLowerCase()
      .includes(
        searchQuery.toLowerCase()
      ) ||
      player.club
      .toLowerCase()
      .includes(
        searchQuery.toLowerCase()
      ) ||
      player.position
      .toLowerCase()
      .includes(
        searchQuery.toLowerCase()
      )
  )

  return (
    <div className="space-y-8">
      {/* HERO */}
      <div>
        <p className="mb-2 text-sm uppercase tracking-widest text-green-400">
          AI Scouting Platform
        </p>

        <h1 className="text-5xl font-bold tracking-tight text-white">
          FootballIQ
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-gray-400">
          Analyze elite football talent, compare tactical
          profiles, and build data-driven scouting reports.
        </p>
      </div>
      <div className="mt-6">
        <input
        type="text"
        placeholder="Search players, clubs, positions..."
        value={searchQuery}
        onChange={(e) =>
          setSearchQuery(e.target.value)
        }
        className="w-full rounded-2xl border border-gray-800 bg-gray-950 px-5 py-4 text-white outline-none transition focus:border-green-400"
        />
        </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          value="180K+"
          label="Players Tracked"
        />

        <StatsCard
          value="47"
          label="Top Leagues"
        />

        <StatsCard
          value="12M"
          label="Event Datapoints"
        />

        <StatsCard
          value="98.4%"
          label="Report Accuracy"
        />
      </div>

      {/* SECTION HEADER */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm uppercase tracking-widest text-gray-500">
            Scouting
          </p>

          <h2 className="mt-1 text-3xl font-bold text-white">
            Top Prospects
          </h2>
        </div>

        <button className="rounded-xl border border-gray-700 px-4 py-2 text-sm text-gray-300 transition hover:border-green-400 hover:text-green-400">
          View All Players
        </button>
      </div>

      {/* MAIN GRID */}
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        {/* PLAYER CARDS */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              isSelected={
                selectedPlayerId === player.id
              }
              onSelect={() =>
                setSelectedPlayerId(player.id)
              }
            />
          ))}
          {filteredPlayers.length === 0 && (
 <div className="rounded-2xl border border-gray-800 bg-gray-950 p-10 text-center">
    <p className="text-lg font-medium text-white">
      No players found
    </p>

    <p className="mt-2 text-sm text-gray-400">
      Try adjusting your search query
    </p>
  </div>
)}
        </div>

        {/* ANALYSIS PANEL */}
        <PlayerAnalysisPanel
          selectedPlayer={selectedPlayer}
          comparePlayerId={comparePlayerId}
          setComparePlayerId={setComparePlayerId}
        />
      </div>
    </div>
  )
}
export default HomePage