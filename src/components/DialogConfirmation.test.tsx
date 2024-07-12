import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDelete, useModal } from "../hooks/useCRUD";
import DialogConfirmation from "./DialogConfirmation";
import "@testing-library/jest-dom";

jest.mock("../hooks/useCRUD");

const mockuseDelete = useDelete as jest.MockedFunction<typeof useDelete>;

const mockuseModal = useModal as jest.MockedFunction<typeof useModal>;

const mockModal = {
  modalOpen: true,
  modalStatus: null,
};

describe("UserForm", () => {
  beforeEach(() => {
    mockuseModal.mockReturnValue({
      modal: mockModal,
      handleClose: jest.fn(),
      handleOpen: jest.fn(),
    });
    mockuseDelete.mockReturnValue({
      handleDelete: jest.fn(),
      id: 0,
    });
  });

  it("should render dialog when modal is open", () => {
    render(<DialogConfirmation />);

    expect(screen.getByText("Confirmation")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure for delete this data?")
    ).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Yes, Sure")).toBeInTheDocument();
  });

  it("should call handleClose when Cancel button is clicked", () => {
    const { handleClose } = mockuseModal();
    render(<DialogConfirmation />);

    fireEvent.click(screen.getByText("Cancel"));
    expect(handleClose).toHaveBeenCalled();
  });

  it("should call handleDelete with the correct id when Yes, Sure button is clicked", () => {
    const { handleDelete } = mockuseDelete();
    render(<DialogConfirmation />);

    fireEvent.click(screen.getByText("Yes, Sure"));
    expect(handleDelete).toHaveBeenCalled();
  });
});
