import { renderHook, act } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useDispatch, useSelector } from "react-redux";
import { useCreateAndUpdate, useDelete, useModal } from "./useCRUD";
import {
  onChange,
  setModal,
  setUsers,
  editUser,
  selectSelectedUser,
  selectUsers,
  selectModal,
  deleteUser,
} from "../redux/userSlice";

// Mock the redux hooks
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;

// Setup axios mock
const mockAxios = new MockAdapter(axios);

const mockData = {
  id: 1,
  name: "John Doe",
  username: "johndoe",
  email: "johndoe@gmail.com",
  phone: "08998123143",
  image: "https://picsum.photos/200/200",
};
describe("useCRUD", () => {
  beforeEach(() => {
    mockUseDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  describe("useModal", () => {
    it("should handle form close correctly", () => {
      const { result } = renderHook(() => useModal());

      act(() => {
        result.current.handleClose();
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        setModal({ modalOpen: false, modalStatus: null })
      );
    });

    it("should handle modal open with status ADD correctly", () => {
      const { result } = renderHook(() => useModal());

      act(() => {
        result.current.handleOpen("ADD");
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        setModal({ modalOpen: false, modalStatus: "ADD" })
      );
    });

    it("should handle modal open with status EDIT correctly", () => {
      const { result } = renderHook(() => useModal());

      act(() => {
        result.current.handleOpen("EDIT");
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        setModal({ modalOpen: false, modalStatus: "EDIT" })
      );
    });

    it("should handle modal open with status DELETE correctly", () => {
      const { result } = renderHook(() => useModal());

      act(() => {
        result.current.handleOpen("DELETE");
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        setModal({ modalOpen: false, modalStatus: "DELETE" })
      );
    });
  });

  describe("useDelete", () => {
    it("should delete a user and dispatch actions", async () => {
      // Arrange
      mockAxios
        .onDelete("https://jsonplaceholder.typicode.com/users/1")
        .reply(201, mockData); // Mocking a successful API call

      const { result } = renderHook(() => useDelete());

      // Act
      await act(async () => {
        result.current.handleDelete(1); // Call the delete function with user id 1
      });

      // Assert
      expect(mockDispatch).toHaveBeenCalledWith(deleteUser({ id: 1 }));
      expect(mockDispatch).toHaveBeenCalledWith(
        setModal({ modalOpen: false, modalStatus: null })
      );
    });
  });

  describe("useCreateAndUpdate", () => {
    it("should handle input changes correctly", () => {
      mockUseSelector.mockImplementation((selector) => {
        if (selector === selectSelectedUser) return { name: "", username: "" };
        return null;
      });

      const { result } = renderHook(() => useCreateAndUpdate());

      act(() => {
        result.current.handleChange({
          target: { name: "name", value: "John Doe" },
        } as any);
      });

      expect(mockDispatch).toHaveBeenCalledWith(
        onChange({ name: "name", value: "John Doe" })
      );
    });

    it("should handle submit for add user", async () => {
      mockUseSelector.mockImplementation((selector) => {
        if (selector === selectUsers) return [];
        if (selector === selectSelectedUser) return mockData;
        if (selector === selectModal)
          return { modalStatus: "ADD", modalOpen: true };
        return null;
      });

      mockAxios
        .onPost("https://jsonplaceholder.typicode.com/users", mockData)
        .reply(201, mockData);

      const { result } = renderHook(() => useCreateAndUpdate());

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(mockDispatch).toHaveBeenCalledWith(setUsers([mockData]));
      expect(mockDispatch).toHaveBeenCalledWith(
        setModal({ modalOpen: false, modalStatus: null })
      );
    });

    it("should handle submit for EDIT user", async () => {
      mockUseSelector.mockImplementation((selector) => {
        if (selector === selectUsers) return [{ id: 1, name: "John Doe" }];
        if (selector === selectSelectedUser) return mockData;
        if (selector === selectModal)
          return { modalStatus: "EDIT", modalOpen: true };
        return null;
      });

      mockAxios
        .onPut("https://jsonplaceholder.typicode.com/users/1", mockData)
        .reply(200, mockData);

      const { result } = renderHook(() => useCreateAndUpdate());

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(mockDispatch).toHaveBeenCalledWith(editUser(mockData));
      expect(mockDispatch).toHaveBeenCalledWith(
        setModal({ modalOpen: false, modalStatus: null })
      );
    });
  });
});
