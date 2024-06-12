import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: (data) => {
      updateCurrentUser(data);
    },
    onSuccess: () => {
      toast.success("User successfully updated");
      // this is for re-fetching the cabins table and updating the UI immediatley on success:
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return [isUpdating, updateUser];
};

export default useUpdateUser;
