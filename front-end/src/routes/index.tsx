import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoutes";
import HomePage from "../containers/HomePage/HomePage";
import UserPage from "../containers/UserPage/UserPage";
import LoginPage from "../containers/LoginPage/LoginPage";
import SelfRegitrationPage from "../containers/SelfRegistrationPage/SelfRegistrationPage";

const Routes = () => {
  const { token } = useAuth();

  //routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "users/",
          element: <UserPage />,
        },
      ],
    },
  ];

  //routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "login/",
      element: <LoginPage />,
    },
    {
      path: "register/",
      element: <SelfRegitrationPage />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
