import { Request, Response, NextFunction } from 'express';
import { httpRequestDurationMicroseconds, httpRequestsTotal } from '../metrics';

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Track request start
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route?.path || req.path;
    const method = req.method;
    const statusCode = res.statusCode.toString();
    
    // Record metrics
    httpRequestDurationMicroseconds.observe(
      { method, route, code: statusCode }, 
      duration
    );
    
    httpRequestsTotal.inc({ method, route, code: statusCode });
  });
  
  next();
}; 