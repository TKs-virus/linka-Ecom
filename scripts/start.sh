#!/bin/bash

echo "🚀 Starting Linka Platform..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Build and start services
echo "📦 Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check service health
echo "🔍 Checking service health..."
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "✅ Main platform is running at http://localhost:3000"
else
    echo "⚠️  Main platform may still be starting..."
fi

echo "🎉 Linka Platform is starting up!"
echo ""
echo "📍 Available services:"
echo "   Main Platform: http://localhost:3000"
echo "   E-commerce:    http://localhost:3001"
echo "   E-learning:    http://localhost:3002"
echo "   Food Delivery: http://localhost:3003"
echo "   Healthcare:    http://localhost:3004"
echo "   Travel:        http://localhost:3005"
echo "   Wholesale:     http://localhost:3006"
echo ""
echo "To stop all services: docker-compose down"
echo "To view logs: docker-compose logs -f"
