export interface IReview {
  _id?: string;

  touristId: string;
  tourId: string;
  guideId: string;

  // CRITICAL: Linking to booking ensures this is a "Verified Purchase"
  // It prevents users from reviewing tours they never actually took.
  bookingId: string;

  // 2. Content
  rating: number; // 1 to 5 (Integers or float like 4.5)
  comment: string; // The text feedback

  // 3. Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}
