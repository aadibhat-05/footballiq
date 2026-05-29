type SimilarPlayer = {
  player: {
    id: number
    name: string
    club: string
  }
  similarity: number
}

type SimilarPlayersPanelProps = {
  similarPlayers: SimilarPlayer[]
}

function SimilarPlayersPanel({
  similarPlayers,
}: SimilarPlayersPanelProps) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-950 p-8">
      <p className="text-sm uppercase tracking-widest text-gray-500">
        Similar Players
      </p>

      <div className="mt-6 space-y-5">
        {similarPlayers.map(
          ({ player, similarity }) => (
            <div
              key={player.id}
              className="rounded-xl border border-gray-800 bg-gray-900 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">
                    {player.name}
                  </p>

                  <p className="text-sm text-gray-400">
                    {player.club}
                  </p>
                </div>

                <p className="font-semibold text-green-400">
                  {similarity}%
                </p>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-800">
                <div
                  className="h-full rounded-full bg-green-400"
                  style={{
                    width: `${similarity}%`,
                  }}
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default SimilarPlayersPanel