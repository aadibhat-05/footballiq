import fs from 'fs'
import { players } from '../src/data/players.js'

const headers = [
  'name',
  'club',
  'league',
  'position',
  'age',
  'rating',
  'scouting_report',
  'strengths',
  'tactical_role',
  'archetype',
  'nationality',
  'preferred_foot',
  'market_value',
  'pace',
  'passing',
  'dribbling',
  'defending',
  'physical',
  'vision',
  'shooting',
]

const rows = players.map((player) => [
  player.name,
  player.club,
  player.league,
  player.position,
  player.age,
  player.rating,
  player.scoutingReport,
  player.strengths.join(', '),
  player.tacticalRole,
  player.archetype,
  player.nationality,
  player.preferredFoot,
  player.marketValue,
  player.attributes.pace,
  player.attributes.passing,
  player.attributes.dribbling,
  player.attributes.defending,
  player.attributes.physical,
  player.attributes.vision,
  player.attributes.shooting,
])

const csv = [
  headers.join(','),
  ...rows.map((row) =>
    row
      .map((value) =>
        `"${String(value).replace(/"/g, '""')}"`
      )
      .join(',')
  ),
].join('\n')

fs.writeFileSync('players.csv', csv)

console.log('players.csv created')