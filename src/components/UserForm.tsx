import React from "react";
import {
  Button,
  TextField,
  Grid,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useCreateAndUpdate, useModal } from "../hooks/useCRUD";

const UserForm = () => {
  const { modal, handleClose } = useModal();
  const { handleSubmit, handleChange, data } = useCreateAndUpdate();

  return (
    <Dialog
      open={
        modal.modalOpen &&
        (modal.modalStatus === "ADD" || modal.modalStatus === "EDIT")
      }
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        {modal.modalStatus === "ADD" ? "Add User" : "Update User"}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item alignItems={"center"} display={"flex"}>
            <Avatar
              alt="Remy Sharp"
              src={data?.image}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Name"
              name="name"
              value={data?.name}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Username"
              name="username"
              value={data?.username}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Email"
              name="email"
              value={data?.email}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Phone Number"
              name="phone"
              value={data?.phone}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="standard"
              required
              autoComplete="email"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;
