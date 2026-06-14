import { supabase } from '../lib/supabase'
import type { Player } from '../types/player'

export async function getShortlistIds() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } =
    await supabase
      .from('shortlists')
      .select('player_id')
      .eq('user_id', user.id)

  if (error) {
    console.error(error)
    return []
  }

  return data.map(
    (item) => item.player_id
  )
}

export async function isShortlisted(
  playerId: number
) {
  const ids =
    await getShortlistIds()

  return ids.includes(playerId)
}

export async function addToShortlist(
  player: Player
) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const { error } =
    await supabase
      .from('shortlists')
      .insert({
        user_id: user.id,
        player_id: player.id,
      })

  if (error) {
    console.error(error)
  }
}

export async function removeFromShortlist(
  playerId: number
) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const { error } =
    await supabase
      .from('shortlists')
      .delete()
      .eq('user_id', user.id)
      .eq('player_id', playerId)

  if (error) {
    console.error(error)
  }
}