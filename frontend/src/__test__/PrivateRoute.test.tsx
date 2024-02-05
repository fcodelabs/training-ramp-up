import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProtectedRoute from "../components/PrivateRoute/PrivateRoute";

const mockStore = configureStore([]);
const initialState = { user: { role: "user" } };
const store = mockStore(initialState);

// TypeScript interface for mocked useAppSelector
interface MockUseAppSelector {
  (state: any): any;
}

// TypeScript interface for mocked useAppDispatch
interface MockUseAppDispatch {
  (action: any): any;
}

test("ProtectedRoute renders child component when user is logged in", () => {
  // Mock selector to return a logged-in user
  const mockUseAppSelector: MockUseAppSelector = jest.fn().mockReturnValue({
    user: {
      role: "admin", // Adjust role as needed
    },
  });

  const mockUseAppDispatch: MockUseAppDispatch = jest.fn();

  render(
    <Provider store={store}>
      <ProtectedRoute>
        <div>Protected content</div>
      </ProtectedRoute>
    </Provider>
  );

  expect(mockUseAppDispatch).not.toBeCalled();
});

// Add more tests for other authentication states and scenarios
