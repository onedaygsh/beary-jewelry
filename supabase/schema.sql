-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- *** PROFILES ***
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update their own profile." on public.profiles
  for update using (auth.uid() = id);

-- *** DESIGNS ***
create table public.designs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id), -- Nullable for guest users
  title text default 'Untitled Design',
  config_json jsonb not null, -- Stores the beads array and specs
  preview_url text, -- Optional base64 or storage URL
  is_public boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.designs enable row level security;

-- Policies
create policy "Public designs are viewable by everyone." on public.designs
  for select using (is_public = true);

create policy "Users can view their own designs." on public.designs
  for select using (auth.uid() = user_id);

create policy "Users can create designs." on public.designs
  for insert with check (true); -- Ideally restrict this via API logic or strict Auth rules

-- *** ORDERS ***
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id),
  design_id uuid references public.designs(id) not null,
  amount integer not null, -- In cents
  status text default 'pending', -- pending, paid, shipped
  shipping_address jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.orders enable row level security;

-- Policies
create policy "Users can view their own orders." on public.orders
  for select using (auth.uid() = user_id);

-- Secure inserts usually handled by backend after payment verification
