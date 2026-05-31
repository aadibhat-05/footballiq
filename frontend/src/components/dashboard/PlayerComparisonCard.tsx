import type { Player } from '../../types/player'
import { comparePlayers } from '../../utils/comparePlayers'
import { generateComparisonSummary } from '../../utils/generateComparisonSummary'

type Props = {
  playerA: Player
  playerB: Player
}

function getInitials(name: string) {
  const parts = name.trim().split(' ')

  if (parts.length === 1) {
    return parts[0][0].toUpperCase()
  }

  return (
    parts[0][0] +
    parts[parts.length - 1][0]
  ).toUpperCase()
}

function PlayerComparisonCard({
  playerA,
  playerB,
}: Props) {
  const comparisons =
    comparePlayers(playerA, playerB)

  const summary =
    generateComparisonSummary(
      playerA,
      playerB
    )

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-950 p-8">
      <p className="text-sm uppercase tracking-widest text-gray-500">
        Player Comparison
      </p>

      {/* VS HEADER */}
      <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-lg font-bold text-green-400">
            {getInitials(playerA.name)}
          </div>

          <div>
            <p className="text-lg font-semibold text-white">
              {playerA.name}
            </p>

            <p className="text-sm text-gray-400">
              {playerA.club}
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-2xl font-bold text-green-400">
            VS
          </p>
        </div>

        <div className="flex items-center justify-end gap-4">
          <div className="text-right">
            <p className="text-lg font-semibold text-white">
              {playerB.name}
            </p>

            <p className="text-sm text-gray-400">
              {playerB.club}
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-lg font-bold text-green-400">
            {getInitials(playerB.name)}
          </div>
        </div>
      </div>

      {/* PROFILE INFO */}
      <div className="mt-8 rounded-xl border border-gray-800 bg-gray-900 p-5">
        <p className="mb-4 text-sm uppercase tracking-widest text-gray-500">
            Profile Comparison
        </p>
        <div className="space-y-3">
            <div className="grid grid-cols-3">
                <span className="font-medium text-white">
                    {playerA.rating}
                </span>
                <span className="text-center text-gray-400">
                    Rating
                </span>
                <span className="text-right font-medium text-white">
                    {playerB.rating}
                </span>
            </div>
            <div className="grid grid-cols-3">
                <span>{playerA.position}</span>
                <span className="text-center text-gray-400">
                    Position
                </span>
                <span className="text-right">
                    {playerB.position}
                </span>
            </div>
            <div className="grid grid-cols-3">
                <span>{playerA.age}</span>
                <span className="text-center text-gray-400">
                    Age
                </span>
                <span className="text-right">
                    {playerB.age}
                </span>
            </div>
            <div className="grid grid-cols-3">
                <span>{playerA.nationality}</span>
                <span className="text-center text-gray-400">
                    Nationality
                </span>
                <span className="text-right">
                    {playerB.nationality}
                </span>
            </div>
            <div className="grid grid-cols-3">
                <span>{playerA.preferredFoot}</span>
                <span className="text-center text-gray-400">
                    Preferred Foot
                </span>
                <span className="text-right">
                    {playerB.preferredFoot}
                </span>
            </div>
            <div className="grid grid-cols-3">
                <span>{playerA.archetype}</span>
                <span className="text-center text-gray-400">
                    Archetype
                </span>
                <span className="text-right">
                    {playerB.archetype}
                </span>
            </div>
        </div>
      </div>
      {/* ATTRIBUTE COMPARISON */}
      <div className="mt-8 space-y-5">
        {comparisons.map((comparison) => (
          <div
            key={comparison.category}
            className="rounded-xl border border-gray-800 bg-gray-900 p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-medium text-white">
                {comparison.playerAValue}
              </span>

              <span className="font-semibold capitalize text-green-400">
                {comparison.category}
              </span>

              <span className="font-medium text-white">
                {comparison.playerBValue}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{playerA.name}</span>
                </div>

                <div className="h-2 rounded-full bg-gray-800">
                  <div
                    className="h-2 rounded-full bg-green-400"
                    style={{
                      width: `${comparison.playerAValue}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{playerB.name}</span>
                </div>

                <div className="h-2 rounded-full bg-gray-800">
                  <div
                    className="h-2 rounded-full bg-blue-400"
                    style={{
                      width: `${comparison.playerBValue}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <p className="mt-3 text-sm text-gray-400">
              Winner: {comparison.winner}
            </p>
          </div>
        ))}
      </div>

      {/* AI SUMMARY */}
      <div className="mt-8 rounded-xl border border-gray-800 bg-gray-900 p-5">
        <p className="text-sm uppercase tracking-widest text-gray-500">
          AI Comparison Summary
        </p>

        <p className="mt-3 leading-7 text-gray-300">
          {summary}
        </p>
      </div>
    </div>
  )
}

export default PlayerComparisonCard