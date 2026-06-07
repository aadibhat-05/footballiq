import type { Player } from '../types/player'

export function getDevelopmentAreas(
  player: Player
) {
  return Object.entries(
    player.attributes
  )
    .filter(
      ([, value]) => value < 75
    )
    .sort(
      ([, a], [, b]) => a - b
    )
    .slice(0, 3)
    .map(
      ([attribute]) =>
        attribute.charAt(0).toUpperCase() +
        attribute.slice(1)
    )
}
export function generateScoutReport(
  player: Player
) {
  const insights: string[] = []

  if (
    player.attributes.passing >= 90 &&
    player.attributes.vision >= 90
  ) {
    insights.push(
      'Elite progressive playmaker with exceptional vision, creativity, and passing range.'
    )
  }

  if (
    player.attributes.dribbling >= 90
  ) {
    insights.push(
      'Highly effective in tight spaces with elite dribbling control and ball retention.'
    )
  }

  if (
    player.attributes.defending >= 90
  ) {
    insights.push(
      'Defensive presence capable of controlling transitions and recovering possession consistently.'
    )
  }

  if (
    player.attributes.shooting >= 90
  ) {
    insights.push(
      'Elite goal threat with outstanding finishing ability and consistent end-product in attacking situations.'
    )
  }

  if (
    player.attributes.pace >= 90
  ) {
    insights.push(
      'Possesses explosive acceleration and can consistently threaten defensive lines in transition.'
    )
  }

  if (
    player.attributes.physical >= 90
  ) {
    insights.push(
      'Uses physical dominance effectively in duels, hold-up situations, and defensive contests.'
    )
  }

  if (
    player.attributes.physical < 70
  ) {
    insights.push(
      'May struggle against highly physical opponents and intense duel-heavy systems.'
    )
  }

  if (
    player.position.includes('Striker')
  ) {
    insights.push(
      'Operates primarily as a penalty-area attacker and focal point for chance conversion.'
    )
  }

  if (
    player.position.includes('Winger')
  ) {
    insights.push(
      'Provides attacking width, ball progression, and direct threat in isolated situations.'
    )
  }

  if (
    player.position.includes('Midfielder')
  ) {
    insights.push(
      'Contributes heavily to build-up play and overall control of possession phases.'
    )
  }

  if (
    player.position.includes('Back')
  ) {
    insights.push(
      'Offers defensive stability while contributing to progression from deeper areas.'
    )
  }

  if (
    player.rating >= 90
  ) {
    insights.push(
      'Profiles as a world-class talent with elite-level impact potential.'
    )
  } else if (
    player.rating >= 85
  ) {
    insights.push(
      'Projects as a high-level performer capable of influencing matches consistently.'
    )
  }

  return insights
}

export function generateSummary(
  player: Player
) {
  if (
    player.position.includes(
      'Midfielder'
    )
  ) {
    return `${player.name} is a highly intelligent midfielder who thrives in possession-based systems. His technical quality, decision-making, and ability to progress play make him a valuable asset during both build-up and chance creation phases.`
  }

  if (
    player.position.includes(
      'Striker'
    )
  ) {
    return `${player.name} is an attacking focal point capable of influencing matches through movement, finishing, and penalty-area presence. He offers a consistent goal threat and can serve as the primary reference point in advanced areas.`
  }

  if (
    player.position.includes(
      'Winger'
    )
  ) {
    return `${player.name} is a dynamic wide attacker who excels in progression, ball carrying, and direct attacking actions. His ability to isolate defenders makes him a dangerous option in transition and final-third situations.`
  }

  return `${player.name} is a versatile footballer with a well-rounded profile and the attributes required to contribute across multiple phases of play.`
}