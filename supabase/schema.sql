-- Pathways database schema.
-- Paste this whole file into the Supabase SQL Editor and run it once.
-- Safe to re-run: every statement is idempotent (create-if-not-exists / drop-if-exists).

-- ---------------------------------------------------------------------------
-- profiles: one row per signed-in user, auto-created on first sign-in.
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles are publicly readable" on public.profiles;
create policy "Profiles are publicly readable"
  on public.profiles for select
  using (true);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row from Google's OAuth metadata on first sign-in.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- journeys: a themed set of stops. created_by = null means official/seed
-- content (not editable through the app by anyone, only ever seeded here).
-- ---------------------------------------------------------------------------
create table if not exists public.journeys (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  theme text not null,
  icon text not null,
  accent text not null,
  description text not null,
  duration text not null,
  distance text not null,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.journeys enable row level security;

drop policy if exists "Journeys are publicly readable" on public.journeys;
create policy "Journeys are publicly readable"
  on public.journeys for select
  using (true);

drop policy if exists "Signed-in users can create journeys" on public.journeys;
create policy "Signed-in users can create journeys"
  on public.journeys for insert
  with check (auth.uid() = created_by);

drop policy if exists "Authors can update their own journeys" on public.journeys;
create policy "Authors can update their own journeys"
  on public.journeys for update
  using (auth.uid() = created_by);

drop policy if exists "Authors can delete their own journeys" on public.journeys;
create policy "Authors can delete their own journeys"
  on public.journeys for delete
  using (auth.uid() = created_by);

-- ---------------------------------------------------------------------------
-- stops: ordered locations within a journey.
-- ---------------------------------------------------------------------------
create table if not exists public.stops (
  id uuid primary key default gen_random_uuid(),
  journey_id uuid not null references public.journeys (id) on delete cascade,
  position int not null,
  name text not null,
  lat double precision not null,
  lng double precision not null,
  address text,
  icon text not null,
  teaser text not null,
  story text not null,
  radius_meters int not null default 75,
  unique (journey_id, position)
);

alter table public.stops enable row level security;

drop policy if exists "Stops are publicly readable" on public.stops;
create policy "Stops are publicly readable"
  on public.stops for select
  using (true);

drop policy if exists "Authors can insert stops on their own journeys" on public.stops;
create policy "Authors can insert stops on their own journeys"
  on public.stops for insert
  with check (
    exists (
      select 1 from public.journeys j
      where j.id = journey_id and j.created_by = auth.uid()
    )
  );

drop policy if exists "Authors can update stops on their own journeys" on public.stops;
create policy "Authors can update stops on their own journeys"
  on public.stops for update
  using (
    exists (
      select 1 from public.journeys j
      where j.id = journey_id and j.created_by = auth.uid()
    )
  );

drop policy if exists "Authors can delete stops on their own journeys" on public.stops;
create policy "Authors can delete stops on their own journeys"
  on public.stops for delete
  using (
    exists (
      select 1 from public.journeys j
      where j.id = journey_id and j.created_by = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- journey_progress: one row per (user, journey) — which stops are unlocked.
-- Mirrors the shape the app previously kept in localStorage.
-- ---------------------------------------------------------------------------
create table if not exists public.journey_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  journey_id uuid not null references public.journeys (id) on delete cascade,
  unlocked_stops jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, journey_id)
);

alter table public.journey_progress enable row level security;

drop policy if exists "Users can read their own progress" on public.journey_progress;
create policy "Users can read their own progress"
  on public.journey_progress for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own progress" on public.journey_progress;
create policy "Users can insert their own progress"
  on public.journey_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own progress" on public.journey_progress;
create policy "Users can update their own progress"
  on public.journey_progress for update
  using (auth.uid() = user_id);
