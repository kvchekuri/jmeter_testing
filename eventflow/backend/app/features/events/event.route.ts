import { Router } from "express";
import * as eventController from "./event.controller";
import { authenticate } from "../../global_middleware/authenticator";
import { authorize } from "../../global_middleware/authorizor";
import { ORGANIZER_ROLE, ADMIN_ROLE} from "../users/roles";

// Public routes (no authentication required)
const publicEventRouter = Router();

// public endpoints - NO authentication
publicEventRouter.get("/", eventController.getAllEvents);
publicEventRouter.get("/categories/:categoryName", eventController.getEventsByCategory);
publicEventRouter.get("/:id", eventController.getEventById);

// Organizer routes (require authentication)
const organizerEventRouter = Router();
organizerEventRouter.use(authenticate, authorize(...ORGANIZER_ROLE));

// Create event - simplified route
organizerEventRouter.post("/create", eventController.createEventByCategory);

// Update and delete specific events
organizerEventRouter.route("/:id")
  .put(eventController.updateEvent)
  .delete(eventController.deleteEventById);

// Admin routes (require authentication)
const adminEventRouter = Router();
adminEventRouter.use(authenticate, authorize(...ADMIN_ROLE));

adminEventRouter.patch("/:id/audit", eventController.auditEvent);

export { publicEventRouter, organizerEventRouter, adminEventRouter };