type StatsCardProps = {
  value: string
  label: string
}

function StatsCard({
  value,
  label,
}: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6">
      <h3 className="text-3xl font-bold text-green-400">
        {value}
      </h3>

      <p className="mt-2 text-sm text-gray-400">
        {label}
      </p>
    </div>
  )
}

export default StatsCard