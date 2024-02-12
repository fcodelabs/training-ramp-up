import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MessageCard from "../components/Cards/MessageCard";

// Mock button click functions
const primaryButtonClickMock = jest.fn();
const secondaryButtonClickMock = jest.fn();

// Test data
const messageCardProps = {
  message: "Test Message",
  primaryButton: {
    text: "Primary",
    onClick: primaryButtonClickMock,
  },
  // Secondary button is optional, so we'll omit it in some tests
  primaryOption: "Primary Option",
};

describe("MessageCard Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders message correctly", () => {
    const { getByText } = render(
      React.createElement(MessageCard, messageCardProps)
    );
    expect(getByText("Test Message")).toBeInTheDocument();
  });

  it("calls primary button onClick handler when clicked", () => {
    const { getByText } = render(
      React.createElement(MessageCard, messageCardProps)
    );
    fireEvent.click(getByText("Primary"));
    expect(primaryButtonClickMock).toHaveBeenCalledTimes(1);
  });

  it("does not render secondary button if not provided", () => {
    const { queryByText } = render(
      React.createElement(MessageCard, messageCardProps)
    );
    expect(queryByText("Secondary")).toBeNull();
  });

  it("renders secondary button if provided", () => {
    const propsWithSecondaryButton = {
      ...messageCardProps,
      secondaryButton: {
        text: "Secondary",
        onClick: secondaryButtonClickMock,
      },
      secondaryOption: "Secondary Option",
    };
    const { getByText } = render(
      React.createElement(MessageCard, propsWithSecondaryButton)
    );
    expect(getByText("Secondary")).toBeInTheDocument();
  });

  it("calls secondary button onClick handler when clicked", () => {
    const propsWithSecondaryButton = {
      ...messageCardProps,
      secondaryButton: {
        text: "Secondary",
        onClick: secondaryButtonClickMock,
      },
      secondaryOption: "Secondary Option",
    };
    const { getByText } = render(
      React.createElement(MessageCard, propsWithSecondaryButton)
    );
    fireEvent.click(getByText("Secondary"));
    expect(secondaryButtonClickMock).toHaveBeenCalledTimes(1);
  });
});
