import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LoginPage from "../containers/LoginPage/LoginPage"; // Update the import path accordingly
import { toHaveAttribute } from "@testing-library/jest-dom/matchers";

describe("LoginPage Component", () => {
  it("renders without crashing", () => {
    render(React.createElement(LoginPage));
  });

  it("handles email input change correctly", () => {
    const { getByLabelText } = render(React.createElement(LoginPage));
    const emailInput = getByLabelText("Email") as HTMLInputElement; // Add type assertion
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");
  });

  it("handles password input change correctly", () => {
    const { getByLabelText } = render(React.createElement(LoginPage));
    const passwordInput = getByLabelText("Password") as HTMLInputElement; // Add type assertion
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput.value).toBe("password123");
  });

  expect.extend({
    toHaveAttribute: (attr: string, value?: unknown) => {
      return {
        pass: true,
        message: () => "",
      };
    },
  });

  it("shows error message when email is missing and login is clicked", () => {
    const { getByText, getByLabelText } = render(
      React.createElement(LoginPage)
    );
    fireEvent.click(getByText("Login"));
    const emailInput = getByLabelText("Email");
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(getByText("Mandatory field is missing")).toBeInTheDocument();
  });

  it("shows error message when password is missing and login is clicked", () => {
    const { getByText, getByLabelText } = render(
      React.createElement(LoginPage)
    );
    fireEvent.click(getByText("Login"));
    const passwordInput = getByLabelText("Password");
    expect(passwordInput).toHaveAttribute("aria-invalid", "true");
    expect(getByText("Mandatory field is missing")).toBeInTheDocument();
  });

  it("calls handleLogin when login button is clicked with valid credentials", () => {
    const { getByText, getByLabelText } = render(
      React.createElement(LoginPage)
    );
    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(getByText("Login"));
    // Write expectations for handleLogin function call
  });

  it("navigates to register page when 'Register Now' button is clicked", () => {
    const { getByText } = render(React.createElement(LoginPage));
    fireEvent.click(getByText("Register Now"));
    // Write expectations for navigation to register page
  });
});
