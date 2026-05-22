import { useState } from 'react'
import PlayerCard from '../components/player/playercard'
import { players } from '../data/players'
import StatsCard from '../components/dashboard/StatsCard'

function HomePage() {
  const [selectedPlayerId, setSelectedPlayerId] =
    useState<number | null>(null)

  const [comparePlayerId, setComparePlayerId] =
    useState<number | null>(null)

  const selectedPlayer =
    players.find(
      (player) => player.id === selectedPlayerId
    ) || players[0]

  const comparePlayer =
    players.find(
      (player) => player.id === comparePlayerId
    ) || null

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
          {players.map((player) => (
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
        </div>

        {/* ANALYSIS PANEL */}
        <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
          <p className="text-sm uppercase tracking-widest text-green-400">
            Player Analysis
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white">
            {selectedPlayer.name}
          </h2>

          <p className="mt-1 text-gray-400">
            {selectedPlayer.club}
          </p>

          {/* PROFILE GRID */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Nationality
              </p>

              <p className="mt-2 text-lg font-semibold text-white">
                {selectedPlayer.nationality}
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Preferred Foot
              </p>

              <p className="mt-2 text-lg font-semibold text-white">
                {selectedPlayer.preferredFoot}
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Market Value
              </p>

              <p className="mt-2 text-lg font-semibold text-green-400">
                {selectedPlayer.marketValue}
              </p>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Tactical Role
              </p>

              <p className="mt-2 text-sm font-medium text-white">
                {selectedPlayer.tacticalRole}
              </p>
            </div>
          </div>

          {/* POSITION + AGE */}
          <div className="mt-8 space-y-4">
            <div>
              <p className="text-sm text-gray-500">
                Position
              </p>

              <p className="text-lg text-white">
                {selectedPlayer.position}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Age
              </p>

              <p className="text-lg text-white">
                {selectedPlayer.age}
              </p>
            </div>
          </div>

          {/* RATING */}
          <div className="mt-8">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Rating
              </p>

              <p className="text-lg font-semibold text-green-400">
                {selectedPlayer.rating}
              </p>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-gray-800">
              <div
                className="h-full rounded-full bg-green-400"
                style={{
                  width: `${selectedPlayer.rating}%`,
                }}
              />
            </div>
          </div>

          {/* SCOUTING REPORT */}
          <div className="mt-8">
            <p className="text-sm uppercase tracking-widest text-gray-500">
              AI Scouting Report
            </p>

            <p className="mt-3 leading-7 text-gray-300">
              {selectedPlayer.scoutingReport}
            </p>
          </div>

          {/* STRENGTHS */}
          <div className="mt-8">
            <p className="text-sm uppercase tracking-widest text-gray-500">
              Key Strengths
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {selectedPlayer.strengths.map(
                (strength) => (
                  <div
                    key={strength}
                    className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-300"
                  >
                    {strength}
                  </div>
                )
              )}
            </div>
          </div>

          {/* COMPARE PLAYER */}
          <div className="mt-8">
            <p className="text-sm uppercase tracking-widest text-gray-500">
              Compare Player
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {players
                .filter(
                  (player) =>
                    player.id !== selectedPlayer.id
                )
                .map((player) => (
                  <button
                    key={player.id}
                    onClick={() =>
                      setComparePlayerId(player.id)
                    }
                    className={`
                      rounded-xl
                      border
                      px-4
                      py-2
                      text-sm
                      transition
                      ${
                        comparePlayerId === player.id
                          ? 'border-green-400 bg-green-500/10 text-green-400'
                          : 'border-gray-700 text-gray-300 hover:border-gray-500'
                      }
                    `}
                  >
                    {player.name}
                  </button>
                ))}
            </div>

            {comparePlayer && (
  <div className="mt-6 rounded-2xl border border-gray-800 bg-gray-900 p-5">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">
          Selected
        </p>

        <h3 className="mt-1 text-lg font-bold text-white">
          {selectedPlayer.name}
        </h3>
      </div>

      <p className="text-sm uppercase tracking-widest text-gray-500">
        VS
      </p>

      <div className="text-right">
        <p className="text-sm text-gray-500">
          Comparison
        </p>

        <h3 className="mt-1 text-lg font-bold text-white">
          {comparePlayer.name}
        </h3>
      </div>
    </div>

    <div className="mt-6 space-y-4">
      {/* Rating */}
      <div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-green-400">
            {selectedPlayer.rating}
          </span>

          <span className="text-gray-500">
            Rating
          </span>

          <span className="text-blue-400">
            {comparePlayer.rating}
          </span>
        </div>

        <div className="flex gap-2">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-800">
            <div
              className="h-full rounded-full bg-green-400"
              style={{
                width: `${selectedPlayer.rating}%`,
              }}
            />
          </div>

          <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-800">
            <div
              className="h-full rounded-full bg-blue-400"
              style={{
                width: `${comparePlayer.rating}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Age */}
      <div className="flex items-center justify-between rounded-xl border border-gray-800 bg-gray-950 px-4 py-3">
        <span className="font-medium text-white">
          {selectedPlayer.age}
        </span>

        <span className="text-sm text-gray-500">
          Age
        </span>

        <span className="font-medium text-white">
          {comparePlayer.age}
        </span>
      </div>

      {/* Nationality */}
      <div className="flex items-center justify-between rounded-xl border border-gray-800 bg-gray-950 px-4 py-3">
        <span className="font-medium text-white">
          {selectedPlayer.nationality}
        </span>

        <span className="text-sm text-gray-500">
          Nation
        </span>

        <span className="font-medium text-white">
          {comparePlayer.nationality}
        </span>
      </div>

      {/* Tactical Role */}
      <div className="flex items-center justify-between rounded-xl border border-gray-800 bg-gray-950 px-4 py-3">
        <span className="max-w-[120px] text-sm font-medium text-white">
          {selectedPlayer.tacticalRole}
        </span>

        <span className="text-sm text-gray-500">
          Role
        </span>

        <span className="max-w-[120px] text-right text-sm font-medium text-white">
          {comparePlayer.tacticalRole}
        </span>
      </div>
    </div>
  </div>
)}
          </div>
        </div>
      </div>
    </div>
  )
}
export default HomePage