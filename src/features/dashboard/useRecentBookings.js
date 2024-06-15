import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useParams, useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

const useRecentBookings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  // subDays takes the Today date and number of days to substract from Today and return that specific date in the past.
  const queryDate = subDays(new Date(), numDays).toISOString();
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });
  return [isLoading, bookings, error];
};

export default useRecentBookings;
