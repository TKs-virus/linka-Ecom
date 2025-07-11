#!/bin/bash

# Cluster Management Script for Linka Platform

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}[CLUSTER]${NC} $1"
}

# Function to check if Docker and Docker Compose are installed
check_dependencies() {
    print_header "Checking dependencies..."
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_status "Dependencies check passed"
}

# Function to start all clusters
start_clusters() {
    print_header "Starting all clusters..."
    docker-compose -f docker-compose.clusters.yml up -d
    print_status "All clusters started successfully"
}

# Function to stop all clusters
stop_clusters() {
    print_header "Stopping all clusters..."
    docker-compose -f docker-compose.clusters.yml down
    print_status "All clusters stopped successfully"
}

# Function to restart all clusters
restart_clusters() {
    print_header "Restarting all clusters..."
    docker-compose -f docker-compose.clusters.yml down
    docker-compose -f docker-compose.clusters.yml up -d
    print_status "All clusters restarted successfully"
}

# Function to scale a specific service
scale_service() {
    local service=$1
    local replicas=$2
    
    if [ -z "$service" ] || [ -z "$replicas" ]; then
        print_error "Usage: scale_service <service_name> <replica_count>"
        return 1
    fi
    
    print_header "Scaling $service to $replicas replicas..."
    docker-compose -f docker-compose.clusters.yml up -d --scale $service=$replicas
    print_status "$service scaled to $replicas replicas"
}

# Function to show cluster status
show_status() {
    print_header "Cluster Status"
    docker-compose -f docker-compose.clusters.yml ps
}

# Function to show logs for a specific service
show_logs() {
    local service=$1
    
    if [ -z "$service" ]; then
        print_header "Showing logs for all services..."
        docker-compose -f docker-compose.clusters.yml logs -f
    else
        print_header "Showing logs for $service..."
        docker-compose -f docker-compose.clusters.yml logs -f $service
    fi
}

# Function to deploy to a specific region
deploy_region() {
    local region=$1
    
    case $region in
        "us-east")
            print_header "Deploying US East region..."
            docker-compose -f docker-compose.clusters.yml up -d shop-us-east-1 shop-us-east-2
            ;;
        "us-west")
            print_header "Deploying US West region..."
            docker-compose -f docker-compose.clusters.yml up -d shop-us-west-1 shop-us-west-2
            ;;
        "eu")
            print_header "Deploying EU region..."
            docker-compose -f docker-compose.clusters.yml up -d shop-eu-1 shop-eu-2
            ;;
        "asia")
            print_header "Deploying Asia region..."
            docker-compose -f docker-compose.clusters.yml up -d shop-asia-1 shop-asia-2
            ;;
        *)
            print_error "Unknown region: $region"
            print_error "Available regions: us-east, us-west, eu, asia"
            return 1
            ;;
    esac
    
    print_status "Region $region deployed successfully"
}

# Function to deploy a specific industry service
deploy_industry() {
    local industry=$1
    
    case $industry in
        "ecommerce")
            print_header "Deploying E-commerce services..."
            docker-compose -f docker-compose.clusters.yml up -d ecommerce-service-1 ecommerce-service-2
            ;;
        "elearning")
            print_header "Deploying E-learning services..."
            docker-compose -f docker-compose.clusters.yml up -d elearning-service-1 elearning-service-2
            ;;
        "fooddelivery")
            print_header "Deploying Food delivery services..."
            docker-compose -f docker-compose.clusters.yml up -d fooddelivery-service-1 fooddelivery-service-2
            ;;
        "healthcare")
            print_header "Deploying Healthcare services..."
            docker-compose -f docker-compose.clusters.yml up -d healthcare-service-1 healthcare-service-2
            ;;
        "travel")
            print_header "Deploying Travel services..."
            docker-compose -f docker-compose.clusters.yml up -d travel-service-1 travel-service-2
            ;;
        "wholesale")
            print_header "Deploying Wholesale services..."
            docker-compose -f docker-compose.clusters.yml up -d wholesale-service-1 wholesale-service-2
            ;;
        *)
            print_error "Unknown industry: $industry"
            print_error "Available industries: ecommerce, elearning, fooddelivery, healthcare, travel, wholesale"
            return 1
            ;;
    esac
    
    print_status "Industry $industry deployed successfully"
}

# Function to show help
show_help() {
    echo "Linka Platform Cluster Management"
    echo ""
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  start                    Start all clusters"
    echo "  stop                     Stop all clusters"
    echo "  restart                  Restart all clusters"
    echo "  status                   Show cluster status"
    echo "  logs [service]           Show logs (all services or specific service)"
    echo "  scale <service> <count>  Scale a service to specified replica count"
    echo "  deploy-region <region>   Deploy specific region (us-east, us-west, eu, asia)"
    echo "  deploy-industry <type>   Deploy specific industry service"
    echo "  help                     Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start"
    echo "  $0 scale shop-us-east-1 3"
    echo "  $0 deploy-region us-east"
    echo "  $0 deploy-industry ecommerce"
    echo "  $0 logs nginx-lb"
}

# Main script logic
case "${1:-help}" in
    "start")
        check_dependencies
        start_clusters
        ;;
    "stop")
        stop_clusters
        ;;
    "restart")
        check_dependencies
        restart_clusters
        ;;
    "status")
        show_status
        ;;
    "logs")
        show_logs $2
        ;;
    "scale")
        scale_service $2 $3
        ;;
    "deploy-region")
        deploy_region $2
        ;;
    "deploy-industry")
        deploy_industry $2
        ;;
    "help"|*)
        show_help
        ;;
esac
