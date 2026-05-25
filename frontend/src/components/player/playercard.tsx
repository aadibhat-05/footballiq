import type { Player } from '../../types/player'
import { Link } from 'react-router-dom'

type PlayerCardProps = {
  player: Player
  isSelected: boolean
  onSelect: () => void
}

function PlayerCard({
  player,
  isSelected,
  onSelect,
}: PlayerCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`
        w-[280px]
        cursor-pointer
        rounded-2xl
        border
        p-5
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-green-400/50
        hover:bg-gray-900
        ${
          isSelected
            ? 'border-green-400 bg-gray-900'
            : 'border-gray-800 bg-gray-950'
        }
      `}
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {player.name}
          </h2>

          <p className="text-sm text-gray-400">
            {player.club}
          </p>
        </div>

        <div className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-400">
          {player.rating}
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-300">
        <p>
          Position:{' '}
          <span className="text-white">
            {player.position}
          </span>
        </p>

        <p>
          Age:{' '}
          <span className="text-white">
            {player.age}
          </span>
        </p>
      </div>

      <Link
        to={`/player/${player.id}`}
        onClick={(e) => e.stopPropagation()}
        className="mt-5 inline-flex rounded-xl border border-gray-700 px-4 py-2 text-sm text-gray-300 transition hover:border-green-400 hover:text-green-400"
      >
        View Full Profile
      </Link>
    </div>
  )
}

export default PlayerCard