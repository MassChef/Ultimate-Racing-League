import Link from "next/link";

export default function SubmitResultPage() {
  return (
    <main className="page-shell">
      <div className="section-header">
        <Link href="/" className="back-link">
          Ultimate Racing League
        </Link>
        <h1>Submit Race Result</h1>
      </div>

      <form className="form-panel wide">
        <label>
          Race
          <input type="text" placeholder="Friday Night Qualifier" />
        </label>
        <label>
          Driver
          <input type="text" placeholder="Driver name" />
        </label>
        <label>
          Vehicle
          <input type="text" placeholder="Vehicle" />
        </label>
        <label>
          Finish position
          <input type="number" min="1" placeholder="1" />
        </label>
        <label>
          Official time
          <input type="text" placeholder="01:28.442" />
        </label>
        <label>
          Notes
          <textarea placeholder="Steward notes, penalties, or video reference" />
        </label>
        <button type="button">Send for approval</button>
      </form>
    </main>
  );
}
