-- create schema
create schema if not exists users;

-- create users.data
create table if not exists users.data(
  id integer primary key generated always as identity,
  full_name varchar(255) not null,
  username varchar(255) unique not null,
  pwd text not null,
  email varchar(255),
  created_at TIMESTAMPTZ not null default now()
);

-- create index for user.username
create index if not exists user_username_idx on users.data (username);

-- create user.tokens to store refresh tokens
create table if not exists users.tokens(
  id integer references users.data(id),
  token text not null,
  expires TIMESTAMP not null
);

-- create complex index for user.tokens
create index if not exists id_token_idx on users.tokens (id, token);