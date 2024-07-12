import * as React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { useDelete, useModal } from "../hooks/useCRUD";

const DialogConfirmation = () => {
  const { handleDelete, id } = useDelete();
  const { modal, handleClose } = useModal();

  return (
    <Dialog
      open={modal.modalOpen && modal.modalStatus === "DELETE"}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure for delete this data?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => handleDelete(id)}>Yes, Sure</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirmation;
