import { Chip } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "./modal";

const Seat = ({ row, seat, addSeat, getSeat, deleteSeat, map, section }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [seatTaken, setSeatTaken] = useState(false);

  useEffect(() => {
    if (getSeat(row, seat) !== undefined) {
      setSeatTaken(true);
    } else {
      setSeatTaken(false);
    }
  }, [map]);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Chip
        label={seat}
        onClick={handleClick}
        color={seatTaken ? "primary" : "default"}
      />
      <Modal
        row={row}
        seat={seat}
        getSeat={getSeat}
        deleteSeat={deleteSeat}
        open={modalOpen}
        handleClose={handleClose}
        addSeat={addSeat}
        section={section}
      />
    </>
  );
};

export default Seat;
