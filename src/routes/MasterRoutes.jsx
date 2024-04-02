import AddClient from "../pages/Master/Client/AddClient";
import ViewClient from "../pages/Master/Client/ViewClient";
import CompletedDeposit from "../pages/Master/Deposit/CompletedDeposit";
import PendingDeposit from "../pages/Master/Deposit/PendingDeposit";
import RejectedDeposit from "../pages/Master/Deposit/RejectedDeposit";
import CompletedWithdraw from "../pages/Master/Withdraw/CompletedWithdraw";
import PendingWithdraw from "../pages/Master/Withdraw/PendingWithdraw";
import RejectedWithdraw from "../pages/Master/Withdraw/RejectedWithdraw";

export const MasterRoutes = [
  {
    path: "/view-client",
    element: <ViewClient />,
  },
  {
    path: "/add-client",
    element: <AddClient />,
  },
  {
    path: "/pending-deposit",
    element: <PendingDeposit />,
  },
  {
    path: "/completed-deposit",
    element: <CompletedDeposit />,
  },
  {
    path: "/rejected-deposit",
    element: <RejectedDeposit />,
  },
  {
    path: "/pending-withdraw",
    element: <PendingWithdraw />,
  },
  {
    path: "/rejected-withdraw",
    element: <RejectedWithdraw />,
  },
  {
    path: "/completed-withdraw",
    element: <CompletedWithdraw />,
  },
];
