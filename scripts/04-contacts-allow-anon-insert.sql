/*
Run this once in Supabase → SQL Editor.

1.  Ensures RLS is ON (good practice)
2.  Removes any old insert policy that might conflict
3.  Creates a new policy that lets *every* anonymous request insert rows
*/

-- 1 · keep RLS enabled so reads are still protected
alter table public.contacts enable row level security;

-- 2 · drop any existing insert policy with the same name
drop policy if exists "anon insert" on public.contacts;

-- 3 · allow anonymous inserts
create policy "anon insert"
on public.contacts
for insert
to anon
with check (true);
