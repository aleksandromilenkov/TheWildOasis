import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export const useBookings = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };
  console.log("FILTER IN USE BOOKINGS", filter);
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter], // this is dependency array, so when the filter changes, then react Query will re-fetch the bookings
    queryFn: () => getBookings(filter),
  });
  return [isLoading, bookings, error];
};
