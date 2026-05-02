# Production image, copy all the files and run next
FROM docker.io/node:lts-alpine as prepare
WORKDIR /usr/src/app
COPY ./.npmrc ./
COPY dist/package*.json ./
RUN npm i
RUN npm i next
RUN npm i serve@latest


FROM docker.io/node:lts-alpine as runner

WORKDIR /usr/src/app
ENV PORT 4200

COPY --from=prepare /usr/src/app/node_modules ./node_modules
COPY dist .
COPY .next/ .next/
## we dont need this for mobile atm
#RUN chown -R node:node .
RUN ls -a .next
USER node
EXPOSE 4200
# COPY --chown=node:node ./tools/scripts/entrypoints/api.sh /usr/local/bin/docker-entrypoint.sh
# ENTRYPOINT [ "docker-entrypoint.sh" ]
# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1


CMD ["node_modules/.bin/serve", ".next", "-p", "4200"]
