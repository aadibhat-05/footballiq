import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { Player } from '../types/player'
import { getPlayers } from '../services/playerService'
import {
  getShortlistIds,
  removeFromShortlist,
} from '../utils/shortlistStorage'

function ShortlistsPage() {
  const [
    shortlistedPlayers,
    setShortlistedPlayers,
  ] = useState<Player[]>([])
  useEffect(() => {
    async function loadShortlist() {
      try {
        const players =
          await getPlayers()
        const shortlistIds =
          await getShortlistIds()
        const filteredPlayers =
          players
            .filter((player) =>
              shortlistIds.includes(
                player.id
              )
            )
            .sort(
              (a, b) =>
                b.rating - a.rating
            )
        setShortlistedPlayers(
          filteredPlayers
        )
      } catch (error) {
        console.error(error)
      }
    }
    loadShortlist()
  }, [])

  return (
    <div className="space-y-8 p-10 text-white">
      <div>
        <p className="text-sm uppercase tracking-widest text-green-400">
          Recruitment Board
        </p>
        <h1 className="mt-2 text-5xl font-bold">
          Shortlists
        </h1>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">
            <p className="text-sm text-gray-500">
              Players Saved
            </p>
            <p className="mt-2 text-3xl font-bold text-green-400">
              {shortlistedPlayers.length}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">
            <p className="text-sm text-gray-500">
              Average Rating
            </p>
            <p className="mt-2 text-3xl font-bold text-green-400">
              {shortlistedPlayers.length > 0
                ? Math.round(
                  shortlistedPlayers.reduce(
                    (sum, player) =>
                      sum + player.rating,
                    0
                  ) / shortlistedPlayers.length
                )
              : 0}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">
            <p className="text-sm text-gray-500">
              Clubs Represented
            </p>
            <p className="mt-2 text-3xl font-bold text-green-400">
              {
                new Set(
                  shortlistedPlayers.map(
                    (player) => player.club
                  )
                ).size
              }
            </p>
          </div>
        </div>

        <p className="mt-2 text-gray-400">
          Saved scouting targets.
        </p>
      </div>

      {shortlistedPlayers.length === 0 ? (
        <div className="rounded-2xl border border-gray-800 bg-gray-950 p-8">
          <p className="text-gray-400">
            No players shortlisted yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {shortlistedPlayers.map(
            (player) => (
              <div
                key={player.id}
                className="rounded-2xl border border-gray-800 bg-gray-950 p-6"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {player.name}
                    </h2>
                    <p className="text-gray-400">
                      {player.club}
                    </p>
                  </div>
                  <div className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-400">
                    {player.rating}
                  </div>
                </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">
                    Position
                  </p>
                  <p>
                    {player.position}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">
                    Age
                  </p>
                  <p>
                    {player.age}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">
                    Value
                  </p>
                  <p className="text-green-400">
                    {player.marketValue}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">
                    Rating
                  </p>
                  <p className="text-green-400">
                    {player.rating}
                  </p>
                </div>
              </div>

                <div className="mt-6 flex gap-3">
                  <Link
                    to={`/player/${player.id}`}
                    className="rounded-xl bg-green-500 px-4 py-2 font-semibold text-black"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => {
                        removeFromShortlist(
                            player.id
                        )
                        setShortlistedPlayers(
                            (current) =>
                                current.filter(
                                    (p) =>
                                        p.id !== player.id
                                )
                        )
                    }}
                    className="rounded-xl border border-red-500 px-4 py-2 text-red-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}

export default ShortlistsPage