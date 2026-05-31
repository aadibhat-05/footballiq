import type { Player } from '../types/player'

export function comparePlayers(
  playerA: Player,
  playerB: Player
) {
  const categories = [
    'pace',
    'shooting',
    'passing',
    'dribbling',
    'defending',
    'physical',
    'vision',
  ] as const

  const comparisons = categories.map(
    (category) => ({
      category,
      playerAValue:
        playerA.attributes[category],
      playerBValue:
        playerB.attributes[category],
      winner:
        playerA.attributes[category] >
        playerB.attributes[category]
          ? playerA.name
          : playerB.attributes[category] >
            playerA.attributes[category]
          ? playerB.name
          : 'Draw',
    })
  )

  return comparisons
}