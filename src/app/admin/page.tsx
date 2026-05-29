"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { canManageSite, formatRole, getUserRole, SiteRole } from "@/lib/roles";
import { supabase } from "@/lib/supabase";

const queue = [
  ["Friday Night Qualifier", "Maya Cross", "01:28.442"],
  ["Quarter-Mile Clash", "Andre Vale", "09.812"],
  ["Summit Sprint", "Nadia Stone", "03:42.109"],
];

type AdminState = "loading" | "signed-out" | "not-manager" | "manager";

export default function AdminPage() {
  const [adminState, setAdminState] = useState<AdminState>("loading");
  const [role, setRole] = useState<SiteRole | null>(null);

  useEffect(() => {
    async function loadAdminState() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setAdminState("signed-out");
        return;
      }

      const userRole = await getUserRole(user.id);

      setRole(userRole);
      setAdminState(canManageSite(userRole) ? "manager" : "not-manager");
    }

    loadAdminState();
  }, []);

  if (adminState !== "manager") {
    return (
      <main className="page-shell">
        <div className="section-header">
          <Link href="/" className="back-link">
            Ultimate Racing League
          </Link>
          <h1>Admin Dashboard</h1>
        </div>

        <section className="form-panel wide">
          <h2>
            {adminState === "loading"
              ? "Checking access"
              : adminState === "signed-out"
                ? "Login required"
                : "Admin or Owner access required"}
          </h2>
          <p className="form-status">
            {adminState === "loading"
              ? "Checking your URL role..."
              : adminState === "signed-out"
                ? "Log in with an admin account to manage the site."
                : "Your account is signed in, but it is not marked as Admin or Owner."}
          </p>
          <Link className="button-primary" href="/auth">
            Go to login
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <div className="section-header">
        <Link href="/" className="back-link">
          Ultimate Racing League
        </Link>
        <h1>Admin Dashboard</h1>
        {role ? <p className="form-status">Signed in as {formatRole(role)}.</p> : null}
      </div>

      <section className="approval-list">
        <Link className="action-card" href="/admin/content">
          Edit Homepage Content
        </Link>

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
