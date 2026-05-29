"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type AuthState = {
  email: string | null;
  isAdmin: boolean;
};

export function AuthNav() {
  const [authState, setAuthState] = useState<AuthState>({
    email: null,
    isAdmin: false,
  });

  useEffect(() => {
    async function loadAuthState() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setAuthState({ email: null, isAdmin: false });
        return;
      }

      const { data } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      setAuthState({
        email: user.email ?? "Signed in",
        isAdmin: Boolean(data),
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
    setAuthState({ email: null, isAdmin: false });
  }

  if (!authState.email) {
    return (
      <div className="topbar-links">
        <Link href="/leaderboard">Standings</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/auth">Login</Link>
      </div>
    );
  }

  return (
    <div className="topbar-links">
      <Link href="/leaderboard">Standings</Link>
      <Link href="/dashboard">Dashboard</Link>
      {authState.isAdmin ? <Link href="/admin">Admin</Link> : null}
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
