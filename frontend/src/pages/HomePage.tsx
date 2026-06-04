import { Link } from 'react-router-dom'

import {
  ArrowRight,
  Search,
  Scale,
  Users,
  Target,
  Trophy,
  BarChart3,
} from 'lucide-react'

import { players } from '../data/players'

function HomePage() {
  const featuredPlayers = [...players]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)

  return (
    <div>
      <section className="relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.18),transparent_60%)]" />
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative px-8 py-16 lg:px-12 lg:py-24">
          <span className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
            FootballIQ • AI Scouting Suite 
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-tight lg:text-7xl">
            Tactical Intelligence
            <br />
            For The Modern Game.
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-gray-400">
            Analyze elite football talent,
            compare player profiles,
            discover similar players,
            and evaluate transfer fit
            through FootballIQ's
            scouting tools.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/players"
              className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 font-semibold text-black transition hover:bg-green-400"
            >
              Browse Players
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/scouting"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-700 px-5 py-3 transition hover:border-green-500"
            >
              Open Scouting
            </Link>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">
              <p className="text-sm text-gray-500">
                Players Profiled
              </p>

              <p className="mt-2 text-3xl font-bold text-green-400">
                16
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">
              <p className="text-sm text-gray-500">
                Top Leagues
              </p>

              <p className="mt-2 text-3xl font-bold text-green-400">
                7
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">
              <p className="text-sm text-gray-500">
                Attribute Datapoints
              </p>

              <p className="mt-2 text-3xl font-bold text-green-400">
                112
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-950 p-5">
              <p className="text-sm text-gray-500">
                Scouting Tools
              </p>

              <p className="mt-2 text-3xl font-bold text-green-400">
                4
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="px-8 py-14 lg:px-12">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
            Capabilities
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Built For Modern Recruitment
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: Search,
              title: 'Player Analysis',
              description:
                'Detailed player profiles with ratings, attributes and scouting summaries.',
            },
            {
              icon: Scale,
              title: 'Player Comparison',
              description:
                'Compare two players side by side and identify key advantages.',
            },
            {
              icon: Users,
              title: 'Similar Players',
              description:
                'Discover players with similar technical and tactical profiles.',
            },
            {
              icon: Target,
              title: 'Transfer Fit Analysis',
              description:
                'Evaluate how well a player fits a club tactical system.',
            },
            {
              icon: Trophy,
              title: 'League Benchmarking',
              description:
                'Compare talent across Europe’s top leagues.',
            },
            {
              icon: BarChart3,
              title: 'Shortlists',
              description:
                'Save and organize scouting targets for future evaluation.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-800 bg-gray-950 p-6 transition hover:border-green-500/40"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
                <item.icon size={18} />
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 pb-16 lg:px-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
              Featured Players
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Top Rated Talent
            </h2>
          </div>

          <Link
            to="/players"
            className="flex items-center gap-2 text-green-400 hover:underline"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredPlayers.map((player) => (
            <div
              key={player.id}
              className="rounded-2xl border border-gray-800 bg-gray-950 p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold">
                    {player.name}
                  </h3>

                  <p className="text-gray-400">
                    {player.club}
                  </p>
                </div>

                <div className="rounded-lg bg-green-500/10 px-3 py-2 text-green-400">
                  {player.rating}
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-400">
                {player.position}
              </p>

              <Link
                to={`/player/${player.id}`}
                className="mt-6 inline-block rounded-lg border border-gray-700 px-4 py-2 text-sm hover:border-green-500"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage