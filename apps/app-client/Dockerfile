# Production image, copy all the files and run next
FROM docker.io/node:lts-alpine as prepare
WORKDIR /usr/src/app
COPY ./.npmrc ./
COPY package.json .
RUN npm i
RUN npm i next


FROM docker.io/node:lts-alpine as runner

WORKDIR /usr/src/app
ENV PORT 3000

COPY --from=prepare /usr/src/app/node_modules ./node_modules
COPY dist .
RUN chown -R node:node .
USER node
EXPOSE 3000
# COPY --chown=node:node ./tools/scripts/entrypoints/api.sh /usr/local/bin/docker-entrypoint.sh
# ENTRYPOINT [ "docker-entrypoint.sh" ]
# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1


CMD ["node_modules/.bin/next", "start"]
