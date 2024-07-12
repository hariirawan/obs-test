import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavBar from "./NavBar";

describe("NavBar", () => {
  it("should render NavBar component correctly", () => {
    render(<NavBar />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByLabelText("menu")).toBeInTheDocument();
    expect(screen.getByText("User List")).toBeInTheDocument();
  });

  it("should render IconButton with MenuIcon", () => {
    render(<NavBar />);
    const iconButton = screen.getByLabelText("menu");
    expect(iconButton).toBeInTheDocument();
    expect(iconButton).toHaveClass("MuiIconButton-root");
    expect(iconButton.querySelector("svg")).toBeInTheDocument(); // Assuming MenuIcon is an svg
  });
});
