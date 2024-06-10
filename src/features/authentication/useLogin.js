import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isLogingIn, mutate: loginUser } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Successfully loged in.`);
      navigate("/dashboard");
      // this will invalidate all the queries that are currently active on the page:
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: () => {
      toast.error("Incorrect email or password.");
    },
  });
  return [isLogingIn, loginUser];
};
export default useLogin;
