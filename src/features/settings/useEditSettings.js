import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

const useEditSettings = () => {
  const queryClient = useQueryClient();
  const { isEditing, mutate: editSettings } = useMutation({
    mutationFn: (data) => {
      updateSetting(data);
    },
    onSuccess: () => {
      toast.success("Successfully updated settings");
      // this is for re-fetching the cabins table and updating the UI immediatley on success:
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return [isEditing, editSettings];
};

export default useEditSettings;
