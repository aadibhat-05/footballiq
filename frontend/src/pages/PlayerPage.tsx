import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'
import AttributeRadar from '../components/dashboard/AttributeRadar'
import { players } from '../data/players'
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
        <h1 className="mt-2 text-5xl font-bold">
          {player.name}
        </h1>
        <p className="mt-2 text-xl text-gray-400">
          {player.club}
        </p>
      </div>
      {/* PLAYER INFO GRID */}
      <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
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
      {/* SCOUTING REPORT */}
      <div className="rounded-2xl border border-gray-800 bg-gray-950 p-8">
        <p className="text-sm uppercase tracking-widest text-gray-500">
          AI Scouting Report
        </p>
        <p className="mt-4 max-w-3xl leading-8 text-gray-300">
          {player.scoutingReport}
        </p>
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
    </div>
  )
}
export default PlayerPage