export function formatMarketValue(
  value: number
) {
  if (value >= 1_000_000_000) {
    const billions = value / 1_000_000_000

    return `€${
      Number.isInteger(billions)
        ? billions
        : billions.toFixed(1)
    }B`
  }

  if (value >= 1_000_000) {
    const millions = value / 1_000_000

    return `€${
      Number.isInteger(millions)
        ? millions
        : millions.toFixed(1)
    }M`
  }

  if (value >= 1_000) {
    return `€${Math.round(value / 1000)}K`
  }

  return `€${value}`
}