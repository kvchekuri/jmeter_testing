import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { parsedEnv } from "../config/env";

export const authenticate: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ 
        message: "Authorization header missing or invalid format",
        error: "AUTH_HEADER_MISSING"
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ 
        message: "No token provided",
        error: "TOKEN_MISSING"
      });
      return;
    }

    const payload = jwt.verify(token, parsedEnv.JWT_SECRET) as { 
      sub: string; 
      role: string;
      iat?: number;
      exp?: number;
    };

    // Validate payload structure
    if (!payload.sub || !payload.role) {
      res.status(401).json({ 
        message: "Invalid token payload",
        error: "INVALID_PAYLOAD"
      });
      return;
    }

    req.user = { 
      id: payload.sub, 
      role: payload.role as any 
    };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ 
        message: "Invalid or expired token",
        error: "INVALID_TOKEN"
      });
      return;
    }
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ 
        message: "Token expired",
        error: "TOKEN_EXPIRED"
      });
      return;
    }
    
    console.error('Authentication error:', error);
    res.status(500).json({ 
      message: "Authentication service error",
      error: "AUTH_SERVICE_ERROR"
    });
    return;
  }
}