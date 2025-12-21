export interface ITour {
  title: string;
  description: string;
  itinerary: string;

  category: string;
  city: string;

  price: number;
  duration: number;
  meetingPoint: string;
  maxGroupSize: number;
  image?: string;
}
