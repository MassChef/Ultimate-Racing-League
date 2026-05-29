export type Signal = {
  label: string;
  value: string;
};

export type RaceCard = {
  label: string;
  value: string;
  detail: string;
};

export type TimingRow = {
  rank: string;
  driver: string;
  track: string;
  time: string;
};

export type HomepageContent = {
  eyebrow: string;
  headline: string;
  summary: string;
  primaryCta: string;
  primaryCtaHref: string;
  secondaryCta: string;
  secondaryCtaHref: string;
  broadcastLabel: string;
  broadcastValue: string;
  raceControlEyebrow: string;
  raceControlHeadline: string;
  leaderboardEyebrow: string;
  leaderboardHeadline: string;
  signals: Signal[];
  raceCards: RaceCard[];
  timingRows: TimingRow[];
};

export const defaultHomepageContent: HomepageContent = {
  eyebrow: "Upland.me Racing Intelligence",
  headline: "Professional esports timing for the URL grid.",
  summary:
    "Ultimate Racing League turns Upland race data into public results, custom time-based leaderboards, team standings, and a motorsport broadcast experience built around the official URL identity.",
  primaryCta: "View leaderboard",
  primaryCtaHref: "/leaderboard",
  secondaryCta: "League dashboard",
  secondaryCtaHref: "/dashboard",
  broadcastLabel: "Est. 2022",
  broadcastValue: "Live Timing Era",
  raceControlEyebrow: "Race Control",
  raceControlHeadline: "Built for API-powered competition.",
  leaderboardEyebrow: "Timing Tower",
  leaderboardHeadline: "Fastest published race times.",
  signals: [
    { label: "API Source", value: "Upland.me" },
    { label: "Publishing", value: "Live Results" },
    { label: "League Focus", value: "Race Times" },
    { label: "Format", value: "Esports Motorsport" },
  ],
  raceCards: [
    {
      label: "Latest Sync",
      value: "Ready for API",
      detail: "Awaiting Upland endpoint connection",
    },
    {
      label: "Timing Model",
      value: "Fastest Wins",
      detail: "Custom rankings by time, track, and season",
    },
    {
      label: "Public Access",
      value: "Open Grid",
      detail: "Results and leaderboards visible to every fan",
    },
  ],
  timingRows: [
    {
      rank: "01",
      driver: "Maya Cross",
      track: "Queens Circuit",
      time: "01:28.442",
    },
    {
      rank: "02",
      driver: "Andre Vale",
      track: "Manhattan Sprint",
      time: "01:29.118",
    },
    {
      rank: "03",
      driver: "Tessa King",
      track: "Bronx Loop",
      time: "01:29.604",
    },
    {
      rank: "04",
      driver: "Jon Bell",
      track: "Brooklyn Dash",
      time: "01:30.021",
    },
  ],
};

export function normalizeHomepageContent(value: unknown): HomepageContent {
  if (!value || typeof value !== "object") {
    return defaultHomepageContent;
  }

  return {
    ...defaultHomepageContent,
    ...(value as Partial<HomepageContent>),
  };
}
