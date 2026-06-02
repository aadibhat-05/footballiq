import { Link } from 'react-router-dom'
import { players } from '../data/players'
import {
  getShortlistIds,
  removeFromShortlist,
} from '../utils/shortlistStorage'
import { useState } from 'react'

function ShortlistsPage() {
  const [
    shortlistedPlayers,
    setShortlistedPlayers,
  ] = useState(
    players.filter((player) =>
        getShortlistIds().includes(
            player.id
        )
    )
)

  return (
    <div className="space-y-8 p-10 text-white">
      <div>
        <h1 className="text-4xl font-bold">
          Shortlists
        </h1>

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
                <h2 className="text-2xl font-bold">
                  {player.name}
                </h2>

                <p className="mt-2 text-gray-400">
                  {player.club}
                </p>

                <p className="mt-2 text-green-400">
                  Rating: {player.rating}
                </p>

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