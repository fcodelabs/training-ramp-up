import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../containers/Home/Home"
import { Provider } from "react-redux";
import store from "../redux/store";

describe("Home component", () => {
  test("renders Home component correctly", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Replace with appropriate queries and assertions
    // Example: expect(screen.getByText("Welcome to Home")).toBeInTheDocument();
  });

  // Add more test cases as needed for different functionalities
});
