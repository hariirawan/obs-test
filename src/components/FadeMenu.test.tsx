import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FadeMenu from "./FadeMenu";

describe("FadeMenu", () => {
  /**
   * @jest-environment jsdom
   */
  test("renders menu correctly", () => {
    const handleDelete = jest.fn();
    const handleEdit = jest.fn();

    render(<FadeMenu handleDelete={handleDelete} handleEdit={handleEdit} />);

    const moreButton = screen.getByRole("button", { name: "more" });
    fireEvent.click(moreButton);

    const editMenuItem = screen.getByText("Edit");
    fireEvent.click(editMenuItem);
    expect(handleEdit).toHaveBeenCalled();

    const deleteMenuItem = screen.getByText("Delete");
    fireEvent.click(deleteMenuItem);
    expect(handleDelete).toHaveBeenCalled();
  });

  // Add more test cases as needed
});
