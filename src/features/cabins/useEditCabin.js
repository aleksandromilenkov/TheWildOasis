import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useEditCabin = () => {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: (data) => {
      createEditCabin(data.newCabinData, data.editId);
    },
    onSuccess: () => {
      toast.success("Successfully edited a cabin");
      // this is for re-fetching the cabins table and updating the UI immediatley on success:
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return [isEditing, editCabin];
};

export default useEditCabin;
