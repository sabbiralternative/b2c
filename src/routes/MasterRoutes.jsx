import AddClient from "../pages/Master/Client/AddClient";
import ViewClient from "../pages/Master/Client/ViewClient";
import CompletedDeposit from "../pages/Master/Deposit/CompletedDeposit";
import PendingDeposit from "../pages/Master/Deposit/PendingDeposit";
import RejectedDeposit from "../pages/Master/Deposit/RejectedDeposit";

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
];
