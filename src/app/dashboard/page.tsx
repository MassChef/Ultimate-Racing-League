import Link from "next/link";

const stats = [
  ["Pending approvals", "7"],
  ["Active drivers", "128"],
  ["Season races", "18"],
  ["Teams", "24"],
];

export default function DashboardPage() {
  return (
    <main className="page-shell">
      <div className="section-header">
        <Link href="/" className="back-link">
          Ultimate Racing League
        </Link>
        <h1>Dashboard</h1>
      </div>

      <section className="stat-grid">
        {stats.map(([label, value]) => (
          <article className="stat-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>

      <section className="action-grid">
        <Link className="action-card" href="/submit-result">
          Submit Race Result
        </Link>
        <Link className="action-card" href="/leaderboard">
          View Leaderboard
        </Link>
        <Link className="action-card" href="/admin">
          Admin Approval Page
        </Link>
      </section>
    </main>
  );
}
