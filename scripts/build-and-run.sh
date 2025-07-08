#!/bin/bash

# Build and run script with error handling
set -e

echo "🚀 Building and running Linka E-commerce Platform..."

# Function to handle cleanup on exit
cleanup() {
    echo "🧹 Cleaning up..."
    docker-compose down
}

# Set trap to cleanup on script exit
trap cleanup EXIT

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Clean up any existing containers
echo "🧹 Cleaning up existing containers..."
docker-compose down --remove-orphans

# Build with no cache to ensure fresh build
echo "🔨 Building containers..."
docker-compose build --no-cache --parallel

# Start services
echo "🚀 Starting services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Check service health
echo "🔍 Checking service health..."
services=("main:3000" "ecom:3001" "elearning:3002" "fooddelivery:3003" "healthcare:3004" "travel_and_tourism:3005" "wholesale:3006" "travelandtourism:3007")

for service in "${services[@]}"; do
    service_name=$(echo $service | cut -d: -f1)
    port=$(echo $service | cut -d: -f2)
    
    if docker-compose ps $service_name | grep -q "Up"; then
        echo "✅ $service_name is running on port $port"
    else
        echo "❌ $service_name failed to start"
        docker-compose logs $service_name
    fi
done

echo "🎉 All services are running!"
echo "📱 Main application: http://localhost"
echo "🛒 E-commerce: http://localhost/ecom"
echo "📚 E-learning: http://localhost/elearning"
echo "🍕 Food Delivery: http://localhost/fooddelivery"
echo "🏥 Healthcare: http://localhost/healthcare"
echo "✈️ Travel & Tourism: http://localhost/travel"
echo "📦 Wholesale: http://localhost/wholesale"

# Keep script running to maintain containers
echo "Press Ctrl+C to stop all services..."
docker-compose logs -f
