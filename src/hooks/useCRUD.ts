import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  deleteUser,
  editUser,
  onChange,
  selectModal,
  selectSelectedUser,
  selectUsers,
  setModal,
  setUsers,
} from "../redux/userSlice";
import axios from "axios";

export function useModal() {
  const modal = useSelector(selectModal);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setModal({ modalOpen: false, modalStatus: null }));
  };

  const handleOpen = (status: "ADD" | "EDIT" | "DELETE" | null) => {
    dispatch(setModal({ modalOpen: false, modalStatus: status }));
  };

  return {
    modal,
    handleClose,
    handleOpen,
  };
}

export function useDelete() {
  const data = useSelector(selectSelectedUser);
  const dispatch = useDispatch();
  const handleDelete = (id: number) => {
    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + id)
      .then((_) => {
        dispatch(deleteUser({ id }));
        dispatch(setModal({ modalOpen: false, modalStatus: null }));
      });
  };

  return { handleDelete, id: data?.id ?? 0 };
}

export function useCreateAndUpdate() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const modal = useSelector(selectModal);
  const data = useSelector(selectSelectedUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(onChange({ name, value }));
  };

  const handleSubmit = () => {
    if (modal.modalStatus === "ADD") {
      axios
        .post("https://jsonplaceholder.typicode.com/users", data)
        .then((res) => {
          dispatch(setUsers([...users, res.data]));
          dispatch(setModal({ modalOpen: false, modalStatus: null }));
        });
    } else {
      axios
        .put(`https://jsonplaceholder.typicode.com/users/${data.id}`, data)
        .then((res) => {
          dispatch(editUser(res.data));
          dispatch(setModal({ modalOpen: false, modalStatus: null }));
        });
    }
  };

  return {
    data,
    handleChange,
    handleSubmit,
  };
}
