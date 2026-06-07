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
    const weaknesses: string[] = []
    club.priorities.forEach(
        (attribute) => {
            const value =
              player.attributes[
                attribute as keyof typeof player.attributes
              ]
            if (value >= 90) {
                strengths.push(attribute)
            }
            if (value < 75) {
                weaknesses.push(attribute)
            }
        }
    )

    let fitLevel = ''
    if (fitScore >= 90) {
        fitLevel = 'excellent'
    } else if (fitScore >= 75) {
        fitLevel = 'very good'
    } else if (fitScore >= 60) {
        fitLevel = 'moderate'
    } else {
        fitLevel = 'weak'
    }
    const strengthsText = 
      strengths.length > 0
        ? strengths.join(', ')
        : club.priorities.join(', ')
    const weaknessText =
      weaknesses.length > 0
        ? weaknesses.join(', ')
        : null
    let report =
      `${player.name} is a ${fitLevel} fit for ${club.clubName}'s ${club.style.toLowerCase()} system. His profile aligns particularly well through ${strengthsText}.`
    if (weaknessText) {
        report += ` Areas of concern include ${weaknessText}, which may reduce his effectiveness in certain tactical situations.`
    }
    
    report += ` Overall, he projects as a viable recruitment target for the club's current playing model.`
    return report
}