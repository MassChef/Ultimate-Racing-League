import Image from "next/image";
import Link from "next/link";

const leaderboard = [
  { rank: "01", driver: "Maya Cross", track: "Queens Circuit", time: "01:28.442" },
  { rank: "02", driver: "Andre Vale", track: "Manhattan Sprint", time: "01:29.118" },
  { rank: "03", driver: "Tessa King", track: "Bronx Loop", time: "01:29.604" },
  { rank: "04", driver: "Jon Bell", track: "Brooklyn Dash", time: "01:30.021" },
];

const signals = [
  ["API Source", "Upland.me"],
  ["Publishing", "Live Results"],
  ["League Focus", "Race Times"],
  ["Format", "Esports Motorsport"],
];

const raceCards = [
  { label: "Latest Sync", value: "Ready for API", detail: "Awaiting Upland endpoint connection" },
  { label: "Timing Model", value: "Fastest Wins", detail: "Custom rankings by time, track, and season" },
  { label: "Public Access", value: "Open Grid", detail: "Results and leaderboards visible to every fan" },
];

export default function Home() {
  return (
    <main className="site-shell">
      <section className="hero-stage">
        <nav className="topbar">
          <Link href="/" className="brand-lockup" aria-label="Ultimate Racing League home">
            <Image
              src="/url-logo-standard.png"
              alt="Ultimate Racing League logo"
              width={96}
              height={96}
              priority
            />
            <span>Ultimate Racing League</span>
          </Link>
          <div className="topbar-links">
            <Link href="/leaderboard">Standings</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/auth">Login</Link>
          </div>
        </nav>

        <div className="hero-grid">
          <section className="hero-copy">
            <p className="eyebrow">Upland.me Racing Intelligence</p>
            <h1>Professional esports timing for the URL grid.</h1>
            <p className="hero-summary">
              Ultimate Racing League turns Upland race data into public results,
              custom time-based leaderboards, team standings, and a motorsport
              broadcast experience built around the official URL identity.
            </p>
            <div className="hero-actions">
              <Link className="button-primary" href="/leaderboard">
                View leaderboard
              </Link>
              <Link className="button-secondary" href="/dashboard">
                League dashboard
              </Link>
            </div>
          </section>

          <section className="hero-crest" aria-label="Ultimate Racing League brand">
            <div className="crest-orbit">
              <Image
                src="/url-logo-standard.png"
                alt="Ultimate Racing League shield logo"
                width={520}
                height={520}
                priority
              />
            </div>
            <div className="broadcast-strip">
              <span>Est. 2022</span>
              <strong>Live Timing Era</strong>
            </div>
          </section>
        </div>
      </section>

      <section className="signal-grid" aria-label="League platform signals">
        {signals.map(([label, value]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>

      <section className="content-band">
        <div className="section-heading">
          <p className="eyebrow">Race Control</p>
          <h2>Built for API-powered competition.</h2>
        </div>

        <div className="race-card-grid">
          {raceCards.map((card) => (
            <article className="race-card" key={card.label}>
              <span>{card.label}</span>
              <h3>{card.value}</h3>
              <p>{card.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="leaderboard-band">
        <div className="leaderboard-heading">
          <div>
            <p className="eyebrow">Timing Tower</p>
            <h2>Fastest published race times.</h2>
          </div>
          <Link href="/leaderboard">Full standings</Link>
        </div>

        <div className="timing-table">
          {leaderboard.map((row) => (
            <article className="timing-row" key={row.rank}>
              <span>{row.rank}</span>
              <strong>{row.driver}</strong>
              <p>{row.track}</p>
              <time>{row.time}</time>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
