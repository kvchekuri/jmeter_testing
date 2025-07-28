export interface EventProperties {
    id: number
    title: string;
    date: Date;
    time: string;
    location: string;
    image: string;
    description: string;
    category: string;
    price?: number;
    isFeatured: boolean;
    isActive: boolean;
    isDeleted: boolean;
}

export type UpdatedEventFields = {
    id?: number;
} & Partial<Omit<EventProperties, 'id'>>;

export interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  onClick?: (title: string) => void;
} 