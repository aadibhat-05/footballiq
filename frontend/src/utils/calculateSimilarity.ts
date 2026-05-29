import type { Player } from '../types/player'

const ATTRIBUTES = [
  'pace',
  'passing',
  'dribbling',
  'defending',
  'physical',
  'vision',
  'shooting',
] as const

export function calculateSimilarity(
  playerA: Player,
  playerB: Player
) {
  let difference = 0

  ATTRIBUTES.forEach((attribute) => {
    difference += Math.abs(
      playerA.attributes[attribute] -
        playerB.attributes[attribute]
    )
  })

  const maxDifference =
    ATTRIBUTES.length * 100

  const similarity =
    100 -
    (difference / maxDifference) * 100

  return Math.round(similarity)
}