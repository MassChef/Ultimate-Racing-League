import Link from "next/link";

const queue = [
  ["Friday Night Qualifier", "Maya Cross", "01:28.442"],
  ["Quarter-Mile Clash", "Andre Vale", "09.812"],
  ["Summit Sprint", "Nadia Stone", "03:42.109"],
];

export default function AdminPage() {
  return (
    <main className="page-shell">
      <div className="section-header">
        <Link href="/" className="back-link">
          Ultimate Racing League
        </Link>
        <h1>Admin Approval Page</h1>
      </div>

      <section className="approval-list">
        {queue.map(([race, driver, time]) => (
          <article className="approval-item" key={`${race}-${driver}`}>
            <div>
              <span>{race}</span>
              <strong>{driver}</strong>
              <p>{time}</p>
            </div>
            <div className="approval-actions">
              <button type="button">Approve</button>
              <button type="button" className="ghost-button">
                Review
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
