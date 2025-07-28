import { useParams } from 'react-router-dom';
import EventInfo from "../features/events/EventDetails/EventInfo";
import EventMap from "../features/events/EventDetails/EventMap";
import BookButton from "../features/events/EventDetails/BookButton";

// Mock events data
const mockEvents = [
  {
    id: 1,
    title: 'NYC Music Fest',
    date: '10th March, 2025',
    time: '10:00 AM',
    location: 'Central Park,NYC',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    description: 'Join us for a vibrant music festival at Central Park featuring indie artists, food stalls, and immersive performances.',
  },
  {
    id: 2,
    title: 'Picasso & Modern Art Exhibit',
    date: '12th March, 2025',
    time: '3:00PM',
    location: 'ABC Gallery, Paris',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80',
    description: 'Join us for a vibrant art exhibit at ABC Gallery featuring indie artists, food stalls, and immersive art.',
  },
  {
    id: 3,
    title: 'Global Tech Innovators Summit',
    date: '12th Oct, 2023',
    time: '3:00 PM',
    location: 'Innovation Hub, New York',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'A summit bringing together the brightest minds in technology to discuss innovation and future trends.',
  },
  {
    id: 4,
    title: 'Retro Night',
    date: '16th Oct, 2023',
    time: '7:00PM',
    location: 'Country Club, New York.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80',
    description: 'A nostalgic evening of retro music, fashion, and entertainment from the golden era.',
  },
];

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const decodedTitle = decodeURIComponent(id || '');
  const event = mockEvents.find(e => e.title === decodedTitle) || mockEvents[0];

  return (
    <div className="max-w-screen-lg mx-auto">
      {/* Header Image */}
      {event.image && (
        <div className="w-full h-[300px] overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left (Event Info + Map + Book Button) */}
        <div className="md:col-span-2">
          <EventInfo
            title={event.title}
            date={event.date}
            time={event.time}
            location={event.location}
            description={event.description}
          />
          <EventMap />
          <BookButton eventInfo={{
            title: event.title,
            date: event.date,
            time: event.time,
            location: event.location
          }} />
        </div>

        {/* Right (Chat Box or future components) */}
        <div>{/* Add Chat Box Here Later */}</div>
      </div>
    </div>
  );
}
