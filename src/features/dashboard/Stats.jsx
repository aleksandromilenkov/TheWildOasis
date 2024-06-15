import React from "react";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import { useSearchParams } from "react-router-dom";
import useCabins from "../cabins/useCabins";

const Stats = ({ bookings, confirmedStays, numDays, numCabins }) => {
  //1.
  const numBookings = bookings.length;
  //2.
  const sales = formatCurrency(
    bookings.reduce((acc, val) => val.totalPrice + acc, 0)
  );
  //3.
  const checkIns = confirmedStays.length;
  //4.
  // Ocupation rate is number of checked in nights divided by all availabale nights for all the cabins in those 7, 30 or 90 nighs
  const occupation =
    confirmedStays.reduce((acc, val) => acc + val.numNights, 0) /
    (numDays * numCabins);
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={sales}
      />
      <Stat
        title="Check-Ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
};

export default Stats;
