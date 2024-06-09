import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isDeleting, mutate: removeBooking } = useMutation({
    mutationFn: (bookingId) => {
      return deleteBooking(bookingId);
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Booking successfully removed.`);
      // this will invalidate all the queries that are currently active on the page:
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: () => {
      toast.error("Could not remove the booking");
    },
  });
  return [isDeleting, removeBooking];
};

export default useDeleteBooking;
