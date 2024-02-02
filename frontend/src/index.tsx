import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import LoginPage from "./containers/LoginPage/LoginPage";
import HomePage from "./containers/HomePage/HomePage";
import PasswordCreationPage from "./containers/PasswordCreationPage/PasswordCreationPage";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/passwordcreate",
    element: <PasswordCreationPage />,
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
