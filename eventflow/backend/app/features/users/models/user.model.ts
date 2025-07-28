import { Schema, model } from 'mongoose';
import { User } from '../types/user.type';

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      index: true // Add index for name searches
    },
    email:  { 
      type: String, 
      required: true, 
      unique: true,
      index: true // Add index for email lookups
    },
    password:{ 
      type: String, 
      required: true,
      select: false
    },
    role: { 
      type: String, 
      enum: ['USER','ORGANIZER','ADMIN'], 
      default: 'USER',
      index: true // Add index for role filtering
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: null,
      index: true // Add index for status filtering
    }
  },
  { timestamps: true }
);

// Add compound indexes for common query patterns
UserSchema.index({ role: 1, status: 1 }); // For filtering users by role and status
UserSchema.index({ email: 1, role: 1 }); // For email and role lookups

export const UserModel = model<User>('User', UserSchema);