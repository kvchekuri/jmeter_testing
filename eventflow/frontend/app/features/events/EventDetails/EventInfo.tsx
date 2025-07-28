type Props = {
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
  };
  
  export default function EventInfo({ title, date, time, location, description }: Props) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>
        <p><strong>Location:</strong> {location}</p>
        <p className="mt-3">{description}</p>
      </div>
    );
  }
  