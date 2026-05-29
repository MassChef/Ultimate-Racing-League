"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import {
  defaultHomepageContent,
  HomepageContent,
  normalizeHomepageContent,
} from "@/lib/site-content";
import { supabase } from "@/lib/supabase";

type SaveState = "idle" | "loading" | "saving";

export default function AdminContentPage() {
  const [content, setContent] = useState<HomepageContent>(defaultHomepageContent);
  const [status, setStatus] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("loading");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function loadContent() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsLoggedIn(Boolean(user));

      const { data } = await supabase
        .from("site_content")
        .select("content")
        .eq("key", "homepage")
        .maybeSingle();

      setContent(normalizeHomepageContent(data?.content));
      setSaveState("idle");
    }

    loadContent();
  }, []);

  function updateField(field: keyof HomepageContent, value: string) {
    setContent((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function updateJsonField<T extends "signals" | "raceCards" | "timingRows">(
    field: T,
    value: string,
  ) {
    try {
      const parsed = JSON.parse(value);
      setStatus("");
      setContent((current) => ({
        ...current,
        [field]: parsed,
      }));
    } catch {
      setStatus("The JSON field has a formatting issue. Fix it before saving.");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveState("saving");
    setStatus("");

    const { error } = await supabase.from("site_content").upsert({
      key: "homepage",
      content,
      updated_at: new Date().toISOString(),
    });

    setSaveState("idle");

    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus("Homepage content saved.");
  }

  if (saveState === "loading") {
    return (
      <main className="page-shell">
        <div className="section-header">
          <Link href="/admin" className="back-link">
            Admin
          </Link>
          <h1>Content Editor</h1>
        </div>
        <p className="form-status">Loading content editor...</p>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="page-shell">
        <div className="section-header">
          <Link href="/" className="back-link">
            Ultimate Racing League
          </Link>
          <h1>Content Editor</h1>
        </div>
        <section className="form-panel wide">
          <h2>Admin login required</h2>
          <p className="form-status">
            Log in before editing site content. After login, return to this page.
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
        <Link href="/admin" className="back-link">
          Admin
        </Link>
        <h1>Content Editor</h1>
      </div>

      <form className="form-panel admin-editor" onSubmit={handleSubmit}>
        <h2>Homepage</h2>

        <label>
          Eyebrow
          <input
            value={content.eyebrow}
            onChange={(event) => updateField("eyebrow", event.target.value)}
          />
        </label>

        <label>
          Headline
          <textarea
            value={content.headline}
            onChange={(event) => updateField("headline", event.target.value)}
          />
        </label>

        <label>
          Summary
          <textarea
            value={content.summary}
            onChange={(event) => updateField("summary", event.target.value)}
          />
        </label>

        <div className="form-grid">
          <label>
            Primary button
            <input
              value={content.primaryCta}
              onChange={(event) => updateField("primaryCta", event.target.value)}
            />
          </label>
          <label>
            Secondary button
            <input
              value={content.secondaryCta}
              onChange={(event) => updateField("secondaryCta", event.target.value)}
            />
          </label>
        </div>

        <div className="form-grid">
          <label>
            Broadcast label
            <input
              value={content.broadcastLabel}
              onChange={(event) => updateField("broadcastLabel", event.target.value)}
            />
          </label>
          <label>
            Broadcast value
            <input
              value={content.broadcastValue}
              onChange={(event) => updateField("broadcastValue", event.target.value)}
            />
          </label>
        </div>

        <div className="form-grid">
          <label>
            Race control eyebrow
            <input
              value={content.raceControlEyebrow}
              onChange={(event) =>
                updateField("raceControlEyebrow", event.target.value)
              }
            />
          </label>
          <label>
            Race control headline
            <input
              value={content.raceControlHeadline}
              onChange={(event) =>
                updateField("raceControlHeadline", event.target.value)
              }
            />
          </label>
        </div>

        <div className="form-grid">
          <label>
            Leaderboard eyebrow
            <input
              value={content.leaderboardEyebrow}
              onChange={(event) =>
                updateField("leaderboardEyebrow", event.target.value)
              }
            />
          </label>
          <label>
            Leaderboard headline
            <input
              value={content.leaderboardHeadline}
              onChange={(event) =>
                updateField("leaderboardHeadline", event.target.value)
              }
            />
          </label>
        </div>

        <label>
          Signal blocks JSON
          <textarea
            value={JSON.stringify(content.signals, null, 2)}
            onChange={(event) => updateJsonField("signals", event.target.value)}
          />
        </label>

        <label>
          Race cards JSON
          <textarea
            value={JSON.stringify(content.raceCards, null, 2)}
            onChange={(event) => updateJsonField("raceCards", event.target.value)}
          />
        </label>

        <label>
          Timing rows JSON
          <textarea
            value={JSON.stringify(content.timingRows, null, 2)}
            onChange={(event) => updateJsonField("timingRows", event.target.value)}
          />
        </label>

        <button type="submit" disabled={saveState === "saving"}>
          {saveState === "saving" ? "Saving..." : "Save homepage content"}
        </button>

        {status ? <p className="form-status">{status}</p> : null}
      </form>
    </main>
  );
}
