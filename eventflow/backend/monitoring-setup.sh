#!/bin/bash

echo "🚀 Setting up Prometheus and Grafana monitoring for EventFlow..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Install prom-client if not already installed
echo "📦 Installing prom-client package..."
npm install prom-client

# Start monitoring stack
echo "🐳 Starting Prometheus and Grafana..."
docker-compose -f docker-compose.monitoring.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check if services are running
echo "🔍 Checking service status..."
if curl -s http://localhost:9090 > /dev/null; then
    echo "✅ Prometheus is running at http://localhost:9090"
else
    echo "❌ Prometheus failed to start"
fi

if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Grafana is running at http://localhost:3000"
else
    echo "❌ Grafana failed to start"
fi

echo ""
echo "🎉 Monitoring setup complete!"
echo ""
echo "📊 Access your monitoring dashboards:"
echo "   Prometheus: http://localhost:9090"
echo "   Grafana:    http://localhost:3000 (admin/admin)"
echo ""
echo "📋 Next steps:"
echo "   1. Start your backend server: npm run dev"
echo "   2. Access Grafana and import the dashboard"
echo "   3. View metrics at http://localhost:4000/metrics"
echo ""
echo "🛑 To stop monitoring: docker-compose -f docker-compose.monitoring.yml down" 