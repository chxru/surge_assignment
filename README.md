# Surge Software Engineering Internship Assignment

## Getting Started

- Make sure you have docker, docker-compose installed
- `docker-compose -f docker-compose.prod.yaml up -d`
- Visit `localhost` or `:80`

## Architecture

![Deployment diagram](/images/deploy.png)

- Production application is running on docker.
- Reverse proxy listening on port 80 for connection
- When the requesting path is `/` redirect request to `frontend` package
- When the requesting path prefix is `/api`. request is redirected to `backend` package
- `backend` package has a TCP connection with database for querying

Development is done using yarn workspaces due to code sharing facility.  
Progress tracking done through [github projects](https://github.com/users/chxru/projects/4/views/1)

### Project directory

`/database`: sql files, db service Dockerfile

`/images`: images used in markdown files

`/node_modules`: node modules required for every package

`/packages`: workspace folder

`/packages/backend`: express server

`/packages/frontend`: react app

`/packages/types`: types used in frontend and backend

`/traefik`: reverse proxy config files

`.env`: store application secrets. should not be commit to git in real world applications!

`docker-compose.dev.yml`: docker compose file to initiate developing environment

`docker-compose.prod.yml`: docker compose file to initiate production environment

`package.json`: root package.json

`yarn.lock`: project lock file

#### Languages:

- typescript

#### Frameworks:

- react@17.0.2
- express.js@4.17.2

#### Run time

- node:14-alpine

#### Databases:

- postgres@14

#### Reverse proxy

- traefik@2.6

## Scripts

These scripts are useful for local development

`yarn install` - install packages

`yarn dev:f` - initiate react app in dev mode

`yarn dev:v` - initiate express server in dev mode
