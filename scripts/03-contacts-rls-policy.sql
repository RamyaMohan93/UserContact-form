/*
Creates (or replaces) an insert policy that lets the anonymous API role
add rows to public.contacts. Run this once in Supabase → SQL Editor.
*/

-- ensure RLS is ON (it is by default for new tables)
alter table public.contacts enable row level security;

-- drop an old policy with the same name (if it exists)
drop policy if exists "public inserts" on public.contacts;

-- allow every row to be inserted
create policy "public inserts"
on public.contacts
for insert
to public
with check (true);
