import PlayerAnalysisPanel from '../components/dashboard/PlayerAnalysisPanel'
import StatsCard from '../components/dashboard/StatsCard'
import PlayerCard from '../components/player/playercard'
import { useState, useEffect } from 'react'
import { getPlayers } from '../services/playerService'
import type { Player } from '../types/player'

function PlayersPage() {
  const [selectedPlayerId, setSelectedPlayerId] =
    useState<number | null>(null)

  const [comparePlayerId, setComparePlayerId] =
    useState<number | null>(null)

  const [searchQuery, setSearchQuery] =
    useState('')

  const [selectedPosition, setSelectedPosition] =
    useState('All')

  const [sortOption, setSortOption] =
    useState('Highest Rated')  

  const [players, setPlayers] =
    useState<Player[]>([])

  const [loading, setLoading] =
    useState(true)

  const selectedPlayer =
    players.find(
      (player) => player.id === selectedPlayerId
    ) || players[0]

  const positions = [
    'All',
    ...new Set(
      players.map(
        (player) => player.position
      )
    ),
  ]
  
  const sortOptions = [
    'Highest Rated',
    'Youngest',
    'Highest Market Value',
    'Alphabetical'
  ]

  const filteredPlayers = players.filter(
    (player) => {
      const matchesSearch =
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

      const matchesPosition =
        selectedPosition === 'All' ||
        player.position ===
          selectedPosition

      return (
        matchesSearch &&
        matchesPosition
      )
    }
  )
  .sort((a, b) => {
    switch(sortOption){
      case 'Highest Rated':
        return b.rating - a.rating

      case 'Youngest':
        return a.age - b.age

      case 'Highest Market Value':
        return (
          parseInt(
            b.marketValue.replace(
              /\D/g,
              ''
            )
          ) -
          parseInt(
            a.marketValue.replace(
              /\D/g,
              ''
            )
          )
        )
      case 'Alphabetical':
        return a.name.localeCompare(
          b.name
        )
      default:
        return 0
    }
  })

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

  if (loading) {
    return (
      <div className="p-10 text-white">
        Loading players...
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* HERO */}
      <div>
        <p className="mb-2 text-sm uppercase tracking-widest text-green-400">
          AI Scouting Platform
        </p>

        <h1 className="text-5xl font-bold tracking-tight text-white">
          Players Database 
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-gray-400">
          Search, filter and evaluate player profiles across multiple leagues.
        </p>

        {/* SEARCH */}
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

        {/* POSITION FILTERS */}
        <div className="mt-4 flex flex-wrap gap-3">
          {positions.map((position) => (
            <button
              key={position}
              onClick={() =>
                setSelectedPosition(position)
              }
              className={`
                rounded-xl
                border
                px-4
                py-2
                text-sm
                transition
                ${
                  selectedPosition ===
                  position
                    ? 'border-green-400 bg-green-500/10 text-green-400'
                    : 'border-gray-800 bg-gray-950 text-gray-300 hover:border-gray-700'
                }
              `}
            >
              {position}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <select
            value={sortOption}
            onChange={(e) =>
              setSortOption(e.target.value)
            }
            className="rounded-xl border border-gray-800 bg-gray-950 px-4 py-3 text-sm text-white outline-none transition focus:border-green-400"
          >
            {sortOptions.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          value={String(players.length)}
          label="Players Profiled"
        />

        <StatsCard
          value="7"
          label="Top Leagues"
        />

        <StatsCard
          value={String(players.length * 7)}
          label="Attribute Datapoints"
        />

        <StatsCard
          value="4"
          label="Scouting Tools"
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

          {/* EMPTY STATE */}
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

export default PlayersPage