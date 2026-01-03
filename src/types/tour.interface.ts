export interface ITour {
  _id?: string;
  guideId?: string;
  title: string;
  description: string;
  itinerary: string;

  category: string;
  city: string;
  languages: string[];
  expertise: string[];
  price: number;
  duration: number;
  meetingPoint: string;
  maxGroupSize: number;
  averageRating?: number;
  reviewCount?: number;
  image?: string;
  isDelete?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
