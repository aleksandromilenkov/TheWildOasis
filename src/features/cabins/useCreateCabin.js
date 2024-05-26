import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useCreateCabin = () => {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: (data) => {
      createEditCabin(data);
    },
    onSuccess: () => {
      toast.success("Successfully created a cabin");
      // this is for re-fetching the cabins table and updating the UI immediatley on success:
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return [isCreating, createCabin];
};

export default useCreateCabin;
