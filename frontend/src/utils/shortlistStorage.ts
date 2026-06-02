import type { Player } from '../types/player'

const STORAGE_KEY =
  'footballiq-shortlist'

export function getShortlistIds() {
  const stored =
    localStorage.getItem(
      STORAGE_KEY
    )

  if (!stored) return []

  return JSON.parse(stored)
}

export function isShortlisted(
  playerId: number
) {
  return getShortlistIds().includes(
    playerId
  )
}

export function addToShortlist(
  player: Player
) {
  const current =
    getShortlistIds()

  if (
    current.includes(player.id)
  ) {
    return
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([
      ...current,
      player.id,
    ])
  )
}

export function removeFromShortlist(
  playerId: number
) {
  const current =
    getShortlistIds()

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      current.filter(
        (id: number) =>
          id !== playerId
      )
    )
  )
}