ARG NODE_VERSION=24.14.1-slim

FROM docker.io/node:${NODE_VERSION} AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy full standalone output (root node_modules + apps/ directory)
COPY --chown=nextjs:nodejs dist/standalone ./

# Copy static assets where server.js expects them (dist/static relative to __dirname)
COPY --chown=nextjs:nodejs dist/static ./apps/app-client/dist/static

# Copy public assets where server.js expects them (public relative to __dirname)
COPY --chown=nextjs:nodejs public ./apps/app-client/public

USER nextjs

EXPOSE 3000

CMD ["node", "apps/app-client/server.js"]
