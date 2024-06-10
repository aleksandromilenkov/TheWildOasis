import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/apiAuth";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, mutate: logoutUser } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
      // this will invalidate all the queries that are currently active on the page:
    },
  });
  return [isLoading, logoutUser];
};

export default useLogout;
