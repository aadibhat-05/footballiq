import type { Player } from '../types/player'

type ClubProfile = {
  clubName: string
  league: string
  style: string
  priorities: string[]
}

export function calculateClubFit(
  player: Player,
  club: ClubProfile
) {
  const scores = club.priorities.map(
    (attribute) =>
      player.attributes[
        attribute as keyof typeof player.attributes
      ]
  )

  const average =
    scores.reduce(
      (sum, value) => sum + value,
      0
    ) / scores.length

  return Math.round(average)
}