import {EventModel} from "./models/event.model";
import { UpdateQuery } from "mongoose";
import { CreateAndUpdateEventInput, LeanEvent } from "./types/event.type";

// Simple in-memory cache for events
const eventCache = new Map<string, any>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export class EventService {
  // public
  static async getAll() {
    try {
      const cacheKey = 'all_events';
      const cached = eventCache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
      }

      const events = await EventModel.find()
        .sort({ createdAt: -1 })
        .lean()
        .exec();

      // Cache the result
      eventCache.set(cacheKey, {
        data: events,
        timestamp: Date.now()
      });

      return events;
    } catch (error) {
      console.error('Error fetching all events:', error);
      throw new Error('Failed to fetch events');
    }
  }

  static async getByCategory(category: string) {
    try {
      const cacheKey = `category_${category}`;
      const cached = eventCache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
      }

      const events = await EventModel.find({ category })
        .lean()
        .exec();

      // Cache the result
      eventCache.set(cacheKey, {
        data: events,
        timestamp: Date.now()
      });

      return events;
    } catch (error) {
      console.error('Error fetching events by category:', error);
      throw new Error('Failed to fetch events by category');
    }
  }

  static async getOne(id: string) {
    try {
      const cacheKey = `event_${id}`;
      const cached = eventCache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
      }

      const event = await EventModel.findById(id).lean().exec();
      
      if (!event) {
        throw new Error('Event not found');
      }

      // Cache the result
      eventCache.set(cacheKey, {
        data: event,
        timestamp: Date.now()
      });

      return event;
    } catch (error) {
      console.error('Error fetching event:', error);
      throw error;
    }
  }

  // organizer
  static async createEvent(data: CreateAndUpdateEventInput): Promise<LeanEvent> {
    try {
      const { title, category, date, location, costs } = data;
      if (!title || !category || !date || !location || !costs) {
        throw new Error(
          "Missing required fields: title, category, date, location, and costs are mandatory."
        );
      }

      const created = await EventModel.create(data);
      const result = created.toObject() as LeanEvent;

      // Clear cache after creating new event
      eventCache.clear();

      return result;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  static async update(
    id: string,
    patch: UpdateQuery<CreateAndUpdateEventInput>
  ): Promise<LeanEvent | null> {
    try {
      const result = await EventModel.findByIdAndUpdate(id, patch, {
          new: true,
          runValidators: true
        })
        .lean()
        .exec() as LeanEvent | null;

      if (result) {
        // Clear cache after updating event
        eventCache.clear();
      }

      return result;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }

  static async deleteOne(id: string) {
    try {
      const result = await EventModel.findByIdAndDelete(id).exec();
      
      if (result) {
        // Clear cache after deleting event
        eventCache.clear();
      }

      return result;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }

  static async deleteMany(ids: string[]) {
    try {
      const result = await EventModel.deleteMany({ _id: { $in: ids } }).exec();
      
      if (result.deletedCount > 0) {
        // Clear cache after deleting events
        eventCache.clear();
      }

      return result;
    } catch (error) {
      console.error('Error deleting multiple events:', error);
      throw error;
    }
  }

  // admin
  static async audit(id: string, status: "APPROVED" | "REJECTED") {
    try {
      const result = await EventModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
      
      if (result) {
        // Clear cache after auditing event
        eventCache.clear();
      }

      return result;
    } catch (error) {
      console.error('Error auditing event:', error);
      throw error;
    }
  }

  // Clear cache method for manual cache invalidation
  static clearCache() {
    eventCache.clear();
  }
}