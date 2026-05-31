import type { Player } from '../types/player'

export function generateComparisonSummary(
  playerA: Player,
  playerB: Player
) {
  const strengthsA: string[] = []
  const strengthsB: string[] = []

  if (
    playerA.attributes.passing >
      playerB.attributes.passing &&
    playerA.attributes.vision >
      playerB.attributes.vision
  ) {
    strengthsA.push(
      'greater creativity and progression'
    )
  }

  if (
    playerB.attributes.passing >
      playerA.attributes.passing &&
    playerB.attributes.vision >
      playerA.attributes.vision
  ) {
    strengthsB.push(
      'greater creativity and progression'
    )
  }

  if (
    playerA.attributes.dribbling >
    playerB.attributes.dribbling
  ) {
    strengthsA.push(
      'stronger ball carrying ability'
    )
  }

  if (
    playerB.attributes.dribbling >
    playerA.attributes.dribbling
  ) {
    strengthsB.push(
      'stronger ball carrying ability'
    )
  }

  if (
    playerA.attributes.defending >
      playerB.attributes.defending &&
    playerA.attributes.physical >
      playerB.attributes.physical
  ) {
    strengthsA.push(
      'better defensive security'
    )
  }

  if (
    playerB.attributes.defending >
      playerA.attributes.defending &&
    playerB.attributes.physical >
      playerA.attributes.physical
  ) {
    strengthsB.push(
      'better defensive security'
    )
  }

  if (
    playerA.attributes.pace >
      playerB.attributes.pace &&
    playerA.attributes.shooting >
      playerB.attributes.shooting
  ) {
    strengthsA.push(
      'greater attacking threat'
    )
  }

  if (
    playerB.attributes.pace >
      playerA.attributes.pace &&
    playerB.attributes.shooting >
      playerA.attributes.shooting
  ) {
    strengthsB.push(
      'greater attacking threat'
    )
  }

  const aText =
    strengthsA.length > 0
      ? `${playerA.name} offers ${strengthsA.join(
          ', '
        )}.`
      : ''

  const bText =
    strengthsB.length > 0
      ? `${playerB.name} offers ${strengthsB.join(
          ', '
        )}.`
      : ''

  let verdict = ''

  if (playerA.rating > playerB.rating) {
    verdict = `${playerA.name} currently projects as the stronger overall profile.`
  } else if (
    playerB.rating > playerA.rating
  ) {
    verdict = `${playerB.name} currently projects as the stronger overall profile.`
  } else {
    verdict =
      'Both players project at a similar overall level.'
  }

  return `${aText} ${bText} ${verdict}`
}