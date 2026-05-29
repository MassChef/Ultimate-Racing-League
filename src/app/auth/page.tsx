"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { canManageSite, getUserRole } from "@/lib/roles";
import { supabase } from "@/lib/supabase";

type AuthMode = "login" | "register";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const response =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                display_name: displayName,
              },
            },
          });

    setIsSubmitting(false);

    if (response.error) {
      setStatus(response.error.message);
      return;
    }

    if (mode === "register") {
      setStatus("Account created. Check your email if confirmation is enabled.");
      return;
    }

    const userId = response.data.user?.id;

    if (!userId) {
      setStatus("Logged in successfully.");
      router.push("/dashboard");
      return;
    }

    const role = await getUserRole(userId);

    setStatus("Logged in successfully.");
    router.push(canManageSite(role) ? "/admin" : "/dashboard");
  }

  return (
    <main className="page-shell">
      <div className="section-header">
        <Link href="/" className="back-link">
          Ultimate Racing League
        </Link>
        <h1>Login / Register</h1>
      </div>

      <section className="form-panel wide">
        <div className="auth-tabs" aria-label="Authentication mode">
          <button
            className={mode === "login" ? "active" : ""}
            type="button"
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={mode === "register" ? "active" : ""}
            type="button"
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>{mode === "login" ? "Driver Login" : "Create URL Account"}</h2>

          {mode === "register" ? (
            <label>
              Display name
              <input
                type="text"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="Apex Driver"
                required
              />
            </label>
          ) : null}

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="driver@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              minLength={6}
              required
            />
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Working..."
              : mode === "login"
                ? "Login"
                : "Create account"}
          </button>

          {status ? <p className="form-status">{status}</p> : null}
        </form>

        <div className="auth-links">
          <Link href="/dashboard">Go to dashboard</Link>
          <Link href="/admin">Go to admin dashboard</Link>
        </div>
      </section>
    </main>
  );
}
