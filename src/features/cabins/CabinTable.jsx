import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

// This was used before the Compond Component:
// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// this was used before Table become compoundComponent
// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

// Version before using Compound Component:
// const CabinTable = () => {
//   const [isLoading, cabins, error] = useCabins();
//   // before puting this in custom hook:
//   // const {
//   //   isLoading,
//   //   data: cabins,
//   //   error,
//   // } = useQuery({
//   //   queryKey: ["cabins"],
//   //   queryFn: getCabins,
//   // });
//   if (isLoading) return <Spinner />;
//   return (
//     <Table role="table">
//       <TableHeader role="row">
//         <div></div>
//         <div>Cabin</div>
//         <div>Capacity</div>
//         <div>Price</div>
//         <div>Discount</div>
//         <div></div>
//       </TableHeader>
//       {cabins.map((cabin, idx) => (
//         <CabinRow cabin={cabin} key={idx} />
//       ))}
//     </Table>
//   );
// };

const CabinTable = () => {
  const [isLoading, cabins, error] = useCabins();
  const [searchParams, setSearchParams] = useSearchParams();

  // 1) Filtered:
  const filtered = searchParams.get("discount");
  let filteredCabins = cabins;
  switch (filtered) {
    case "no-discount":
      filteredCabins = cabins?.filter((cabin) => !cabin.discount);
      break;
    case "with-discount":
      filteredCabins = cabins?.filter((cabin) => !!cabin.discount);
      break;
    case "all":
      filteredCabins = cabins;
      break;
    default:
      filteredCabins = cabins;
  }

  // 2) Sorted:
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  console.log("FIELD:", field);
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort(
    (a, b) => a[field] - b[field] * modifier
  );
  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        {/* Here we are using the render props pattern where we pass a method for rendering: */}
        <Table.Body
          data={sortedCabins}
          render={(cabin, idx) => <CabinRow cabin={cabin} key={idx} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
