import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { AiOutlineFieldString } from "react-icons/ai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isCheckingIn, mutate: checkin } = useMutation({
    mutationFn: (bookingId) => {
      return updateBooking(bookingId, { isPaid: true, status: "checked-in" });
    },
    // onSuccess accepts parametar data that is returned from the mutation function
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Booking #${data.id} successfully checked in.`);
      // this will invalidate all the queries that are currently active on the page:
      queryClient.invalidateQueries({
        active: true,
      });
      navigate("/");
    },
    onError: (err) => {
      navigate("/");
    },
  });
  return [isCheckingIn, checkin];
};

export default useCheckin;
