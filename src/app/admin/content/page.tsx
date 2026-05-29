"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import {
  defaultHomepageContent,
  HomepageContent,
  RaceCard,
  Signal,
  TimingRow,
  normalizeHomepageContent,
} from "@/lib/site-content";
import { supabase } from "@/lib/supabase";

type SaveState = "idle" | "loading" | "saving";

type EditableList = "signals" | "raceCards" | "timingRows";

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

  function updateListItem<T extends EditableList>(
    list: T,
    index: number,
    field: keyof HomepageContent[T][number],
    value: string,
  ) {
    setContent((current) => ({
      ...current,
      [list]: current[list].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function addListItem(list: EditableList) {
    setContent((current) => {
      const newItem =
        list === "signals"
          ? ({ label: "New Label", value: "New Value" } satisfies Signal)
          : list === "raceCards"
            ? ({
                label: "New Card",
                value: "Card Title",
                detail: "Card detail",
              } satisfies RaceCard)
            : ({
                rank: "00",
                driver: "Driver Name",
                track: "Track Name",
                time: "00:00.000",
              } satisfies TimingRow);

      return {
        ...current,
        [list]: [...current[list], newItem],
      };
    });
  }

  function removeListItem(list: EditableList, index: number) {
    setContent((current) => ({
      ...current,
      [list]: current[list].filter((_, itemIndex) => itemIndex !== index),
    }));
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

    setStatus("Homepage content saved. The public page may take up to 60 seconds to refresh.");
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
        <section className="editor-section">
          <h2>Hero</h2>

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
        </section>

        <section className="editor-section">
          <h2>Buttons</h2>
          <div className="form-grid">
            <label>
              Primary button label
              <input
                value={content.primaryCta}
                onChange={(event) => updateField("primaryCta", event.target.value)}
              />
            </label>
            <label>
              Primary button link
              <input
                value={content.primaryCtaHref}
                onChange={(event) =>
                  updateField("primaryCtaHref", event.target.value)
                }
                placeholder="/leaderboard"
              />
            </label>
          </div>

          <div className="form-grid">
            <label>
              Secondary button label
              <input
                value={content.secondaryCta}
                onChange={(event) => updateField("secondaryCta", event.target.value)}
              />
            </label>
            <label>
              Secondary button link
              <input
                value={content.secondaryCtaHref}
                onChange={(event) =>
                  updateField("secondaryCtaHref", event.target.value)
                }
                placeholder="/dashboard"
              />
            </label>
          </div>
        </section>

        <section className="editor-section">
          <h2>Broadcast Strip</h2>
          <div className="form-grid">
            <label>
              Small label
              <input
                value={content.broadcastLabel}
                onChange={(event) => updateField("broadcastLabel", event.target.value)}
              />
            </label>
            <label>
              Main text
              <input
                value={content.broadcastValue}
                onChange={(event) => updateField("broadcastValue", event.target.value)}
              />
            </label>
          </div>
        </section>

        <section className="editor-section">
          <h2>Race Control Section</h2>
          <div className="form-grid">
            <label>
              Eyebrow
              <input
                value={content.raceControlEyebrow}
                onChange={(event) =>
                  updateField("raceControlEyebrow", event.target.value)
                }
              />
            </label>
            <label>
              Headline
              <input
                value={content.raceControlHeadline}
                onChange={(event) =>
                  updateField("raceControlHeadline", event.target.value)
                }
              />
            </label>
          </div>
        </section>

        <section className="editor-section">
          <div className="editor-section-header">
            <h2>Signal Blocks</h2>
            <button type="button" onClick={() => addListItem("signals")}>
              Add Signal
            </button>
          </div>

          {content.signals.map((signal, index) => (
            <div className="editor-row" key={`${signal.label}-${index}`}>
              <label>
                Label
                <input
                  value={signal.label}
                  onChange={(event) =>
                    updateListItem("signals", index, "label", event.target.value)
                  }
                />
              </label>
              <label>
                Value
                <input
                  value={signal.value}
                  onChange={(event) =>
                    updateListItem("signals", index, "value", event.target.value)
                  }
                />
              </label>
              <button type="button" onClick={() => removeListItem("signals", index)}>
                Remove
              </button>
            </div>
          ))}
        </section>

        <section className="editor-section">
          <div className="editor-section-header">
            <h2>Race Cards</h2>
            <button type="button" onClick={() => addListItem("raceCards")}>
              Add Card
            </button>
          </div>

          {content.raceCards.map((card, index) => (
            <div className="editor-row stacked" key={`${card.label}-${index}`}>
              <div className="form-grid">
                <label>
                  Label
                  <input
                    value={card.label}
                    onChange={(event) =>
                      updateListItem("raceCards", index, "label", event.target.value)
                    }
                  />
                </label>
                <label>
                  Title
                  <input
                    value={card.value}
                    onChange={(event) =>
                      updateListItem("raceCards", index, "value", event.target.value)
                    }
                  />
                </label>
              </div>
              <label>
                Detail
                <input
                  value={card.detail}
                  onChange={(event) =>
                    updateListItem("raceCards", index, "detail", event.target.value)
                  }
                />
              </label>
              <button type="button" onClick={() => removeListItem("raceCards", index)}>
                Remove Card
              </button>
            </div>
          ))}
        </section>

        <section className="editor-section">
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

          <div className="editor-section-header">
            <h2>Timing Rows</h2>
            <button type="button" onClick={() => addListItem("timingRows")}>
              Add Row
            </button>
          </div>

          {content.timingRows.map((row, index) => (
            <div className="editor-row timing-editor-row" key={`${row.rank}-${index}`}>
              <label>
                Rank
                <input
                  value={row.rank}
                  onChange={(event) =>
                    updateListItem("timingRows", index, "rank", event.target.value)
                  }
                />
              </label>
              <label>
                Driver
                <input
                  value={row.driver}
                  onChange={(event) =>
                    updateListItem("timingRows", index, "driver", event.target.value)
                  }
                />
              </label>
              <label>
                Track
                <input
                  value={row.track}
                  onChange={(event) =>
                    updateListItem("timingRows", index, "track", event.target.value)
                  }
                />
              </label>
              <label>
                Time
                <input
                  value={row.time}
                  onChange={(event) =>
                    updateListItem("timingRows", index, "time", event.target.value)
                  }
                />
              </label>
              <button type="button" onClick={() => removeListItem("timingRows", index)}>
                Remove
              </button>
            </div>
          ))}
        </section>

        <button type="submit" disabled={saveState === "saving"}>
          {saveState === "saving" ? "Saving..." : "Save homepage content"}
        </button>

        {status ? <p className="form-status">{status}</p> : null}
      </form>
    </main>
  );
}
