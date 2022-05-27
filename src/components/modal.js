import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

const Modal = ({
  row,
  seat,
  open,
  handleClose,
  addSeat,
  getSeat,
  deleteSeat,
  section,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [numOfTickets, setNumOfTickets] = useState(1);
  const [error, setError] = useState("");
  const [deleteButton, setDeleteButton] = useState(false);

  useEffect(() => {
    setError("");
    if (getSeat(row, seat) === undefined) return;
    const { name, email } = getSeat(row, seat);
    setName(name);
    setEmail(email);
    setDeleteButton(true);
  }, [open]);

  const handleSubmit = () => {
    if (name && email && numOfTickets > 0) {
      for (let i = 0; i < numOfTickets; i++) {
        addSeat(row, seat + i, section, name, email);
        clearAll();
        handleClose();
      }
    } else {
      setError(
        "All fields must be filled in and number of tickets must be greater than 0"
      );
    }
  };

  const handleDelete = () => {
    closeModal();
    deleteSeat(row, seat);
  };

  const closeModal = () => {
    handleClose();
    clearAll();
  };

  const clearAll = () => {
    setName("");
    setEmail("");
    setError("");
    setNumOfTickets(1);
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth onClose={handleClose}>
      <DialogTitle>
        <Box
          display="flex"
          justifyContent="center"
        >{`${section} ${row}${seat}`}</Box>
      </DialogTitle>
      <DialogContent>
        {error && (
          <Box display="flex" justifyContent="center">
            <Chip color="error" label={error} />
          </Box>
        )}
        {deleteButton && (
          <Box display="flex" justifyContent="center">
            <Button color="error" onClick={handleDelete} variant="contained">
              Delete
            </Button>
          </Box>
        )}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={1}
          sx={{ marginTop: 1 }}
        >
          <Box>
            <TextField
              variant="outlined"
              label="Name"
              value={name}
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box>
            <TextField
              variant="outlined"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box display="flex">
            <TextField
              variant="outlined"
              label="Number of Tickets"
              type="number"
              value={numOfTickets}
              onChange={(e) => setNumOfTickets(e.target.value)}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItem="center"
            gap={2}
            sx={{ marginTop: 2 }}
          >
            <Button variant="outlined" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
