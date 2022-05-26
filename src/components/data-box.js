import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { CENTER, LEFT, RIGHT } from "../common/arrangement";

const DataBox = ({ map }) => {
  const [assigned, setAssigned] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(calculateTotalSeats());
    setAssigned(Object.keys(map).length);
  }, [map]);

  const calculateTotalSeats = () => {
    let sum = 0;
    LEFT.forEach((data) => (sum += data.seats));
    RIGHT.forEach((data) => (sum += data.seats));
    CENTER.forEach((data) => (sum += data.seats));
    return sum;
  };
  return (
    <Box
      fontFamily="'Lato', sans-serif;"
      fontSize={25}
      display="flex"
      justifyContent="center"
      marginBottom={5}
    >
      <Box>
        Assigned Seats: {assigned}/{total}
      </Box>
    </Box>
  );
};

export default DataBox;
