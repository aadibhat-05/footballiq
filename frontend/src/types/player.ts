export type Player = {
  id: number
  name: string
  club: string
  position: string
  age: number
  rating: number
  scoutingReport: string
  strengths: string[]
  tacticalRole: string
  archetype: string
  nationality: string
  preferredFoot: string
  marketValue: string
  attributes: {
    passing: number
    dribbling: number
    defending: number
    physical: number
    vision: number
  }
}