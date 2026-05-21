function AppSidebar() {
  return (
    <aside className="w-64 border-r border-gray-800 bg-gray-950 p-6">
      <h2 className="mb-8 text-2xl font-bold text-white">
        FootballIQ
      </h2>

      <nav className="flex flex-col gap-4 text-gray-300">
        <button className="rounded-lg bg-green-500/10 px-4 py-3 text-left text-green-400 transition hover:bg-green-500/20">
          Dashboard
        </button>

        <button className="rounded-lg px-4 py-3 text-left transition hover:bg-gray-800">
          Players
        </button>

        <button className="rounded-lg px-4 py-3 text-left transition hover:bg-gray-800">
          Scouting
        </button>

        <button className="rounded-lg px-4 py-3 text-left transition hover:bg-gray-800">
          Shortlists
        </button>
      </nav>
    </aside>
  )
}

export default AppSidebar