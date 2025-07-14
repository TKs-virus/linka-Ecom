#!/bin/bash

echo "🔧 Starting Linka Platform in Development Mode..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start development environment
echo "📦 Starting development services..."
docker-compose -f docker-compose.dev.yml up --build

echo "🎉 Development environment started!"
