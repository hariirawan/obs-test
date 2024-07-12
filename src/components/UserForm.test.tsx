import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserForm from "./UserForm";
import { useCreateAndUpdate, useModal } from "../hooks/useCRUD";
import "@testing-library/jest-dom";

jest.mock("../hooks/useCRUD");

const mockuseCreateAndUpdate = useCreateAndUpdate as jest.MockedFunction<
  typeof useCreateAndUpdate
>;

const mockuseModal = useModal as jest.MockedFunction<typeof useModal>;

const mockModal = {
  modalOpen: true,
  modalStatus: null,
};

const mockData = {
  id: 1,
  name: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  phone: "123-456-7890",
  image: "",
};

describe("UserForm", () => {
  beforeEach(() => {
    mockuseModal.mockReturnValue({
      modal: mockModal,
      handleClose: jest.fn(),
      handleOpen: jest.fn(),
    });
    mockuseCreateAndUpdate.mockReturnValue({
      handleSubmit: jest.fn(),
      handleChange: jest.fn(),
      data: mockData,
    });
  });

  it("should display the form for adding a user", async () => {
    const mockHandleChange = jest.fn();
    const mockHandleSubmit = jest.fn();
    const mockHandleClose = jest.fn();

    mockuseModal.mockReturnValue({
      modal: { modalOpen: true, modalStatus: "ADD" },
      handleClose: mockHandleClose,
      handleOpen: jest.fn(),
    });

    mockuseCreateAndUpdate.mockReturnValue({
      handleSubmit: mockHandleSubmit,
      handleChange: mockHandleChange,
      data: { name: "", username: "", email: "", phone: "", image: "" },
    });

    render(<UserForm />);
    expect(screen.getByText("Add User")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getByLabelText(/Username/i)).toHaveValue("");
    expect(screen.getByLabelText(/Email/i)).toHaveValue("");
    expect(screen.getByLabelText(/Phone Number/i)).toHaveValue("");
  });

  it("should display the form for updating a user", () => {
    const mockHandleChange = jest.fn();
    const mockHandleSubmit = jest.fn();
    const mockHandleClose = jest.fn();

    mockuseModal.mockReturnValue({
      modal: { modalOpen: true, modalStatus: "EDIT" },
      handleClose: mockHandleClose,
      handleOpen: jest.fn(),
    });

    mockuseCreateAndUpdate.mockReturnValue({
      handleSubmit: mockHandleSubmit,
      handleChange: mockHandleChange,
      data: {
        name: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        phone: "123-456-7890",
        image: "",
      },
    });

    render(<UserForm />);
    expect(screen.getByText("Update User")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("John Doe");
    expect(screen.getByLabelText(/Username/i)).toHaveValue("johndoe");
    expect(screen.getByLabelText(/Email/i)).toHaveValue("john@example.com");
    expect(screen.getByLabelText(/Phone Number/i)).toHaveValue("123-456-7890");
  });

  it("should handle input changes", () => {
    const { handleChange } = mockuseCreateAndUpdate();

    render(<UserForm />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "janedoe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "098-765-4321" },
    });

    expect(handleChange).toHaveBeenCalledTimes(4);
  });

  it("should handle form submission", async () => {
    const { handleSubmit } = mockuseCreateAndUpdate();

    render(<UserForm />);

    fireEvent.click(screen.getByText(/Save/i));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it("should close the modal on cancel button click", () => {
    const { handleClose } = mockuseModal();

    render(<UserForm />);

    fireEvent.click(screen.getByText(/Cancel/i));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
