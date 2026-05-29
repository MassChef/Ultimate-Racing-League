import Image from "next/image";
import Link from "next/link";
import { AuthNav } from "@/components/auth-nav";
import { defaultHomepageContent, normalizeHomepageContent } from "@/lib/site-content";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

async function getHomepageContent() {
  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("key", "homepage")
    .maybeSingle();

  if (error) {
    return defaultHomepageContent;
  }

  return normalizeHomepageContent(data?.content);
}

export default async function Home() {
  const content = await getHomepageContent();

  return (
    <main className="site-shell">
      <section className="hero-stage">
        <nav className="topbar">
          <Link href="/" className="brand-lockup" aria-label="Ultimate Racing League home">
            <Image
              src="/url-logo-standard.png"
              alt="Ultimate Racing League logo"
              width={96}
              height={96}
              priority
            />
            <span>Ultimate Racing League</span>
          </Link>
          <AuthNav />
        </nav>

        <div className="hero-grid">
          <section className="hero-copy">
            <p className="eyebrow">{content.eyebrow}</p>
            <h1>{content.headline}</h1>
            <p className="hero-summary">{content.summary}</p>
            <div className="hero-actions">
              <Link className="button-primary" href={content.primaryCtaHref}>
                {content.primaryCta}
              </Link>
              <Link className="button-secondary" href={content.secondaryCtaHref}>
                {content.secondaryCta}
              </Link>
            </div>
          </section>

          <section className="hero-crest" aria-label="Ultimate Racing League brand">
            <div className="crest-orbit">
              <Image
                src="/url-logo-standard.png"
                alt="Ultimate Racing League shield logo"
                width={520}
                height={520}
                priority
              />
            </div>
            <div className="broadcast-strip">
              <span>{content.broadcastLabel}</span>
              <strong>{content.broadcastValue}</strong>
            </div>
          </section>
        </div>
      </section>

      <section className="signal-grid" aria-label="League platform signals">
        {content.signals.map(({ label, value }) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>

      <section className="content-band">
        <div className="section-heading">
          <p className="eyebrow">{content.raceControlEyebrow}</p>
          <h2>{content.raceControlHeadline}</h2>
        </div>

        <div className="race-card-grid">
          {content.raceCards.map((card) => (
            <article className="race-card" key={card.label}>
              <span>{card.label}</span>
              <h3>{card.value}</h3>
              <p>{card.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="leaderboard-band">
        <div className="leaderboard-heading">
          <div>
            <p className="eyebrow">{content.leaderboardEyebrow}</p>
            <h2>{content.leaderboardHeadline}</h2>
          </div>
          <Link href="/leaderboard">Full standings</Link>
        </div>

        <div className="timing-table">
          {content.timingRows.map((row) => (
            <article className="timing-row" key={row.rank}>
              <span>{row.rank}</span>
              <strong>{row.driver}</strong>
              <p>{row.track}</p>
              <time>{row.time}</time>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
