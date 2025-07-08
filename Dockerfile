FROM node:20-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Configure pnpm to use a more reliable registry and increase timeout
RUN pnpm config set registry https://registry.npmjs.org/
RUN pnpm config set network-timeout 300000
RUN pnpm config set fetch-retries 5
RUN pnpm config set fetch-retry-factor 2
RUN pnpm config set fetch-retry-mintimeout 10000
RUN pnpm config set fetch-retry-maxtimeout 60000

# Copy package.json and pnpm-lock.yaml from the build context (service directory)
COPY package.json ./
COPY pnpm-lock.yaml* ./

# Install dependencies with retry logic and increased timeout
RUN pnpm install --frozen-lockfile --network-timeout=300000 || \
    (sleep 10 && pnpm install --frozen-lockfile --network-timeout=300000) || \
    (sleep 30 && pnpm install --frozen-lockfile --network-timeout=300000)

# Copy the rest of the application code
COPY . .

# Set environment variable for port (default 3000)
ENV PORT=3000

# Expose the port
EXPOSE $PORT

# Run the Next.js dev server
CMD ["pnpm", "dev", "-p", "$PORT"]
