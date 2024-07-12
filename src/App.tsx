import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  selectUsers,
  setModal,
  setSelectedUser,
  setUsers,
  User,
} from "./redux/userSlice";
import {
  Avatar,
  Container,
  Fab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UserForm from "./components/UserForm";
import { useSelector } from "react-redux";
import FadeMenu from "./components/FadeMenu";
import axios from "axios";
import DialogConfirmation from "./components/DialogConfirmation";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  const handleOpenModal = () => {
    dispatch(setModal({ modalOpen: true, modalStatus: "ADD" }));
  };

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((data) => dispatch(setUsers(data.data)))
      .catch((error) => console.error("Error:", error));
  }, [dispatch]);

  const handleEdit = (user: User) => {
    dispatch(setSelectedUser(user));
    dispatch(setModal({ modalOpen: true, modalStatus: "EDIT" }));
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        bgcolor: "background.paper",
        borderColor: "black",
        position: "relative",
        height: "100vh",
      }}
    >
      <List sx={{ maxHeight: "90vh", overflowY: "scroll" }}>
        {users.map((val, key) => {
          return (
            <ListItem
              key={key}
              secondaryAction={
                <FadeMenu
                  handleDelete={() => {
                    dispatch(setSelectedUser(val));
                    dispatch(
                      setModal({ modalOpen: true, modalStatus: "DELETE" })
                    );
                  }}
                  handleEdit={() => handleEdit(val)}
                />
              }
            >
              <ListItemAvatar>
                <Avatar alt="RmP" src={val.image} />
              </ListItemAvatar>
              <ListItemText
                primary={val.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {val.email}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        })}
      </List>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        onClick={handleOpenModal}
      >
        <AddIcon />
      </Fab>

      <UserForm />
      <DialogConfirmation />
    </Container>
  );
};

export default App;
