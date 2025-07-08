#!/bin/bash

# Quick start script for development
echo "🚀 Quick starting Linka Platform..."

# Build only if images don't exist
if [[ "$(docker images -q linka-main 2> /dev/null)" == "" ]]; then
    echo "🔨 Building images for the first time..."
    docker-compose build
else
    echo "📦 Using existing images..."
fi

# Start services
docker-compose up -d

echo "✅ Services started!"
echo "🌐 Access the platform at: http://localhost"
