import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AdminPage from "../containers/AdminPage/AdminPage";

describe("AdminPage Component", () => {
  it("renders without crashing", () => {
    render(React.createElement(AdminPage));
  });

  // Add more test cases here as needed
});
