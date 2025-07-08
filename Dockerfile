FROM node:20-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Configure pnpm for better network handling
RUN pnpm config set registry https://registry.npmjs.org/
RUN pnpm config set network-timeout 300000
RUN pnpm config set fetch-retries 5
RUN pnpm config set fetch-retry-factor 2
RUN pnpm config set fetch-retry-mintimeout 10000
RUN pnpm config set fetch-retry-maxtimeout 60000

# Copy package files
COPY package.json ./
COPY pnpm-lock.yaml* ./

# Install dependencies with retry logic
RUN pnpm install --frozen-lockfile --network-timeout=300000 || \
    (sleep 10 && pnpm install --frozen-lockfile --network-timeout=300000) || \
    (sleep 30 && pnpm install --frozen-lockfile --network-timeout=300000)

# Copy source code
COPY . .

# Set environment variables
ENV PORT=3000
ENV NODE_ENV=development

# Expose port
EXPOSE $PORT

# Start the application
CMD ["pnpm", "dev", "--port", "$PORT"]
