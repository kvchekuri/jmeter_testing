# 📊 EventFlow Backend Monitoring

This document describes the monitoring infrastructure for the EventFlow backend application using Prometheus and Grafana.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Monitoring Stack
```bash
# Make the setup script executable
chmod +x monitoring-setup.sh

# Run the setup script
./monitoring-setup.sh
```

### 3. Start Backend Server
```bash
npm run dev
```

### 4. Access Dashboards
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3000 (admin/admin)

## 📈 Metrics Collected

### Application Metrics
- **HTTP Request Rate**: Requests per second by endpoint
- **Response Time**: 95th percentile response times
- **Error Rate**: 5xx error percentage
- **Active Connections**: Current connection count

### Database Metrics
- **Query Duration**: Average query execution time
- **Query Count**: Number of database operations
- **Connection Pool**: Database connection utilization

### System Metrics
- **CPU Usage**: Node.js process CPU utilization
- **Memory Usage**: Heap and RSS memory consumption
- **Event Loop Lag**: JavaScript execution delays

### Business Metrics
- **Events Created**: Number of events created per second
- **User Registrations**: Number of user registrations per second
- **Authentication Attempts**: Success/failure rates

## 🔧 Configuration Files

### Prometheus Configuration (`prometheus.yml`)
- Scrapes metrics from backend at `localhost:4000/metrics`
- Scrapes metrics from frontend at `localhost:5173/metrics`
- 5-second scrape interval for backend
- 10-second scrape interval for frontend

### Alerting Rules (`alerts.yml`)
- **High Error Rate**: Alerts when error rate > 0.1/sec
- **Slow Response Time**: Alerts when 95th percentile > 2s
- **Database Slow Queries**: Alerts when avg query time > 1s
- **High Memory Usage**: Alerts when memory usage > 80%
- **High CPU Usage**: Alerts when CPU usage > 80%

### Grafana Dashboard (`grafana-dashboard.json`)
- HTTP Request Rate visualization
- Response Time percentiles
- Database Query Duration
- Error Rate tracking
- System resource usage
- Business metrics

## 🛠️ Custom Metrics

### Adding Custom Metrics
```typescript
import { Counter, Histogram, Gauge } from 'prom-client';

// Example: Track user registrations
export const userRegistrationCounter = new Counter({
  name: 'users_registered_total',
  help: 'Total number of user registrations',
  labelNames: ['role']
});

// Example: Track event creation
export const eventCreationCounter = new Counter({
  name: 'events_created_total',
  help: 'Total number of events created',
  labelNames: ['category', 'status']
});
```

### Using Database Monitoring
```typescript
import { trackDatabaseQuery } from './database-metrics';

// Example: Monitor database query
const result = await trackDatabaseQuery(
  'find', 
  'events', 
  () => EventModel.find({ status: 'APPROVED' })
);
```

## 📊 Dashboard Panels

### 1. HTTP Request Rate
- **Query**: `rate(http_requests_total[5m])`
- **Description**: Shows requests per second for each endpoint

### 2. Response Time (95th percentile)
- **Query**: `histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))`
- **Description**: 95th percentile response time

### 3. Database Query Duration
- **Query**: `rate(database_query_duration_seconds_sum[5m]) / rate(database_query_duration_seconds_count[5m])`
- **Description**: Average database query duration

### 4. Error Rate
- **Query**: `rate(http_requests_total{code=~"5.."}[5m])`
- **Description**: 5xx error rate

### 5. Memory Usage
- **Query**: `nodejs_heap_size_used_bytes`
- **Description**: Current heap memory usage

## 🔍 Troubleshooting

### Prometheus Issues
1. **Check if Prometheus is running**: `curl http://localhost:9090`
2. **Check targets**: Go to http://localhost:9090/targets
3. **Check metrics endpoint**: `curl http://localhost:4000/metrics`

### Grafana Issues
1. **Check if Grafana is running**: `curl http://localhost:3000`
2. **Check datasource**: Go to Configuration > Data Sources
3. **Import dashboard**: Go to Dashboards > Import

### Backend Metrics Issues
1. **Check if prom-client is installed**: `npm list prom-client`
2. **Check metrics endpoint**: `curl http://localhost:4000/metrics`
3. **Check server logs**: Look for metrics-related errors

## 🛑 Stopping Monitoring

```bash
# Stop monitoring stack
docker-compose -f docker-compose.monitoring.yml down

# Remove volumes (optional)
docker-compose -f docker-compose.monitoring.yml down -v
```

## 📝 Useful Commands

```bash
# View Prometheus targets
curl http://localhost:9090/api/v1/targets

# View raw metrics
curl http://localhost:4000/metrics

# Check Prometheus health
curl http://localhost:9090/-/healthy

# Check Grafana health
curl http://localhost:3000/api/health
```

## 🔐 Security Notes

- Default Grafana credentials: admin/admin
- Change default passwords in production
- Consider using HTTPS in production
- Restrict access to monitoring endpoints in production

## 📚 Additional Resources

- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [prom-client Documentation](https://github.com/siimon/prom-client) 