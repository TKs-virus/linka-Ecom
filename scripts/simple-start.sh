#!/bin/bash

echo "🚀 Simple Start - Running main application only..."

# Stop any running containers
docker-compose down

# Build and start just the main service
docker-compose up --build main

echo "✅ Main application should be running at http://localhost:3000"
