import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewPasswordPage from "../containers/NewPasswordPage/NewPasswordPage";

describe("NewPasswordPage Component", () => {
  it("renders without crashing", () => {
    render(React.createElement(NewPasswordPage));
  });

  it("handles password input change correctly", () => {
    const { getByLabelText } = render(React.createElement(NewPasswordPage));
    const passwordInput = getByLabelText("Password") as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput.value).toBe("password123");
  });

  it("handles confirm password input change correctly", () => {
    const { getByLabelText } = render(React.createElement(NewPasswordPage));
    const confirmPasswordInput = getByLabelText(
      "Confirm Password"
    ) as HTMLInputElement;
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    expect(confirmPasswordInput.value).toBe("password123");
  });

  it("shows error message when password is missing and submit is clicked", () => {
    const { getByText } = render(React.createElement(NewPasswordPage));
    fireEvent.click(getByText("Submit"));
    expect(getByText("Password is required")).toBeInTheDocument();
  });

  it("shows error message when confirm password is missing and submit is clicked", () => {
    const { getByText } = render(React.createElement(NewPasswordPage));
    fireEvent.click(getByText("Submit"));
    expect(getByText("Confirm Password is required")).toBeInTheDocument();
  });

  it("shows error message when password does not match confirm password", () => {
    const { getByLabelText, getByText } = render(
      React.createElement(NewPasswordPage)
    );
    const passwordInput = getByLabelText("Password");
    const confirmPasswordInput = getByLabelText("Confirm Password");
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password456" },
    });
    fireEvent.click(getByText("Submit"));
    expect(getByText("Password does not match")).toBeInTheDocument();
  });

  it("calls handleSubmit when submit button is clicked with valid credentials", () => {
    const { getByText, getByLabelText } = render(
      React.createElement(NewPasswordPage)
    );
    const passwordInput = getByLabelText("Password");
    const confirmPasswordInput = getByLabelText("Confirm Password");
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.click(getByText("Submit"));
    // Write expectations for handleSubmit function call
  });

  // Additional test cases can be added for other scenarios as needed
});
