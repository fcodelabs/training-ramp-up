import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoutes";
import HomePage from "../containers/HomePage/HomePage";
import UserPage from "../containers/UserPage/UserPage";
import LoginPage from "../containers/LoginPage/LoginPage";
import SelfRegitrationPage from "../containers/SelfRegistrationPage/SelfRegistrationPage";

const Routes = () => {
  // const { token } = useAuth();
  // const routesForAuthenticatedOnly = [
  //   {
  //     path: "/",
  //     element: <ProtectedRoute />,
  //     children: [
  //       {
  //         path: "/",
  //         element: <HomePage />,
  //       },
  //       {
  //         path: "users/",
  //         element: <UserPage />,
  //       },
  //     ],
  //   },
  // ];
  // const routesForNotAuthenticatedOnly = [
  //   {
  //     path: "login/",
  //     element: <LoginPage />,
  //   },
  //   {
  //     path: "register/",
  //     element: <SelfRegitrationPage />,
  //   },
  //   {
  //     path: "test/",
  //     element: <UserPage />,
  //   },
  // ];
  // const router = createBrowserRouter([
  //   ...(!token ? routesForNotAuthenticatedOnly : []),
  //   ...routesForAuthenticatedOnly,
  // ]);
  // return <RouterProvider router={router} />;
};

export default Routes;
