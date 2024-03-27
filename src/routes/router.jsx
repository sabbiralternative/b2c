import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import ViewBranches from "../pages/Branch/ViewBranches/ViewBranches";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import AddBranch from "../pages/Branch/AddBranch/AddBranch";
import Deposit from "../pages/Deposit/Deposit";
import Withdraw from "../pages/Withdraw/Withdraw";

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
        path: "/add-branch",
        element: <AddBranch />,
      },
      {
        path: "/deposit",
        element: <Deposit />,
      },
      {
        path: "/withdraw",
        element: <Withdraw />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
