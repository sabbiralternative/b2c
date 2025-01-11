import moment from "moment/moment";
import { useState } from "react";
const useDatePicker = (currentDate, from) => {
  const [dateRange, setDateRange] = useState({
    startDate: !currentDate
      ? new Date(new Date().setDate(new Date().getDate() - from || 7))
      : new Date(),
    endDate: new Date(),
  });

  const onChange = (dates) => {
    setDateRange((prevState) => ({
      ...prevState,
      startDate: dates ? dates[0] : null,
      endDate: dates ? dates[1] : null,
    }));
  };

  const fromDate = moment(dateRange?.startDate).format("YYYY-MM-DD");
  const toDate = moment(dateRange?.endDate).format("YYYY-MM-DD");

  // const formattedStartDate = fromDate.split("-").reverse().join("-");
  // const formattedEndDate = toDate.split("-").reverse().join("-");
  const formattedStartDate = fromDate;
  const formattedEndDate = toDate;

  return {
    onChange,
    formattedStartDate,
    formattedEndDate,
    dateRange,
    setDateRange,
  };
};

export default useDatePicker;
