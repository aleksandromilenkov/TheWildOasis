import React from "react";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy" || "");
  const handleChange = (e) => {
    // searchParams.set("sortBy", e.target.value); since react-router@6.4 this is replaced by this bellow:
    setSearchParams((prevParams) => {
      prevParams.set("sortBy", e.target.value);
      return prevParams;
    });
  };
  return (
    <Select
      options={options}
      type={"white"}
      value={sortBy}
      onChange={handleChange}
    />
  );
};

export default SortBy;
