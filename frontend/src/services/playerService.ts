import { supabase } from '../lib/supabase'
import type { Player } from '../types/player'

export async function getPlayers(): Promise<Player[]> {
  const { data, error } =
    await supabase
      .from('players')
      .select('*')
      .order('rating', {
        ascending: false,
      })

  if (error) {
    throw error
  }

  return data.map((player) => ({
    id: player.id,
    name: player.name,
    club: player.club,
    league: player.league,
    position: player.position,
    age: player.age,
    rating: player.rating,

    scoutingReport:
      player.scouting_report,

    strengths:
      player.strengths
        .split(',')
        .map((s: string) =>
          s.trim()
        ),

    tacticalRole:
      player.tactical_role,

    archetype:
      player.archetype,

    nationality:
      player.nationality,

    preferredFoot:
      player.preferred_foot,

    marketValue:
      player.market_value,

    attributes: {
      pace: player.pace,
      passing: player.passing,
      dribbling: player.dribbling,
      defending: player.defending,
      physical: player.physical,
      vision: player.vision,
      shooting: player.shooting,
    },
  }))
}