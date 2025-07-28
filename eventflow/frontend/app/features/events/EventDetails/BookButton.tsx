import { useNavigate } from 'react-router-dom';

interface BookButtonProps {
  eventInfo?: {
    title: string;
    date: string;
    time: string;
    location: string;
  };
}

export default function BookButton({ eventInfo }: BookButtonProps) {
  const navigate = useNavigate();

  const handleBookTicket = () => {
    navigate('/seat-selection', {
      state: { eventInfo }
    });
  };

  return (
    <div className="mt-6">
      <button 
        className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors"
        onClick={handleBookTicket}
      >
        Book Ticket
      </button>
    </div>
  );
}
  