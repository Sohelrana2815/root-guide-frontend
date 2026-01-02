import { getTourById } from "@/services/guide/toursManagement";

// we will fetch/get tour details here specific tour not only tour but also guide details

const BookingTourDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const result = await getTourById(id);

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h2> Booked Tour Detail Page</h2>
    </div>
  );
};

export default BookingTourDetailPage;
