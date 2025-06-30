# Use a secure, minimal Node.js image
FROM node:20-alpine

# Set working directory for the app
WORKDIR /app

# Copy the backend/LINKAd directory contents into the container's /app directory
COPY backend/LINKAd/ .

# Install all dependencies
RUN npm install

# Build the app (uncomment if you want production build)
# RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Start the backend
CMD ["npm", "run", "dev"]