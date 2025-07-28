import { useSearchParams } from "react-router-dom";
import React from "react";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const mockEvents = [
    { id: 1, name: "🎤 NYC Music Fest", location: "Central Park" },
    { id: 2, name: "💡 Global Tech Summit", location: "New York" },
    { id: 3, name: "🖼️ Art Expo 2025", location: "Nova Scotia" },
  ];

  const filteredEvents = mockEvents.filter(
    event =>
      event.name.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query)
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        Search Results for: <span className="text-orange-600">"{query}"</span>
      </h2>

      {filteredEvents.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredEvents.map(event => (
            <li key={event.id} className="p-4 border rounded shadow-sm">
              <h3 className="text-lg font-bold">{event.name}</h3>
              <p className="text-sm text-gray-600">📍 {event.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
