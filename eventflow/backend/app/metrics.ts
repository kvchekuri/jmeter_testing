import promClient from 'prom-client';
import { Express } from 'express';

// Create a Registry to register the metrics
const register = new promClient.Registry();

// Add a default label which is added to all metrics
promClient.collectDefaultMetrics({ register });

// Custom metrics for your application
export const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

export const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'code']
});

export const activeConnections = new promClient.Gauge({
  name: 'active_connections',
  help: 'Number of active connections'
});

export const databaseQueryDuration = new promClient.Histogram({
  name: 'database_query_duration_seconds',
  help: 'Duration of database queries in seconds',
  labelNames: ['operation', 'collection'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5]
});

export const eventCreationCounter = new promClient.Counter({
  name: 'events_created_total',
  help: 'Total number of events created',
  labelNames: ['category', 'status']
});

export const userRegistrationCounter = new promClient.Counter({
  name: 'users_registered_total',
  help: 'Total number of user registrations',
  labelNames: ['role']
});

export const authenticationAttempts = new promClient.Counter({
  name: 'auth_attempts_total',
  help: 'Total number of authentication attempts',
  labelNames: ['success']
});

// Register all metrics
register.registerMetric(httpRequestDurationMicroseconds);
register.registerMetric(httpRequestsTotal);
register.registerMetric(activeConnections);
register.registerMetric(databaseQueryDuration);
register.registerMetric(eventCreationCounter);
register.registerMetric(userRegistrationCounter);
register.registerMetric(authenticationAttempts);

export { register }; 