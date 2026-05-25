import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'

import type { Player } from '../../types/player'

type AttributeRadarProps = {
  player: Player
}

function AttributeRadar({
  player,
}: AttributeRadarProps) {
  const data = [
    {
      axis: 'Passing',
      value: player.attributes.passing,
    },
    {
      axis: 'Dribbling',
      value: player.attributes.dribbling,
    },
    {
      axis: 'Defending',
      value: player.attributes.defending,
    },
    {
      axis: 'Physical',
      value: player.attributes.physical,
    },
    {
      axis: 'Vision',
      value: player.attributes.vision,
    },
  ]

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer>
        <RadarChart
          data={data}
          outerRadius="75%"
        >
          <PolarGrid stroke="#1f2937" />

          <PolarAngleAxis
            dataKey="axis"
            tick={{
              fill: '#9ca3af',
              fontSize: 12,
            }}
          />

          <PolarRadiusAxis
            axisLine={false}
            tick={false}
            domain={[0, 100]}
          />

          <Radar
            dataKey="value"
            stroke="#4ade80"
            fill="#4ade80"
            fillOpacity={0.35}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AttributeRadar