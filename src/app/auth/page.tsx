import Link from "next/link";

export default function AuthPage() {
  return (
    <main className="page-shell">
      <div className="section-header">
        <Link href="/" className="back-link">
          Ultimate Racing League
        </Link>
        <h1>Login / Register</h1>
      </div>

      <section className="form-grid">
        <form className="form-panel">
          <h2>Driver Login</h2>
          <label>
            Email
            <input type="email" placeholder="driver@example.com" />
          </label>
          <label>
            Password
            <input type="password" placeholder="Password" />
          </label>
          <button type="button">Login</button>
        </form>

        <form className="form-panel">
          <h2>Register Team Account</h2>
          <label>
            Display name
            <input type="text" placeholder="Apex Driver" />
          </label>
          <label>
            Email
            <input type="email" placeholder="team@example.com" />
          </label>
          <label>
            Password
            <input type="password" placeholder="Create password" />
          </label>
          <button type="button">Create account</button>
        </form>
      </section>
    </main>
  );
}
