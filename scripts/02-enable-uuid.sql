/*
Run this once in SQL Editor or with `v0 run-script`.
It enables the uuid-ossp extension and fixes the contacts.id default.
*/
create extension if not exists "uuid-ossp";

alter table public.contacts
  alter column id set default uuid_generate_v4();
