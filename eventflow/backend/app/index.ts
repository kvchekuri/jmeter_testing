import { Router } from "express";
import authRouter from "./features/auth/routes/auth.routes";
import {userRouter, adminRouter } from "./features/users/routes/user.routes";
import { adminEventRouter, organizerEventRouter, publicEventRouter } from "./features/events/event.route";

const apiRouter = Router();

// Mount all routes
apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/admin/users', adminRouter);
apiRouter.use('/events', publicEventRouter);
apiRouter.use('/organizer/events', organizerEventRouter);
apiRouter.use('/admin/events', adminEventRouter);

// Add a simple test route
apiRouter.get('/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Test route to create sample data
apiRouter.post('/test/create-sample-event', async (req, res) => {
  try {
    const { EventModel } = await import('./features/events/models/event.model');
    const sampleEvent = await EventModel.create({
      title: 'Sample Music Event',
      description: 'A sample music event for testing',
      date: new Date(),
      location: 'On-site',
      category: 'music',
      organizer: '507f1f77bcf86cd799439011', // Sample ObjectId
      status: 'PENDING',
      costs: '25.00',
      capacity: 100
    });
    res.status(201).json({ 
      message: 'Sample event created', 
      event: sampleEvent,
      eventId: (sampleEvent as any)._id.toString()
    });
  } catch (error) {
    console.error('Error creating sample event:', error);
    res.status(500).json({ message: 'Failed to create sample event' });
  }
});

export default apiRouter;