import { getPlayers } from '../services/playerService'
import type { Player } from '../types/player'
import { clubProfiles } from '../data/clubProfiles'
import { generateTransferFitReport } from '../utils/generateTransferFitReport'
import { useState, useEffect } from 'react'

function ScoutingPage() {
  const leagues = [
    ...new Set(
      clubProfiles.map(
        (club) => club.league
      )
    ),
  ]

  const [players, setPlayers] =
    useState<Player[]>([])

    useEffect(() => {
      async function loadPlayers() {
        try {
          const data =
            await getPlayers()
          setPlayers(data)
        } catch (error) {
          console.error(error)
        }
      }

  loadPlayers()
}, [])

  const [selectedPlayer, setSelectedPlayer] =
    useState<number | null>(null)

    useEffect(() => {
      if (
        players.length > 0 &&
        selectedPlayer === null
      ) {
        setSelectedPlayer(
          players[0].id
        )
      }
    }, [players, selectedPlayer])

  const [selectedLeague, setSelectedLeague] =
    useState(leagues[0])

  const availableClubs =
    clubProfiles.filter(
      (club) =>
        club.league === selectedLeague
    )

  const [selectedClub, setSelectedClub] =
    useState(
      availableClubs[0]?.clubName
    )

  const [fitScore, setFitScore] =
    useState<number | null>(null)

  const [report, setReport] =
    useState('')

    
    useEffect(() => {
        if (availableClubs.length > 0) {
            setSelectedClub(
                availableClubs[0].clubName
            )
        }
    }, [selectedLeague])

    useEffect(() => {
        setFitScore(null)
        setReport('')
    }, [
        selectedPlayer,
        selectedLeague,
        selectedClub,
    ])

  const [analyzedClub, setAnalyzedClub] =
    useState<any>(null)

  const [tacticalFit, setTacticalFit] =
    useState<number | null>(null)
    
  const [technicalFit, setTechnicalFit] =
    useState<number | null>(null)
    
  const [physicalFit, setPhysicalFit] =
    useState<number | null>(null)

  function handleAnalyze() {
    const player = players.find(
      (p) => p.id === selectedPlayer
    )

    const club = clubProfiles.find(
      (c) => c.clubName === selectedClub
    )

    if (!player || !club) return

   

    if (!player || !club) return

    const tacticalFit = Math.round(
      (
        player.attributes.vision +
        player.attributes.passing +
        player.attributes.dribbling
      ) / 3
    )
    
    const technicalFit = Math.round(
      (
        player.attributes.passing +
        player.attributes.dribbling +
        player.attributes.shooting
      ) / 3
    )
    
    const physicalFit = Math.round(
      (
        player.attributes.pace +
        player.attributes.physical
      ) / 2
    )

    const scores =
      club.priorities.map(
        (attribute) =>
          player.attributes[
            attribute as keyof typeof player.attributes
          ]
      )

    const score = Math.round(
      scores.reduce(
        (sum, value) => sum + value,
        0
      ) / scores.length
    )

    const generatedReport =
      generateTransferFitReport(
        player,
        club,
        score
      )

    setFitScore(score)
    setReport(generatedReport)
    setTacticalFit(tacticalFit)
    setTechnicalFit(technicalFit)
    setPhysicalFit(physicalFit)
    setAnalyzedClub(club)
  }

  return (
    <div className="space-y-8 p-10 text-white">
      <div>
        <h1 className="text-4xl font-bold">
          Transfer Fit Analysis
        </h1>

        <p className="mt-2 text-gray-400">
          Analyze how well a player fits a club's tactical system.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-800 bg-gray-950 p-8">
        <h2 className="mb-6 text-lg font-semibold">
          Analysis Configuration
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <select
            value={selectedPlayer ?? ''}
            onChange={(e) =>
              setSelectedPlayer(
                Number(e.target.value)
              )
            }
            className="rounded-xl border border-gray-800 bg-gray-900 p-3"
          >
            {players.map((player) => (
              <option
                key={player.id}
                value={player.id}
              >
                {player.name}
              </option>
            ))}
          </select>

          <select
            value={selectedLeague}
            onChange={(e) =>
              setSelectedLeague(
                e.target.value
              )
            }
            className="rounded-xl border border-gray-800 bg-gray-900 p-3"
          >
            {leagues.map((league) => (
              <option
                key={league}
                value={league}
              >
                {league}
              </option>
            ))}
          </select>

          <select
            value={selectedClub}
            onChange={(e) =>
              setSelectedClub(
                e.target.value
              )
            }
            className="rounded-xl border border-gray-800 bg-gray-900 p-3"
          >
            {availableClubs.map((club) => (
              <option
                key={club.clubName}
                value={club.clubName}
              >
                {club.clubName}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAnalyze}
          className="mt-6 rounded-xl bg-green-500 px-5 py-3 font-semibold text-black"
        >
          Analyze Fit
        </button>
      </div>

      {fitScore !== null && (
        <div className="space-y-6">
            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-8">
                <p className="text-sm uppercase tracking-widest text-green-400">
                    Transfer Fit Result
                </p>
                <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-6xl font-bold text-green-400">
                            {fitScore}%
                        </h2>
                        <p className="mt-2 text-lg text-gray-300">
                            {fitScore >= 90
                              ? 'Excellent Fit'
                              : fitScore >= 75
                              ? 'Strong Fit'
                              : fitScore >= 60
                              ? 'Moderate Fit'
                              : 'Weak Fit'}
                        </p>
                    </div>
                    <div className="flex gap-6">
                        <div>
                            <p className="text-xs uppercase text-gray-500">
                                Tactical Fit
                            </p>
                            <p className="text-2xl font-semibold text-white">
                                {tacticalFit}%
                            </p>
                        </div>
                        <div>
                            <p className="text-xs uppercase text-gray-500">
                                Technical Fit
                            </p>
                            <p className="text-2xl font-semibold text-white">
                                {technicalFit}%
                            </p>
                        </div>
                        <div>
                            <p className="text-xs uppercase text-gray-500">
                                Physical Fit
                            </p>
                            <p className="text-2xl font-semibold text-white">
                                {physicalFit}%
                            </p>
                        </div>
                    </div>
                </div>
            </div>

    <div className="rounded-2xl border border-gray-800 bg-gray-950 p-8">
      <p className="text-sm uppercase tracking-widest text-green-400">
        Club Profile
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div>
          <p className="text-xs text-gray-500">
            Club
          </p>
          <p className="text-lg font-semibold">
            {analyzedClub.clubName}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">
            League
          </p>
          <p className="text-lg font-semibold">
            {analyzedClub.league}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">
            Playing Style
          </p>
          <p className="text-lg font-semibold">
            {analyzedClub.style}
          </p>
        </div>
      </div>
      <p className="text-sm uppercase tracking-widest text-green-400">
        AI Scout Assessment
      </p>

      <p className="mt-6 leading-8 text-gray-300">
        {report}
      </p>
    </div>
  </div>
)}

    </div>
  )
}

export default ScoutingPage