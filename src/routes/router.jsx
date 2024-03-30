import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import { HyperMasterRoutes } from "./HyperMasterRoutes";
import { MasterRoutes } from "./MasterRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      /*Hyper Master Routes */
      ...HyperMasterRoutes,
      /* Master Routes */
      ...MasterRoutes,
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
