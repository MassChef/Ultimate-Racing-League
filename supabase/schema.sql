create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  role text not null default 'driver',
  created_at timestamptz not null default now()
);

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
