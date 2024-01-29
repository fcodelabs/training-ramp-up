import { render, screen } from "@testing-library/react";
import { Header } from "../containers/Home/Table/TableColumns/FixedColumns/Headers/Headers";
import '@testing-library/jest-dom'

describe("Header component", () => {
  it("renders correct text with default padding", () => {
    render(<Header text="Name" />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Name")).toHaveStyle({ paddingRight: "45px" });
    expect(screen.getByText("Name")).not.toHaveStyle({ paddingRight: "100px" });
  });

  it("renders correct text with padded 'Age' style", () => {
    render(<Header text="Age" />);
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Age")).toHaveStyle({ paddingRight: "100px" });
    expect(screen.getByText("Age")).not.toHaveStyle({ paddingRight: "45px" });
  });
});
