FROM node:20-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml from the build context (service directory)
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Set environment variable for port (default 3000)
ENV PORT=3000

# Expose the port
EXPOSE $PORT

# Run the Next.js dev server
CMD ["pnpm", "dev", "-p", "$PORT"]