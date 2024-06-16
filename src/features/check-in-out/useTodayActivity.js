import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

const useTodayActivity = () => {
  const {
    isLoading,
    data: activities,
    error,
  } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });
  return [isLoading, activities, error];
};

export default useTodayActivity;
