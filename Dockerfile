# Multi-stage production image for PROWEM (Next.js standalone)
# Deploy from GitHub:
#   git clone <repo> && cd prowem && docker compose up -d --build

ARG NODE_VERSION=22-bookworm-slim

# ----------------------------------------
# Dependencies
# ----------------------------------------
FROM node:${NODE_VERSION} AS dependencies

WORKDIR /app

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm \
  npm ci --no-audit --no-fund

# ----------------------------------------
# Build
# ----------------------------------------
FROM node:${NODE_VERSION} AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ----------------------------------------
# Runner
# ----------------------------------------
FROM node:${NODE_VERSION} AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder --chown=node:node /app/public ./public

RUN mkdir .next && chown node:node .next

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]
