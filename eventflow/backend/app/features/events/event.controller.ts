import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import {EventModel} from "./models/event.model";    
import type { LeanUser } from "../users/types/user.type";
import { EventService } from "./event.service";
import { CreateAndUpdateEventInput } from "./types/event.type";

// GET http://localhost:5174/api/events
export async function getAllEvents(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const events = await EventService.getAll();
    res.status(200).json(events);
  } catch (err) {
    next(createHttpError(500, "Failed to fetch events"));
  }
}

// GET http://localhost:5174/api/events/categories/:categoryName
export async function getEventsByCategory(
  req: Request<{ categoryName: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const events = await EventService.getByCategory(req.params.categoryName);
    res.status(200).json(events);
  } catch (err) {
    next(createHttpError(500, "Failed to fetch events by category"));
  }
}

// GET http://localhost:5174/api/events/:id
export async function getEventById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    // Validate ObjectId format
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return next(createHttpError(400, "Invalid event ID format"));
    }
    
    const event = await EventService.getOne(id);
    if (!event) return next(createHttpError(404, "Event not found"));
    res.status(200).json(event);
  } catch (err) {
    console.error('Error fetching event:', err);
    next(createHttpError(500, "Failed to fetch event"));
  }
}

// POST http://localhost:4000/api/organizer/events/create
export async function createEventByCategory(
  req: Request<{}, unknown, Partial<CreateAndUpdateEventInput>>,
  res: Response,
  next: NextFunction
) {
  try {
    const userObj = req.user as Partial<LeanUser> & { id?: string };
    const organizer = (userObj as any)._id ?? userObj.id;
    const body = req.body as Partial<CreateAndUpdateEventInput>;

    if (!body.date) body.date = new Date();
    if (!body.category) {
      return next(createHttpError(400, "Category is required"));
    }
    if (!body.title) {
      return next(createHttpError(400, "Title is required"));
    }

    const input: CreateAndUpdateEventInput = {
      ...body,
      organizer
    } as CreateAndUpdateEventInput;

    const newEvent = await EventService.createEvent(input);
    res.status(201).json(newEvent);
  } catch (err) {
    console.error('Create event failed →', err); 
    next(createHttpError(400, "Failed to create event"));
  }
}

// PUT http://localhost:5174/api/events/:id
export async function updateEvent(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    // Validate ObjectId format
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return next(createHttpError(400, "Invalid event ID format"));
    }
    
    const updated = await EventModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return next(createHttpError(404, "Event not found"));
    res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating event:', err);
    next(createHttpError(400, "Failed to update event"));
  }
}

// DELETE http://localhost:5174/api/events/:id
export async function deleteEventById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    // Validate ObjectId format
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return next(createHttpError(400, "Invalid event ID format"));
    }
    
    const removed = await EventModel.findByIdAndDelete(id);
    if (!removed) return next(createHttpError(404, "Event not found"));
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting event:', err);
    next(createHttpError(500, "Failed to delete event"));
  }
}

// DELETE http://localhost:5174/api/events/  (ids in body: { ids: string[] })
export async function deleteManyEvents(
  req: Request<unknown, unknown, { ids: string[] }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0)
      return next(createHttpError(400, "ids array required"));
    await EventModel.deleteMany({ _id: { $in: ids } });
    res.status(204).end();
  } catch (err) {
    next(createHttpError(500, "Failed to delete events"));
  }
}

// PATCH http://localhost:5174/api/admin/events/:id/audit   { status: "APPROVED" | "REJECTED" }
export async function auditEvent(
  req: Request<{ id: string }, unknown, { status: "APPROVED" | "REJECTED" }>,
  res: Response,
  next: NextFunction
) {
  try {
    // Validate ObjectId format
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return next(createHttpError(400, "Invalid event ID format"));
    }
    
    const { status } = req.body;
    if (!["APPROVED", "REJECTED"].includes(status))
      return next(createHttpError(400, "Invalid status"));

    const event = await EventModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!event) return next(createHttpError(404, "Event not found"));
    res.status(200).json(event);
  } catch (err) {
    console.error('Error auditing event:', err);
    next(createHttpError(500, "Failed to audit event"));
  }
}

