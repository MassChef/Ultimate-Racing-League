"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { canManageSite, formatRole, getUserRole, SiteRole } from "@/lib/roles";
import { supabase } from "@/lib/supabase";

type AuthState = {
  email: string | null;
  role: SiteRole | null;
};

export function AuthNav() {
  const [authState, setAuthState] = useState<AuthState>({
    email: null,
    role: null,
  });

  useEffect(() => {
    async function loadAuthState() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setAuthState({ email: null, role: null });
        return;
      }

      const role = await getUserRole(user.id);

      setAuthState({
        email: user.email ?? "Signed in",
        role,
      });
    }

    loadAuthState();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadAuthState();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setAuthState({ email: null, role: null });
  }

  if (!authState.email) {
    return (
      <div className="topbar-links">
        <Link href="/">Home</Link>
        <Link href="/leaderboard">Standings</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/auth">Login</Link>
      </div>
    );
  }

  return (
    <div className="topbar-links">
      <Link href="/">Home</Link>
      <Link href="/leaderboard">Standings</Link>
      <Link href="/dashboard">Dashboard</Link>
      {canManageSite(authState.role) ? <Link href="/admin">Admin</Link> : null}
      {authState.role === "sponsor" ? <Link href="/sponsor">Sponsor</Link> : null}
      {authState.role ? <span>{formatRole(authState.role)}</span> : null}
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
