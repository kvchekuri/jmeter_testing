import express, { ErrorRequestHandler } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import { parsedEnv } from "./config/env";
import connectDB from "./config/database";
import apiRouter from "./index";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import { register } from "./metrics";
import { metricsMiddleware } from "./middleware/metrics";

dotenv.config();
const app = express();

// Enable compression for all responses
app.use(compression());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
if (parsedEnv.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.use(cookieParser());   

// Apply metrics middleware to all routes
app.use(metricsMiddleware);

// Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

app.use("/api", apiRouter);

// Global error handling middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('Global error handler:', err);

  // Handle custom AppError
  if (err.statusCode) {
    res.status(err.statusCode).json({
      message: err.message,
      error: err.constructor.name
    });
    return;
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    res.status(400).json({
      message: 'Validation Error',
      errors: Object.values(err.errors).map((e: any) => e.message)
    });
    return;
  }

  // Handle duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    res.status(400).json({
      message: `${field} already exists`,
      error: 'DUPLICATE_KEY'
    });
    return;
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      message: 'Invalid token',
      error: 'INVALID_TOKEN'
    });
    return;
  }

  if (err.name === 'TokenExpiredError') {
    res.status(401).json({
      message: 'Token expired',
      error: 'TOKEN_EXPIRED'
    });
    return;
  }

  // Handle MongoDB errors
  if (err.name === 'CastError') {
    res.status(400).json({
      message: 'Invalid ID format',
      error: 'INVALID_ID'
    });
    return;
  }

  // Handle general errors
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    message,
    error: parsedEnv.NODE_ENV === 'development' ? err.stack : 'Internal Server Error'
  });
};

app.use(errorHandler);

// 404 handler - using a simple catch-all route
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    error: 'NOT_FOUND'
  });
});

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

(async () => {
  try {
    await connectDB();
    app.listen(parsedEnv.PORT, () => {
      console.log(`⚡  Server ready  →  http://localhost:${parsedEnv.PORT}`);
    });
  } catch (err) {
    console.error("❌  Startup failed:", err);
    process.exit(1);
  }
})();

export default app;