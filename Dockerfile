FROM node:20-alpine AS base

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Configure pnpm for better network handling with Taobao registry
RUN pnpm config set registry https://registry.npm.taobao.org/ && \
   pnpm config set network-timeout 600000 && \
   pnpm config set fetch-retries 10 && \
   pnpm config set fetch-retry-factor 3 && \
   pnpm config set fetch-retry-mintimeout 20000 && \
   pnpm config set fetch-retry-maxtimeout 120000

# Dependencies stage
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --network-timeout=600000 --fetch-retries=10

# Development stage
FROM base AS dev
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --network-timeout=600000 --fetch-retries=10
COPY . .
EXPOSE 3000
CMD ["pnpm", "dev"]

# Builder stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build the application
RUN pnpm build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup -g 1001 -S nodejs && \
   adduser -S nextjs -u 1001

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
