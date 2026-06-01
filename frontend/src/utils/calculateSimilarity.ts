import type { Player } from '../types/player'

function getWeights(position: string) {
  const lowerPosition =
    position.toLowerCase()

  if (
    lowerPosition.includes('midfielder')
  ) {
    return {
      pace: 1,
      passing: 3.5,
      dribbling: 2,
      defending: 1.5,
      physical: 1,
      vision: 3.5,
      shooting: 1,
    }
  }

  if (
    lowerPosition.includes('forward') ||
    lowerPosition.includes('winger')
  ) {
    return {
      pace: 2,
      passing: 1,
      dribbling: 2,
      defending: 0.5,
      physical: 1,
      vision: 1,
      shooting: 3,
    }
  }

  if (
    lowerPosition.includes('defender')
  ) {
    return {
      pace: 1,
      passing: 2,
      dribbling: 0.5,
      defending: 3,
      physical: 3,
      vision: 1,
      shooting: 0.25,
    }
  }

  return {
    pace: 1,
    passing: 1,
    dribbling: 1,
    defending: 1,
    physical: 1,
    vision: 1,
    shooting: 1,
  }
}

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
  const weights =
    getWeights(playerA.position)

  let weightedDifference = 0
  let maxDifference = 0

  ATTRIBUTES.forEach((attribute) => {
    weightedDifference +=
      Math.abs(
        playerA.attributes[attribute] -
          playerB.attributes[attribute]
      ) * weights[attribute]

    maxDifference +=
      100 * weights[attribute]
  })

  let similarity =
    100 -
    (weightedDifference /
      maxDifference) *
      100

  const positionA =
    playerA.position.toLowerCase()

  const positionB =
    playerB.position.toLowerCase()

  if (
    positionA.includes('midfielder') &&
    positionB.includes('midfielder')
  ) {
    similarity += 1
  }

  if (
    (positionA.includes('forward') ||
      positionA.includes('winger')) &&
    (positionB.includes('forward') ||
      positionB.includes('winger'))
  ) {
    similarity += 1
  }

  if (
    positionA.includes('defender') &&
    positionB.includes('defender')
  ) {
    similarity += 1
  }

  similarity = Math.min(
    similarity,
    100
  )

  return Math.round(similarity)
}