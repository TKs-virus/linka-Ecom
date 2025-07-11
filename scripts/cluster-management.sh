#!/bin/bash

# Linka Platform Cluster Management Script
# Usage: ./cluster-management.sh [command] [options]

set -e

COMPOSE_FILE="docker-compose.clusters.yml"
PROJECT_NAME="linka-platform"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO: $1${NC}"
}

# Check if Docker and Docker Compose are installed
check_dependencies() {
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed. Please install Docker first."
        exit 1
    fi

    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
}

# Start all clusters
start_all() {
    log "Starting all Linka Platform clusters..."
    docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME up -d
    log "All clusters started successfully!"
    show_status
}

# Stop all clusters
stop_all() {
    log "Stopping all Linka Platform clusters..."
    docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME down
    log "All clusters stopped successfully!"
}

# Restart all clusters
restart_all() {
    log "Restarting all Linka Platform clusters..."
    docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME restart
    log "All clusters restarted successfully!"
}

# Build all images
build_all() {
    log "Building all Linka Platform images..."
    docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME build --no-cache
    log "All images built successfully!"
}

# Deploy specific region
deploy_region() {
    local region=$1
    if [ -z "$region" ]; then
        error "Please specify a region: us-east, us-west, eu, asia"
        exit 1
    fi

    log "Deploying region: $region"
    case $region in
        "us-east")
            docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME up -d shop-us-east-1 shop-us-east-2
            ;;
        "us-west")
            docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME up -d shop-us-west-1 shop-us-west-2
            ;;
        "eu")
            docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME up -d shop-eu-1 shop-eu-2
            ;;
        "asia")
            docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME up -d shop-asia-1 shop-asia-2
            ;;
        *)
            error "Invalid region: $region. Valid regions: us-east, us-west, eu, asia"
            exit 1
            ;;
    esac
    log "Region $region deployed successfully!"
}

# Deploy specific industry
deploy_industry() {
    local industry=$1
    if [ -z "$industry" ]; then
        error "Please specify an industry: ecommerce, elearning, fooddelivery, healthcare, travel, wholesale"
        exit 1
    fi

    log "Deploying industry: $industry"
    case $industry in
        "ecommerce")
            docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME up -d ecommerce-service-1 ecommerce-service-2
            ;;
        "elearning")
            docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME up -d elearning-service-1 elearning-service-2
            ;;
        "fooddelivery")
            docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME up -d fooddelivery-service-1 fooddelivery-service-2
            ;;
        "healthcare")
            docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME up -d healthcare-service-1 healthcare-service-2
            ;;
        "travel")
            docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME up -d travel-service-1 travel-service-2
            ;;
        "wholesale")
            docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME up -d wholesale-service-1 wholesale-service-2
            ;;
        *)
            error "Invalid industry: $industry. Valid industries: ecommerce, elearning, fooddelivery, healthcare, travel, wholesale"
            exit 1
            ;;
    esac
    log "Industry $industry deployed successfully!"
}

# Scale a specific service
scale_service() {
    local service=$1
    local replicas=$2
    
    if [ -z "$service" ] || [ -z "$replicas" ]; then
        error "Usage: scale <service_name> <replica_count>"
        exit 1
    fi

    log "Scaling $service to $replicas replicas..."
    docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME up -d --scale $service=$replicas $service
    log "Service $service scaled to $replicas replicas successfully!"
}

# Show cluster status
show_status() {
    info "Linka Platform Cluster Status:"
    echo ""
    docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME ps
    echo ""
    info "Network Status:"
    docker network ls | grep linka
    echo ""
    info "Volume Status:"
    docker volume ls | grep linka
}

# Show logs for a specific service
show_logs() {
    local service=$1
    if [ -z "$service" ]; then
        error "Please specify a service name"
        exit 1
    fi

    log "Showing logs for $service..."
    docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME logs -f $service
}

# Health check for all services
health_check() {
    log "Performing health check on all services..."
    
    # Check main platform
    if curl -f http://localhost/health &> /dev/null; then
        log "✓ Main platform is healthy"
    else
        warn "✗ Main platform is not responding"
    fi

    # Check monitoring
    if curl -f http://localhost:9090/-/healthy &> /dev/null; then
        log "✓ Prometheus is healthy"
    else
        warn "✗ Prometheus is not responding"
    fi

    if curl -f http://localhost:3001/api/health &> /dev/null; then
        log "✓ Grafana is healthy"
    else
        warn "✗ Grafana is not responding"
    fi

    log "Health check completed!"
}

# Clean up everything
cleanup() {
    warn "This will remove all containers, networks, and volumes. Are you sure? (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        log "Cleaning up all Linka Platform resources..."
        docker-compose -f $COMPOSE_FILE -p $PROJECT_NAME down -v --remove-orphans
        docker system prune -f
        log "Cleanup completed!"
    else
        info "Cleanup cancelled."
    fi
}

# Show help
show_help() {
    echo "Linka Platform Cluster Management Script"
    echo ""
    echo "Usage: $0 [command] [options]"
    echo ""
    echo "Commands:"
    echo "  start                    Start all clusters"
    echo "  stop                     Stop all clusters"
    echo "  restart                  Restart all clusters"
    echo "  build                    Build all images"
    echo "  status                   Show cluster status"
    echo "  health                   Perform health check"
    echo "  cleanup                  Clean up all resources"
    echo ""
    echo "  deploy-region <region>   Deploy specific region (us-east, us-west, eu, asia)"
    echo "  deploy-industry <name>   Deploy specific industry"
    echo "  scale <service> <count>  Scale a service to specified replica count"
    echo "  logs <service>           Show logs for a specific service"
    echo ""
    echo "Examples:"
    echo "  $0 start"
    echo "  $0 deploy-region us-east"
    echo "  $0 deploy-industry ecommerce"
    echo "  $0 scale shop-us-east-1 3"
    echo "  $0 logs main-platform"
}

# Main script logic
main() {
    check_dependencies

    case "${1:-}" in
        "start")
            start_all
            ;;
        "stop")
            stop_all
            ;;
        "restart")
            restart_all
            ;;
        "build")
            build_all
            ;;
        "status")
            show_status
            ;;
        "health")
            health_check
            ;;
        "cleanup")
            cleanup
            ;;
        "deploy-region")
            deploy_region "$2"
            ;;
        "deploy-industry")
            deploy_industry "$2"
            ;;
        "scale")
            scale_service "$2" "$3"
            ;;
        "logs")
            show_logs "$2"
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        *)
            error "Unknown command: ${1:-}"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
