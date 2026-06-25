-- Elite "Get in touch" leads captured from the pricing page modal.
-- Run this in the Supabase SQL editor (or via the Supabase CLI) before the
-- form goes live, otherwise inserts fail and the modal shows its error state.

create table if not exists public.elite_inquiries (
  id             bigint generated always as identity primary key,
  created_at     timestamptz not null default now(),
  shop_name      text not null,
  email          text not null,
  phone          text,
  contact_name   text not null,
  message        text not null,
  opt_in_updates boolean not null default false
);

-- The browser uses the public anon key, so lock the table down with RLS:
-- the anon role may INSERT leads but must never be able to read them back.
alter table public.elite_inquiries enable row level security;

create policy "anon can submit elite inquiries"
  on public.elite_inquiries
  for insert
  to anon
  with check (true);

-- No select/update/delete policies for anon => those operations are denied.
-- Read leads with the service role (server side) or the Supabase dashboard.
