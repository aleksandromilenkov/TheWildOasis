import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export const useBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  // Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  // Sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // this is dependency array, so when the filter or sortBy changes, then react Query will re-fetch the bookings
    queryFn: () => getBookings(filter, sortBy, page),
  });

  // Pre-Fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    // This is fetching the next page to be ready when we click on the Next-> button.
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1], // this is dependency array, so when the filter or sortBy changes, then react Query will re-fetch the bookings
      queryFn: () => getBookings(filter, sortBy, page + 1),
    });

  if (page > 1)
    // This is fetching the prev page to be ready when we click on the <-Prev button.
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1], // this is dependency array, so when the filter or sortBy changes, then react Query will re-fetch the bookings
      queryFn: () => getBookings(filter, sortBy, page - 1),
    });

  return [isLoading, bookings, count, error];
};
