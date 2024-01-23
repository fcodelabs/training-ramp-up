import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Table from "../containers/Home/Table/Table";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ThemeProvider } from "styled-components";
import { createTheme } from "@mui/material";
const theme = createTheme();

describe("Table component", () => {
  test("renders Table component correctly", async () => {
    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Table />
        </ThemeProvider>
      </Provider>
    );

    // Replace with appropriate queries and assertions
    // Example: expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  // Add more test cases as needed for different functionalities
});
