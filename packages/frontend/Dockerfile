# starting builder
FROM node:14-alpine AS builder
ENV NODE_ENV production

WORKDIR /app

# copy workspace's root yarn files
COPY package.json .
COPY yarn.lock .

# copy packages only required to frontend
ADD packages/frontend packages/frontend 
ADD packages/types packages/types 

RUN yarn install --frozen-lockfile --production=true

# copy rest of the code
COPY . .

# build frontend
RUN yarn --cwd packages/frontend build

# starting runner
FROM node:14-alpine AS runner
ENV NODE_ENV production

WORKDIR /app

# copy build files from builder
COPY --from=builder /app/packages/frontend/build .

# serve static files using serve
RUN npm i -g serve

# exposing port
EXPOSE 3000

# running serve
CMD ["serve"]
