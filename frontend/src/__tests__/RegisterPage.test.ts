import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RegisterPage from "../containers/RegisterPage/RegisterPage";

describe("RegisterPage Component", () => {
  it("renders without crashing", () => {
    render(React.createElement(RegisterPage));
  });

  it("handles username input change correctly", () => {
    const { getByLabelText } = render(React.createElement(RegisterPage));
    const usernameInput = getByLabelText("Username") as HTMLInputElement;
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    expect(usernameInput.value).toBe("testuser");
  });

  it("handles email input change correctly", () => {
    const { getByLabelText } = render(React.createElement(RegisterPage));
    const emailInput = getByLabelText("Email") as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");
  });

  it("handles password input change correctly", () => {
    const { getByLabelText } = render(React.createElement(RegisterPage));
    const passwordInput = getByLabelText("Password") as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput.value).toBe("password123");
  });

  it("handles confirm password input change correctly", () => {
    const { getByLabelText } = render(React.createElement(RegisterPage));
    const confirmPasswordInput = getByLabelText(
      "Confirm Password"
    ) as HTMLInputElement;
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    expect(confirmPasswordInput.value).toBe("password123");
  });

  it("shows error message when username is missing and submit is clicked", () => {
    const { getByText } = render(React.createElement(RegisterPage));
    fireEvent.click(getByText("Submit"));
    expect(getByText("Mandatory field is missing")).toBeInTheDocument();
  });

  it("shows error message when email is missing and submit is clicked", () => {
    const { getByText } = render(React.createElement(RegisterPage));
    fireEvent.click(getByText("Submit"));
    expect(getByText("Mandatory fields missing.")).toBeInTheDocument();
  });

  it("shows error message when password is missing and submit is clicked", () => {
    const { getByText } = render(React.createElement(RegisterPage));
    fireEvent.click(getByText("Submit"));
    expect(getByText("Password is required")).toBeInTheDocument();
  });

  it("shows error message when confirm password is missing and submit is clicked", () => {
    const { getByText } = render(React.createElement(RegisterPage));
    fireEvent.click(getByText("Submit"));
    expect(getByText("Confirm Password is required")).toBeInTheDocument();
  });

  it("shows error message when password does not match confirm password", () => {
    const { getByLabelText, getByText } = render(
      React.createElement(RegisterPage)
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

  it("shows error message when email is invalid and submit is clicked", () => {
    const { getByLabelText, getByText } = render(
      React.createElement(RegisterPage)
    );
    const emailInput = getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    fireEvent.click(getByText("Submit"));
    expect(getByText("Invalid email address.")).toBeInTheDocument();
  });

  // Additional test cases can be added for other scenarios as needed
});
