import Link from "next/link";

const standings = [
  ["Maya Cross", "Redline Syndicate", 248, 6],
  ["Andre Vale", "North Loop", 231, 5],
  ["Tessa King", "Velocity Works", 219, 4],
  ["Jon Bell", "Forge Motorsport", 201, 3],
  ["Nadia Stone", "Blue Apex", 188, 2],
];

export default function LeaderboardPage() {
  return (
    <main className="page-shell">
      <div className="section-header">
        <Link href="/" className="back-link">
          Ultimate Racing League
        </Link>
        <h1>Leaderboard</h1>
      </div>

      <section className="table-panel">
        <div className="table-row table-head">
          <span>Rank</span>
          <span>Driver</span>
          <span>Team</span>
          <span>Wins</span>
          <span>Points</span>
        </div>
        {standings.map(([driver, team, points, wins], index) => (
          <div className="table-row" key={driver}>
            <span>{index + 1}</span>
            <strong>{driver}</strong>
            <span>{team}</span>
            <span>{wins}</span>
            <span>{points}</span>
          </div>
        ))}
      </section>
    </main>
  );
}
