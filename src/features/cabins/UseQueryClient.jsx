import { useQueryClient } from "@tanstack/react-query";
import React from "react";

const UseQueryClient = ({ options = {} }) => {
  return useQueryClient(options || "");
};

export default UseQueryClient;
