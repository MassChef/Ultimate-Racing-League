create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  role text not null default 'driver',
  created_at timestamptz not null default now()
);

create table if not exists admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists site_content (
  key text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

insert into site_content (key, content)
values (
  'homepage',
  '{
    "eyebrow": "Upland.me Racing Intelligence",
    "headline": "Professional esports timing for the URL grid.",
    "summary": "Ultimate Racing League turns Upland race data into public results, custom time-based leaderboards, team standings, and a motorsport broadcast experience built around the official URL identity.",
    "primaryCta": "View leaderboard",
    "secondaryCta": "League dashboard",
    "broadcastLabel": "Est. 2022",
    "broadcastValue": "Live Timing Era",
    "raceControlEyebrow": "Race Control",
    "raceControlHeadline": "Built for API-powered competition.",
    "leaderboardEyebrow": "Timing Tower",
    "leaderboardHeadline": "Fastest published race times.",
    "signals": [
      { "label": "API Source", "value": "Upland.me" },
      { "label": "Publishing", "value": "Live Results" },
      { "label": "League Focus", "value": "Race Times" },
      { "label": "Format", "value": "Esports Motorsport" }
    ],
    "raceCards": [
      {
        "label": "Latest Sync",
        "value": "Ready for API",
        "detail": "Awaiting Upland endpoint connection"
      },
      {
        "label": "Timing Model",
        "value": "Fastest Wins",
        "detail": "Custom rankings by time, track, and season"
      },
      {
        "label": "Public Access",
        "value": "Open Grid",
        "detail": "Results and leaderboards visible to every fan"
      }
    ],
    "timingRows": [
      {
        "rank": "01",
        "driver": "Maya Cross",
        "track": "Queens Circuit",
        "time": "01:28.442"
      },
      {
        "rank": "02",
        "driver": "Andre Vale",
        "track": "Manhattan Sprint",
        "time": "01:29.118"
      },
      {
        "rank": "03",
        "driver": "Tessa King",
        "track": "Bronx Loop",
        "time": "01:29.604"
      },
      {
        "rank": "04",
        "driver": "Jon Bell",
        "track": "Brooklyn Dash",
        "time": "01:30.021"
      }
    ]
  }'::jsonb
)
on conflict (key) do nothing;

create table if not exists teams (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  owner_id uuid references profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists vehicles (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  team_id uuid references teams(id) on delete set null,
  name text not null,
  class text not null,
  created_at timestamptz not null default now()
);

create table if not exists races (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  race_type text not null,
  track text not null,
  starts_at timestamptz,
  status text not null default 'scheduled',
  created_at timestamptz not null default now()
);

create table if not exists race_results (
  id uuid primary key default gen_random_uuid(),
  race_id uuid not null references races(id) on delete cascade,
  profile_id uuid not null references profiles(id) on delete cascade,
  vehicle_id uuid references vehicles(id) on delete set null,
  finish_position integer not null,
  official_time text,
  notes text,
  status text not null default 'pending',
  submitted_at timestamptz not null default now(),
  approved_at timestamptz
);

create table if not exists leaderboards (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  team_id uuid references teams(id) on delete set null,
  season text not null,
  points integer not null default 0,
  wins integer not null default 0,
  podiums integer not null default 0,
  updated_at timestamptz not null default now(),
  unique (profile_id, season)
);

alter table admin_users enable row level security;
alter table site_content enable row level security;
alter table profiles enable row level security;
alter table teams enable row level security;
alter table vehicles enable row level security;
alter table races enable row level security;
alter table race_results enable row level security;
alter table leaderboards enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
  );
$$;

drop policy if exists "Admins can read admin users" on admin_users;
create policy "Admins can read admin users"
on admin_users for select
to authenticated
using (user_id = auth.uid() or public.is_admin());

drop policy if exists "Public can read site content" on site_content;
create policy "Public can read site content"
on site_content for select
to anon, authenticated
using (true);

drop policy if exists "Admins can insert site content" on site_content;
create policy "Admins can insert site content"
on site_content for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update site content" on site_content;
create policy "Admins can update site content"
on site_content for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read profiles" on profiles;
create policy "Public can read profiles"
on profiles for select
to anon, authenticated
using (true);

drop policy if exists "Public can read teams" on teams;
create policy "Public can read teams"
on teams for select
to anon, authenticated
using (true);

drop policy if exists "Public can read vehicles" on vehicles;
create policy "Public can read vehicles"
on vehicles for select
to anon, authenticated
using (true);

drop policy if exists "Public can read races" on races;
create policy "Public can read races"
on races for select
to anon, authenticated
using (true);

drop policy if exists "Public can read race results" on race_results;
create policy "Public can read race results"
on race_results for select
to anon, authenticated
using (true);

drop policy if exists "Public can read leaderboards" on leaderboards;
create policy "Public can read leaderboards"
on leaderboards for select
to anon, authenticated
using (true);
