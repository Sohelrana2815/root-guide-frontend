export interface ITour {
  id?: string;
  title: string;
  description: string;
  itinerary: string;

  category: string;
  city: string;

  price: number;
  duration: number;
  meetingPoint: string;
  maxGroupSize: number;
  averageRating: number;
  image?: string;
  isDeleted?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
