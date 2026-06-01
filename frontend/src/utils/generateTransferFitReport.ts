import type { Player } from '../types/player'
type ClubProfile = {
    clubName: string
    league: string
    style: string
    priorities: string[]
}
export function generateTransferFitReport(
    player: Player,
    club: ClubProfile,
    fitScore: number
) {
    const strengths: string[] = []
    club.priorities.forEach(
        (attribute) => {
            const value = 
              player.attributes[
                attribute as keyof typeof player.attributes
              ]
            if (value >= 90) {
                strengths.push(attribute)
            }
        }
    )
    let fitLevel = ''
    if (fitScore >= 90) {
        fitLevel = 'excellent'
    } else if (fitScore >= 75) {
        fitLevel = 'strong'
    } else if (fitScore >= 60) {
        fitLevel = 'moderate'
    } else {
        fitLevel = 'weak'
    }
    const strengthsText = 
      strengths.length > 0
        ? strengths.join(', ')
        : club.priorities.join(', ')
    return `${player.name} is an ${fitLevel} fit for ${club.clubName}'s ${club.style.toLowerCase()} system. His profile aligns particularly well through ${strengthsText}, making him well suited to the club's tactical requirements.`
}