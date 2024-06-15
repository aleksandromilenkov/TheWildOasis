import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";

const useRecentStays = () => {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  // subDays takes the Today date and number of days to substract from Today and return that specific date in the past.
  const queryDate = subDays(new Date(), numDays).toISOString();
  const {
    isLoading,
    data: stays,
    error,
  } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );
  return [isLoading, stays, error, confirmedStays];
};

export default useRecentStays;
