import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useDeleteCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => {
      deleteCabinAPI(id);
    },
    onSuccess: () => {
      toast.success("Successfully deleted a cabin");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return [isDeleting, deleteCabin];
};

export default useDeleteCabin;
