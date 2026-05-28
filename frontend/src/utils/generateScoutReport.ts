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
      'Elite progressive playmaker with exceptional vision and passing range.'
    )
  }

  if (
    player.attributes.dribbling >= 90
  ) {
    insights.push(
      'Highly effective in tight spaces with elite dribbling control.'
    )
  }

  if (
    player.attributes.defending >= 90
  ) {
    insights.push(
      'Defensive presence capable of controlling transitions and recovering possession.'
    )
  }

  if (
    player.attributes.physical < 70
  ) {
    insights.push(
      'May struggle in highly physical match environments.'
    )
  }

  if (
    player.rating >= 90
  ) {
    insights.push(
      'Profiles as a world-class talent with elite-level impact potential.'
    )
  }

  return insights
}