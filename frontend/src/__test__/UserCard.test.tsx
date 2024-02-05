import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import UserCard from "../components/UserCard/UserCard";
import { addNewUser, updateNewUser } from "../redux/user/slice";
import { Role } from "../redux/user/slice";

// Mock the redux store
const mockStore = configureStore([]);

describe("UserCard", () => {
  let store: any;
  let dispatchSpy: any;

  beforeEach(() => {
    jest.clearAllMocks();
    dispatchSpy = jest.fn();
    store = mockStore({
      user: {
        newUser: {
          name: "",
          email: "",
          role: Role.OBSERVER,
          isVerifiedUser: false,
        },
        socketId: "testSocketId",
      },
    });

    store.dispatch = dispatchSpy;
  });

  it("should render UserCard with the correct initial state", async () => {
    const { getByLabelText, getByText, getByRole } = render(
      <Provider store={store}>
        <UserCard open onClose={() => {}} />
      </Provider>
    );

    expect(getByLabelText("Name")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Role")).toBeInTheDocument();
    expect(getByText("Submit")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
  });
});
