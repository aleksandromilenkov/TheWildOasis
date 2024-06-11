import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signup as signupAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

const useSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ email, password }) => signupAPI({ email, password }),
    onSuccess: (data) => {
      console.log(data);
      toast.success(
        "Account successfully created. Please verify the new account from your email address "
      );
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { signup, isLoading };
};

export default useSignup;
