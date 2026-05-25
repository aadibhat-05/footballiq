import { useState } from 'react'
import { players } from '../../data/players'
import type { Player } from '../../types/player'

type PlayerAnalysisPanelProps = {
  selectedPlayer: Player
  comparePlayerId: number | null
  setComparePlayerId: (id: number | null) => void
}

const ATTRIBUTES = [
  'passing',
  'dribbling',
  'defending',
  'physical',
  'vision',
] as const

function PlayerAnalysisPanel({
  selectedPlayer,
  comparePlayerId,
  setComparePlayerId,
}: PlayerAnalysisPanelProps) {
  const comparePlayer =
    players.find((p) => p.id === comparePlayerId) ||
    null

  const [activeTab, setActiveTab] =
    useState<
      'overview' | 'attributes' | 'comparison'
    >('overview')

  return (
    <div className="sticky top-6 max-h-[calc(100vh-48px)] overflow-y-auto rounded-2xl border border-gray-800 bg-gray-950 p-6">
      <p className="text-sm uppercase tracking-widest text-green-400">
        Player Analysis
      </p>

      <h2 className="mt-3 text-3xl font-bold text-white">
        {selectedPlayer.name}
      </h2>

      <p className="mt-1 text-gray-400">
        {selectedPlayer.club}
      </p>

      {/* TABS */}
      <div className="mt-6 flex gap-2">
        {[
          'overview',
          'attributes',
          'comparison',
        ].map((tab) => (
          <button
            key={tab}
            onClick={() =>
              setActiveTab(
                tab as
                  | 'overview'
                  | 'attributes'
                  | 'comparison'
              )
            }
            className={`
              rounded-xl
              px-4
              py-2
              text-sm
              font-medium
              capitalize
              transition
              ${
                activeTab === tab
                  ? 'bg-green-500/10 text-green-400'
                  : 'text-gray-400 hover:bg-gray-900'
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <>
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
        </>
      )}

      {/* ATTRIBUTES TAB */}
      {activeTab === 'attributes' && (
        <div className="mt-8">
          <p className="text-sm uppercase tracking-widest text-gray-500">
            Attribute Analysis
          </p>

          <div className="mt-4 space-y-4">
            {ATTRIBUTES.map((attribute) => {
              const value =
                selectedPlayer.attributes[
                  attribute
                ] ?? 0

              return (
                <div key={attribute}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <p className="capitalize text-sm text-gray-400">
                        {attribute}
                      </p>

                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          value >= 90
                            ? 'bg-green-500/10 text-green-400'
                            : value >= 80
                            ? 'bg-blue-500/10 text-blue-400'
                            : 'bg-gray-700 text-gray-300'
                        }`}
                      >
                        {value >= 90
                          ? 'Elite'
                          : value >= 80
                          ? 'Strong'
                          : 'Average'}
                      </span>
                    </div>

                    <p className="text-sm font-semibold text-white">
                      {value}
                    </p>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-800">
                    <div
                      className="h-full rounded-full bg-green-400"
                      style={{
                        width: `${value}%`,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* COMPARISON TAB */}
      {activeTab === 'comparison' && (
        <div className="mt-8">
          <p className="text-sm uppercase tracking-widest text-gray-500">
            Compare Player
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            {players
              .filter(
                (p) => p.id !== selectedPlayer.id
              )
              .map((player) => (
                <button
                  key={player.id}
                  onClick={() =>
                    setComparePlayerId(player.id)
                  }
                  className={`rounded-xl border px-4 py-2 text-sm transition ${
                    comparePlayerId === player.id
                      ? 'border-green-400 bg-green-500/10 text-green-400'
                      : 'border-gray-700 text-gray-300 hover:border-gray-500'
                  }`}
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
      )}
    </div>
  )
}

export default PlayerAnalysisPanel