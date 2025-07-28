import { Schema, model } from 'mongoose';
import { Event } from '../types/event.type';

const EventSchema = new Schema<Event>(
  {
    title: { 
      type: String, 
      required: true,
      index: true // Add index for title searches
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      index: true // Add index for category filtering
    },
    date: {
      type: Date,
      default: Date.now,
      index: true // Add index for date sorting/filtering
    },
    location: {
      type: String,
      enum: ['Online', 'On-site'], 
      required: true,
      index: true // Add index for location filtering
    },
    capacity: {
      type: Number,
      required: false
    },
    costs: {
      type: String,
      required: true
    },
    status: { 
      type: String, 
      enum: ['PENDING','APPROVED','REJECTED'], 
      default: 'PENDING',
      index: true // Add index for status filtering
    },
    organizer: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
      index: true // Add index for organizer queries
    }
  },
  { timestamps: true }
);

// Add compound indexes for common query patterns
EventSchema.index({ category: 1, status: 1 }); // For filtering by category and status
EventSchema.index({ organizer: 1, status: 1 }); // For organizer's events by status
EventSchema.index({ date: 1, status: 1 }); // For upcoming events
EventSchema.index({ createdAt: -1 }); // For sorting by creation date

export const EventModel = model<Event>('Event', EventSchema);
