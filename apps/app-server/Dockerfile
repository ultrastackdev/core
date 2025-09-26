# Install dependencies only when needed
FROM docker.io/node:22.6.0-alpine as deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY ./.npmrc ./
COPY dist/package*.json ./
RUN npm install

# Setting the environment variables

# Production image, copy all the files and run nest
FROM docker.io/node:22.6.0-alpine as runner
RUN apk add --no-cache dumb-init
ENV PORT 9000
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/package.json ./package.json
COPY dist/* .
RUN chown -R node:node .
USER node
EXPOSE 9000 8880
CMD ["dumb-init", "node", "main.js"]