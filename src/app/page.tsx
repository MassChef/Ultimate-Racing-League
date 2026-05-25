import Link from "next/link";

const raceTypes = ["Drag", "Circuit", "Street", "Time Attack"];

const upcomingRaces = [
  { title: "Friday Night Qualifier", track: "Maple Ridge Circuit", date: "Jun 07" },
  { title: "Quarter-Mile Clash", track: "Harbor Dragway", date: "Jun 14" },
  { title: "Summit Sprint", track: "Apex Mountain Run", date: "Jun 22" },
];

const leaders = [
  { rank: 1, name: "Maya Cross", team: "Redline Syndicate", points: 248 },
  { rank: 2, name: "Andre Vale", team: "North Loop", points: 231 },
  { rank: 3, name: "Tessa King", team: "Velocity Works", points: 219 },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f3f5f2] text-[#151817]">
      <section className="grid min-h-[92vh] grid-cols-1 bg-[url('/window.svg')] bg-[length:520px] bg-[right_2rem_top_4rem] bg-no-repeat lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-between px-6 py-6 sm:px-10 lg:px-14">
          <nav className="flex items-center justify-between gap-4">
            <Link href="/" className="text-lg font-black uppercase tracking-wide">
              Ultimate Racing League
            </Link>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Link className="nav-link" href="/leaderboard">
                Standings
              </Link>
              <Link className="nav-link" href="/auth">
                Login
              </Link>
            </div>
          </nav>

          <div className="max-w-3xl py-20 lg:py-0">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-[#b42318]">
              Season One Opens Soon
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] sm:text-7xl lg:text-8xl">
              Track every race, ruling, and rival.
            </h1>
            <p className="mt-8 max-w-2xl text-lg font-medium leading-8 text-[#424846]">
              A league hub for drivers, teams, officials, and fans to submit results,
              approve finishes, and keep the championship table honest.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link className="button-primary" href="/auth">
                Join the league
              </Link>
              <Link className="button-secondary" href="/submit-result">
                Submit result
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pb-2">
            {raceTypes.map((type) => (
              <span className="tag" key={type}>
                {type}
              </span>
            ))}
          </div>
        </div>

        <aside className="grid content-end gap-5 bg-[#171b1a] px-6 py-8 text-white sm:px-10 lg:px-12">
          <div className="track-visual" aria-hidden="true">
            <div className="track-line" />
            <div className="timing-board">
              <span>Fastest Lap</span>
              <strong>01:28.442</strong>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {upcomingRaces.map((race) => (
              <article className="race-card" key={race.title}>
                <span>{race.date}</span>
                <h2>{race.title}</h2>
                <p>{race.track}</p>
              </article>
            ))}
          </div>

          <section className="panel">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-black">Top Drivers</h2>
              <Link className="text-sm font-bold text-[#7dd3fc]" href="/leaderboard">
                Full table
              </Link>
            </div>
            <div className="grid gap-3">
              {leaders.map((driver) => (
                <div className="standing-row" key={driver.name}>
                  <span className="rank">{driver.rank}</span>
                  <div>
                    <strong>{driver.name}</strong>
                    <p>{driver.team}</p>
                  </div>
                  <span className="points">{driver.points}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
