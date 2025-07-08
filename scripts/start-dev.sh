#!/bin/bash

echo "🚀 Starting Linka Development Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Function to check if port is available
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $port is already in use"
        return 1
    fi
    return 0
}

# Check required ports
ports=(3000 3001 3002 3003 3004 3005 3006)
for port in "${ports[@]}"; do
    if ! check_port $port; then
        echo "❌ Port $port is in use. Please free up the port and try again."
        exit 1
    fi
done

# Clean up any existing containers
echo "🧹 Cleaning up existing containers..."
docker-compose down --remove-orphans

# Start only the main service first for testing
echo "🔨 Building and starting main service..."
docker-compose up --build -d main

# Wait for main service to be ready
echo "⏳ Waiting for main service to start..."
sleep 30

# Check if main service is running
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Main service is running at http://localhost:3000"
else
    echo "❌ Main service failed to start. Checking logs..."
    docker-compose logs main
    exit 1
fi

echo "🎉 Main service is running successfully!"
echo "📱 Access your application at: http://localhost:3000"

# Ask if user wants to start all services
read -p "Do you want to start all services? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Starting all services..."
    docker-compose up --build -d
    
    echo "⏳ Waiting for all services to start..."
    sleep 60
    
    echo "🎉 All services should be running now!"
    echo "🌐 Service URLs:"
    echo "  Main: http://localhost:3000"
    echo "  E-commerce: http://localhost:3001"
    echo "  E-learning: http://localhost:3002"
    echo "  Food Delivery: http://localhost:3003"
    echo "  Healthcare: http://localhost:3004"
    echo "  Travel & Tourism: http://localhost:3005"
    echo "  Wholesale: http://localhost:3006"
fi

echo "📋 To view logs: docker-compose logs -f [service-name]"
echo "🛑 To stop services: docker-compose down"
