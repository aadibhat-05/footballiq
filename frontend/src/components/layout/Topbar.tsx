import { Bell, Search } from 'lucide-react'

function Topbar() {
  return (
    <header className="flex h-[70px] items-center justify-between border-b border-gray-800 bg-gray-900 px-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2">
          <Search size={18} className="text-gray-400" />

          <input
            placeholder="Search players..."
            className="bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
          />
        </div>
      </div>

      <button className="rounded-full p-2 transition hover:bg-gray-800">
        <Bell size={20} className="text-gray-300" />
      </button>
    </header>
  )
}

export default Topbar