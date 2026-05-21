import { useState } from 'react'
import PlayerCard from '../components/player/playercard'
import { players } from '../data/players'

function HomePage() {
  const [selectedPlayerId, setSelectedPlayerId] =
    useState<number | null>(null)

  return (
    <div className="space-y-8">
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            isSelected={selectedPlayerId === player.id}
            onSelect={() => setSelectedPlayerId(player.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default HomePage