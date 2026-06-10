import type { Player } from '../types/player'

import { calculateSimilarity } from './calculateSimilarity'

export function getSimilarPlayers(
  selectedPlayer: Player,
  players: Player[],
  limit = 3
) {
  return players
    .filter(
      (player) =>
        player.id !== selectedPlayer.id
    )
    .map((player) => ({
      player,
      similarity: calculateSimilarity(
        selectedPlayer,
        player
      ),
    }))
    .sort(
      (a, b) =>
        b.similarity - a.similarity
    )
    .slice(0, limit)
}