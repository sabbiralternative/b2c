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
import TransferStatement from "../pages/Report/TransferStatement";
import FirstDepositReport from "../pages/Report/FirstDepositReport";
import NoDepositReport from "../pages/Report/NoDepositReport";
import { AdminMasterRoutes } from "./AdminMaster";
import ChangePasswordSuccess from "../pages/ChangePasswordSuccess/ChangePasswordSuccess";
import ChangePasswordAfterLogin from "../pages/ChangePassword/ChangePasswordAfterLogin";
import ClientBranchChangeReport from "../pages/Report/ClientBranchChangeReport";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
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
          path: "/first-deposit-report",
          element: <FirstDepositReport />,
        },
        {
          path: "/no-deposit-report",
          element: <NoDepositReport />,
        },
        {
          path: "/withdraw-report",
          element: <WithdrawReport />,
        },
        {
          path: "/transfer-statement",
          element: <TransferStatement />,
        },
        {
          path: "/client-branch-change-report",
          element: <ClientBranchChangeReport />,
        },
        {
          path: "/change-password-after-login",
          element: <ChangePasswordAfterLogin />,
        },
        /*Hyper Master Routes */
        ...HyperMasterRoutes,
        /* Master Routes */
        ...MasterRoutes,
        ...AdminMasterRoutes,
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/change-password",
      element: <ChangePassword />,
    },
    {
      path: "/change-password-success",
      element: <ChangePasswordSuccess />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL ?? "/",
  }
);
