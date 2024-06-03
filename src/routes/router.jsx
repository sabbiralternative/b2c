import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import { HyperMasterRoutes } from "./HyperMasterRoutes";
import { MasterRoutes } from "./MasterRoutes";
import ClientReport from "../pages/Report/ClientReport";
import DepositReport from "../pages/Report/DepositReport";
import WithdrawReport from "../pages/Report/WithdrawReport";

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
        path: "/client-report",
        element: <ClientReport />,
      },
      {
        path: "/deposit-report",
        element: <DepositReport />,
      },
      {
        path: "/withdraw-report",
        element: <WithdrawReport />,
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
