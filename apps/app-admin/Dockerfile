# Install dependencies only when needed
FROM docker.io/node:22.6.0-alpine as deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY dist/package*.json ./
RUN npm install --omit=dev

# Production image, copy all the files and run nest
FROM docker.io/node:lts-alpine as runner
RUN apk add --no-cache dumb-init

WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/package.json ./package.json
COPY dist .
RUN chown -R node:node .
USER node
EXPOSE 5000
CMD ["dumb-init", "node", "apps/app-admin/src/main.js"]
