// Unit test for userSlice.ts
import userReducer, {
  initialState,
  setUsers,
  setSelectedUser,
  setModal,
  editUser,
  onChange,
  UserState,
  ModalStatusType,
  initialForm,
  deleteUser,
} from "./userSlice";

describe("User Reducer", () => {
  let state: UserState;

  beforeEach(() => {
    state = initialState;
  });

  test("setUsers action should update users array", () => {
    const users = [
      {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        phone: "123456",
        username: "test123",
        image: "",
      },
    ];
    const nextState = userReducer(state, setUsers(users));
    expect(nextState.users).toEqual(users);
  });

  test("setSelectedUser action should update selectedUser", () => {
    const selectedUser = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      phone: "123456",
      username: "test123",
      image: "",
    };
    const nextState = userReducer(state, setSelectedUser(selectedUser));
    expect(nextState.selectedUser).toEqual(selectedUser);
  });

  test("setModal action should update modalOpen and modalStatus", () => {
    const modalState: { modalOpen: boolean; modalStatus: ModalStatusType } = {
      modalOpen: true,
      modalStatus: "EDIT",
    };
    const nextState = userReducer(state, setModal(modalState));
    expect(nextState.modalOpen).toEqual(modalState.modalOpen);
    expect(nextState.modalStatus).toEqual(modalState.modalStatus);
    expect(nextState.selectedUser).toEqual(initialForm);
  });

  test("editUser action should update user in users array", () => {
    const users = [
      {
        id: 1,
        name: "John",
        email: "john@example.com",
        phone: "12345",
        username: "john123",
        image: "",
      },
    ];
    state = { ...state, users };
    const updatedUser = { ...users[0], name: "Johnny" };
    const nextState = userReducer(state, editUser(updatedUser));
    expect(nextState.users[0].name).toEqual("Johnny");
  });

  test("onChange action should update selectedUser field", () => {
    const fieldName = "name";
    const value = "Alice";
    const nextState = userReducer(state, onChange({ name: fieldName, value }));
    expect(nextState.selectedUser[fieldName]).toEqual(value);
  });

  test("deleteUser action should delete user", () => {
    const datas = {
      selectedUser: initialForm,
      modalOpen: false,
      modalStatus: null,
      users: [
        {
          id: 1,
          name: "Test User",
          email: "test@example.com",
          phone: "123456",
          username: "test123",
          image: "",
        },
        {
          id: 2,
          name: "Test User2",
          email: "test@examplre.com",
          phone: "123456",
          username: "test123",
          image: "",
        },
      ],
    };

    const nextState = userReducer(datas, deleteUser({ id: 2 }));
    expect(nextState.users).toEqual([
      {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        phone: "123456",
        username: "test123",
        image: "",
      },
    ]);
  });
});
