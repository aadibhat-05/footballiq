import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-8 py-24">
        <p className="text-sm uppercase tracking-widest text-green-400">
          FootballIQ
        </p>

        <h1 className="mt-6 text-6xl font-bold">
          Smarter Football
          Recruitment
        </h1>

        <p className="mt-6 max-w-2xl text-xl text-gray-400">
          Analyze players, compare talent,
          build recruitment shortlists,
          and generate scouting insights.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            to="/signup"
            className="rounded-xl bg-green-500 px-6 py-3 font-semibold text-black"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="rounded-xl border border-gray-700 px-6 py-3"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage