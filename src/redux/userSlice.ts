import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  image: string;
}

export type ModalStatusType = "ADD" | "EDIT" | "DELETE" | null;

export interface UserState {
  users: User[];
  selectedUser: User;
  modalOpen: boolean;
  modalStatus: ModalStatusType;
}

export const initialForm: User = {
  name: "",
  username: "",
  email: "",
  phone: "",
  image: "https://picsum.photos/200/200",
};

export const initialState: UserState = {
  users: [],
  selectedUser: initialForm,
  modalOpen: false,
  modalStatus: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
    setModal: (
      state,
      action: PayloadAction<{
        modalOpen: boolean;
        modalStatus: ModalStatusType;
      }>
    ) => {
      state.modalOpen = action.payload.modalOpen;
      state.modalStatus = action.payload.modalStatus;
      if (!action.payload.modalOpen) {
        state.selectedUser = initialForm;
      }
    },
    editUser(state, action: PayloadAction<User>) {
      const editedUser = action.payload;
      state.users = state.users.map((user) =>
        user.id === editedUser.id ? editedUser : user
      );
    },

    onChange(state, action: PayloadAction<{ name: string; value: string }>) {
      const { name, value } = action.payload;
      if (state.selectedUser) {
        (state.selectedUser as any)[name] = value;
      }
    },

    deleteUser(state, action: PayloadAction<{ id?: number }>) {
      state.users = state.users.filter((val) => val.id !== action.payload.id);
    },
  },
});

export const selectUsers = createSelector(
  (state: RootState) => state.user,
  (data) =>
    data.users.map((val, key) => ({
      ...val,
      image: `https://picsum.photos/200/200?random=${key}`,
    }))
);
export const selectSelectedUser = (state: RootState) => state.user.selectedUser;
export const selectModal = createSelector(
  (state: RootState) => state.user,
  (user) => ({
    modalOpen: user.modalOpen,
    modalStatus: user.modalStatus,
  })
);

export const {
  setUsers,
  setSelectedUser,
  setModal,
  onChange,
  editUser,
  deleteUser,
} = userSlice.actions;

export default userSlice.reducer;
