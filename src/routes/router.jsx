import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import ViewBanner from "../pages/Settings/ViewBanner/ViewBanner";
import ViewBranches from "../pages/Branch/ViewBranches";


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
      {
        path: "/view-branches",
        element: <ViewBranches />,
      },
      {
        path: "/view-banner",
        element: <ViewBanner />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
