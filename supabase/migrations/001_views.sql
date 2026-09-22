-- ============================================================================
--  "My View" — H.E. Zeenat Kureshi's commentary on live news
--  Run once in: Supabase Dashboard -> SQL Editor -> New query -> Run
-- ============================================================================
--
--  Security model, and why it is built this way:
--
--  The publishable key ships inside the website's JavaScript. That is by
--  design and is safe -- but ONLY because Row Level Security below decides
--  what that key is allowed to do. Without these policies, any visitor could
--  post commentary under the Commissioner's name.
--
--    read   -> everyone, including anonymous visitors (the views are public)
--    write  -> signed-in accounts only (the office)
--
-- ============================================================================

create table if not exists public.views (
  id            uuid primary key default gen_random_uuid(),

  -- The source article this view responds to. The URL is the natural key:
  -- one view per article, re-saving replaces it.
  article_id    text        not null unique,
  article_title text        not null,
  publication   text,
  sector        text,

  body          text        not null check (char_length(trim(body)) > 0),
  author        text        not null default 'H.E. Zeenat Kureshi',

  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Newest views first, which is how the site reads them.
create index if not exists views_created_at_idx on public.views (created_at desc);

-- Keep updated_at honest on every edit.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists views_touch_updated_at on public.views;
create trigger views_touch_updated_at
  before update on public.views
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
--  Row Level Security
-- ---------------------------------------------------------------------------
alter table public.views enable row level security;

-- Public read: a visitor must be able to see her published commentary.
drop policy if exists "views are publicly readable" on public.views;
create policy "views are publicly readable"
  on public.views
  for select
  to anon, authenticated
  using (true);

-- Writes are restricted to signed-in accounts (the office).
drop policy if exists "office can publish views" on public.views;
create policy "office can publish views"
  on public.views
  for insert
  to authenticated
  with check (true);

drop policy if exists "office can edit views" on public.views;
create policy "office can edit views"
  on public.views
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "office can remove views" on public.views;
create policy "office can remove views"
  on public.views
  for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
--  Realtime: published views appear on open pages without a refresh.
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'views'
  ) then
    alter publication supabase_realtime add table public.views;
  end if;
end
$$;
