# starting builder
FROM node:14-alpine AS builder

WORKDIR /app

# copy workspace's root yarn files
COPY package.json .
COPY yarn.lock .

# copy packages only required to backend
ADD packages/backend packages/backend 
ADD packages/types packages/types 

RUN yarn install --frozen-lockfile

# copy rest of the code
COPY . .

# build frontend
RUN yarn --cwd packages/backend build

# remove node_modules and reinstall with production=true
RUN rm -rf /node_modules
RUN yarn install --frozen-lockfile --production=true

# starting runner
FROM node:14-alpine AS runner
ENV NODE_ENV production

WORKDIR /app

# copy node_modules
COPY --from=builder /app/node_modules ./node_modules/

# copy build files from builder
COPY --from=builder /app/packages/backend/build .

# exposing port
EXPOSE 3001

# running serve
CMD ["node", "server.js"]
