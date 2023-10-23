import React, { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import AddNewButton from "../AddNewButton";

describe("AddNewButton Component", () => {
  test("renders", () => {
    const TestComponent = () => {
      const [visible, setVisible] = useState(false);

      return (
        <div>
          <AddNewButton label="Add New" onClick={() => setVisible(!visible)} />
          {visible && <p>Content is Visible</p>}
        </div>
      );
    };

    render(<TestComponent />);
    const addButton = screen.getByText("Add New");

    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);

    const visibleContent = screen.getByText("Content is Visible");
    expect(visibleContent).toBeInTheDocument();
  });
});
