---
--- Functions
---

-- Function to update the updated_at timestamp
create function update_timestamp()
returns trigger
language plpgsql
as $$
begin
  NEW.updated_at = now();
  return NEW;
end;
$$;

--
-- Create a table to store user profiles
--

-- Create a table to store user profiles
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  username text not null,
  picture_url text,
  email text not null,

  primary key (id)
);

alter table public.profiles enable row level security;

-- Enable user to read their own profile
create policy "Allow user to read their own profile"
  on public.profiles for select to authenticated
  using (auth.uid() = id);

-- Enable user to update their own profile
create policy "Allow user to update their own profile"
    on public.profiles for update to authenticated
    using (auth.uid() = id);

-- Inserts a row into public.profiles and creates an organization with a custom slug
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
declare
  new_organization_id uuid;
  random_suffix text;
  generated_slug text;
  sanitized_username text;
begin
  -- Insert the new user profile
  insert into public.profiles (id, username, picture_url, email)
  values (new.id, new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'picture', new.email);

  return new;
end;
$$;

-- Trigger to call handle_new_user when a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();