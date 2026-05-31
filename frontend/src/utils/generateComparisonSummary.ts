import type { Player } from '../types/player'

export function generateComparisonSummary(
  playerA: Player,
  playerB: Player
) {
  const strengthsA: string[] = []
  const strengthsB: string[] = []

  const attributes = [
    'pace',
    'shooting',
    'passing',
    'dribbling',
    'defending',
    'physical',
    'vision',
  ] as const

  attributes.forEach((attribute) => {
    const difference =
      playerA.attributes[attribute] -
      playerB.attributes[attribute]

    if (difference >= 5) {
      strengthsA.push(attribute)
    }

    if (difference <= -5) {
      strengthsB.push(attribute)
    }
  })

  const aSummary =
    strengthsA.length > 0
      ? `${playerA.name} holds an advantage in ${strengthsA.join(
          ', '
        )}.`
      : `${playerA.name} does not possess any major attribute advantage.`

  const bSummary =
    strengthsB.length > 0
      ? `${playerB.name} holds an advantage in ${strengthsB.join(
          ', '
        )}.`
      : `${playerB.name} does not possess any major attribute advantage.`

  let verdict = ''

  if (playerA.rating > playerB.rating) {
    verdict = `${playerA.name} currently projects as the stronger overall profile.`
  } else if (
    playerB.rating > playerA.rating
  ) {
    verdict = `${playerB.name} currently projects as the stronger overall profile.`
  } else {
    verdict =
      'Both players project at a very similar overall level.'
  }

  return `${aSummary} ${bSummary} ${verdict}`
}