import React from 'react';
import { EventCard } from './eventCard';

const mockEvents = [
  {
    id: 1,
    title: 'NYC Music Fest',
    date: '10th March, 2025',
    time: '10:00 AM',
    location: 'Central Park,NYC',
    image:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'Picasso & Modern Art Exhibit',
    date: '12th March, 2025',
    time: '3:00PM',
    location: 'ABC Gallery, Paris',
    image:
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: 'Global Tech Innovators Summit',
    date: '12th Oct, 2023',
    time: '3:00 PM',
    location: 'Innovation Hub, New York',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    title: 'Retro Night',
    date: '16th Oct, 2023',
    time: '7:00PM',
    location: 'Country Club, New York.',
    image:
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
  },
];

export const EventList = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-5 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockEvents.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            date={event.date}
            time={event.time}
            location={event.location}
            image={event.image}
            // onClick={...} // if you use onClick, pass title as argument
          />
        ))}
      </div>
    </div>
  );
};