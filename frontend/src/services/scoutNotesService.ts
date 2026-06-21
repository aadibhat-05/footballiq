import { supabase } from '../lib/supabase'

export interface ScoutNote {
  id: number
  created_at: string
  user_id: string
  player_id: number
  note: string
}

export async function getNotesForPlayer(
  playerId: number
) {
  const { data, error } =
    await supabase
      .from('scout_notes')
      .select('*')
      .eq('player_id', playerId)
      .order('created_at', {
        ascending: false,
      })

  if (error) throw error

  return data as ScoutNote[]
}

export async function addNote(
  playerId: number,
  note: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error(
      'User not logged in'
    )
  }

  const { error } =
    await supabase
      .from('scout_notes')
      .insert({
        user_id: user.id,
        player_id: playerId,
        note,
      })

  if (error) throw error
}

export async function deleteNote(
  noteId: number
) {
  const { error } =
    await supabase
      .from('scout_notes')
      .delete()
      .eq('id', noteId)

  if (error) throw error
}

export async function updateNote(
  noteId: number,
  note: string
) {
  const { error } =
    await supabase
      .from('scout_notes')
      .update({ note })
      .eq('id', noteId)

  if (error) throw error
}