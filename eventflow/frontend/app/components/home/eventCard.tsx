import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import type { EventCardProps } from '~/types/events';

export const EventCard = ({ title, date, time, location, image, onClick }: Omit<EventCardProps, 'id'>) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (onClick) {
      onClick(title);
    } else {
      navigate(`/events/${encodeURIComponent(title)}`);
    }
  };

  return (
    <Card
      className="mb-4 border-0 shadow-sm"
      style={{
        borderRadius: '18px',
        background: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
        minWidth: 320,
        maxWidth: 370,
        margin: 'auto',
      }}
    >
      <Card.Img
        variant="top"
        src={image}
        alt={title}
        style={{ borderTopLeftRadius: '18px', borderTopRightRadius: '18px', height: 170, objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column justify-content-between" style={{ minHeight: 180 }}>
        <div>
          <Card.Title className="fw-semibold mb-2" style={{ fontSize: '1.15rem' }}>{title}</Card.Title>
          <div className="mb-1" style={{ color: '#555', fontWeight: 500 }}>{date}</div>
          <div className="mb-2" style={{ color: '#555', fontWeight: 500 }}>{time}</div>
          <div className="mb-3" style={{ color: '#888', fontSize: '0.98rem' }}>{location}</div>
        </div>
        <Button
          variant="outline-dark"
          className="w-100 rounded-pill fw-semibold"
          style={{ borderWidth: 1.5 }}
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}