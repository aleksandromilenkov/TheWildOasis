import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { AiOutlineFieldString } from "react-icons/ai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useCheckout = () => {
  const queryClient = useQueryClient();
  const { isLoading: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: (bookingId) => {
      return updateBooking(bookingId, {
        status: "checked-out",
      });
    },
    // onSuccess accepts parametar data that is returned from the mutation function
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Booking #${data.id} successfully checked out.`);
      // this will invalidate all the queries that are currently active on the page:
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: (err) => {
      toast.error("Could not check out the booking");
    },
  });
  return [isCheckingOut, checkout];
};

export default useCheckout;
