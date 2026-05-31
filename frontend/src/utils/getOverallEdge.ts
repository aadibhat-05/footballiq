import type { Player } from '../types/player'

export function getOverallEdge(
  playerA: Player,
  playerB: Player
) {
  const attributes = [
    'pace',
    'shooting',
    'passing',
    'dribbling',
    'defending',
    'physical',
    'vision',
  ] as const

  const scoreA =
    playerA.rating * 3 +
    attributes.reduce(
      (sum, attribute) =>
        sum + playerA.attributes[attribute],
      0
    )

  const scoreB =
    playerB.rating * 2+
    attributes.reduce(
      (sum, attribute) =>
        sum + playerB.attributes[attribute],
      0
    )

  const winner =
    scoreA > scoreB
      ? playerA
      : scoreB > scoreA
      ? playerB
      : null

  const reasons: string[] = []
  if (winner === playerA) {
    if (playerA.rating > playerB.rating) {
        reasons.push(
            'Higher Overall Rating'
        )
    }
    if (
        playerA.attributes.passing >
        playerB.attributes.passing
    ) {
        reasons.push(
            'Superior Passing'
        )
    }
    if (
        playerA.attributes.vision >
        playerB.attributes.vision
    ) {
        reasons.push(
            'Superior Vision'
        )
    }
    if (
        playerA.attributes.dribbling >
        playerB.attributes.dribbling
    ) {
        reasons.push(
            'Superior Ball Carrying'
        )
    }
    if (
        playerA.attributes.shooting >
        playerB.attributes.shooting
    ) {
        reasons.push(
            'Greater Attacking Threat'
        )
    }
}
if (winner === playerB) {
    if (playerB.rating > playerA.rating) {
        reasons.push(
            'Higher Overall Rating'
        )
    }
    if (
        playerB.attributes.passing >
        playerA.attributes.passing
    ) {
        reasons.push(
            'Superior Passing'
        )
    }
    if (
        playerB.attributes.vision >
        playerA.attributes.vision
    ) {
        reasons.push(
            'Superior Vision'
        )
    }
    if (
        playerB.attributes.dribbling >
        playerA.attributes.dribbling
    ) {
        reasons.push(
            'Superior Ball Carrying'
        )
    }
    if (
        playerB.attributes.shooting >
        playerA.attributes.shooting
    ) {
        reasons.push(
            'Greater Attacking Threat'
        )
    }
}
return {
  winner,
  reasons: reasons.slice(0, 4),
}
}