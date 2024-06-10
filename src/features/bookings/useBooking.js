import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

const useBooking = () => {
  const { bookingId } = useParams();
  console.log(bookingId);
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false, // by default react query will fetch 3 times data if doesn't exists in first place. but here we dont want any retries.
  });
  return { isLoading, booking, error };
};

export default useBooking;
