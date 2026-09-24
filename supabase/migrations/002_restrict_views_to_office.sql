-- ============================================================================
--  Restrict "My View" publishing to named office accounts
--  Run once in: Supabase Dashboard -> SQL Editor -> New query -> Run
-- ============================================================================
--
--  Why: 001_views.sql lets ANY signed-in account insert, edit and delete views.
--  Supabase allows public email sign-up by default, and the publishable key is
--  in the site's JavaScript, so anyone could create an account and publish
--  commentary under the Commissioner's name. From now on only accounts listed
--  in public.office_members can write.
--
--  After running this:
--    1. Authentication -> Users: copy the office account's User UID.
--    2. Run:  insert into public.office_members (user_id) values ('<that-uid>');
--    3. Authentication -> Sign In / Providers: turn OFF "Allow new users to sign up".
-- ============================================================================

create table if not exists public.office_members (
  user_id  uuid primary key references auth.users (id) on delete cascade,
  added_at timestamptz not null default now()
);

-- Only readable/writable from the dashboard (service role). No public access.
alter table public.office_members enable row level security;

-- Signed-in users may check their own membership (nothing else).
drop policy if exists "members can see themselves" on public.office_members;
create policy "members can see themselves"
  on public.office_members
  for select
  to authenticated
  using (user_id = auth.uid());

-- ---------------------------------------------------------------------------
--  Replace the write policies on public.views
-- ---------------------------------------------------------------------------
drop policy if exists "office can publish views" on public.views;
create policy "office can publish views"
  on public.views
  for insert
  to authenticated
  with check (exists (select 1 from public.office_members m where m.user_id = auth.uid()));

drop policy if exists "office can edit views" on public.views;
create policy "office can edit views"
  on public.views
  for update
  to authenticated
  using (exists (select 1 from public.office_members m where m.user_id = auth.uid()))
  with check (exists (select 1 from public.office_members m where m.user_id = auth.uid()));

drop policy if exists "office can remove views" on public.views;
create policy "office can remove views"
  on public.views
  for delete
  to authenticated
  using (exists (select 1 from public.office_members m where m.user_id = auth.uid()));

-- Cap commentary length so a single write can't flood the table or the page.
alter table public.views drop constraint if exists views_body_length;
alter table public.views add constraint views_body_length check (char_length(body) <= 4000);
