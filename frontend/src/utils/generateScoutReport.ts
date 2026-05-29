import type { Player } from '../types/player'

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