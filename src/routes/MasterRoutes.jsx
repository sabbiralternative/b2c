import AddClient from "../pages/Master/Client/AddClient";
import ClientWithBalance from "../pages/Master/Client/ClientWithBalance";
import PNL from "../pages/Master/Client/PNL";
import ViewClient from "../pages/Master/Client/ViewClient";
import CompletedDeposit from "../pages/Master/Deposit/CompletedDeposit";
import PendingDeposit from "../pages/Master/Deposit/PendingDeposit";
import RejectedDeposit from "../pages/Master/Deposit/RejectedDeposit";
import AddBankAccount from "../pages/Master/Payments/AddBankAccount";
import AddNewPaymentGateway from "../pages/Master/Payments/AddNewPaymentGateway";
import AddQR from "../pages/Master/Payments/AddQR";
import AddUPI from "../pages/Master/Payments/AddUPI";
import ViewPaymentMethod from "../pages/Master/Payments/ViewPaymentMethod";
import DepositStatement from "../pages/Master/Statement/DepositStatement";
import WithdrawStatement from "../pages/Master/Statement/WithdrawStatement";
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
    path: "/clients-with-balance",
    element: <ClientWithBalance />,
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
  {
    path: "/view-payment-method",
    element: <ViewPaymentMethod />,
  },
  {
    path: "/add-bank-account",
    element: <AddBankAccount />,
  },
  {
    path: "/add-QR",
    element: <AddQR />,
  },
  {
    path: "/add-UPI",
    element: <AddUPI />,
  },
  {
    path: "/add-payment-gateway",
    element: <AddNewPaymentGateway />,
  },
  {
    path: "/pnl",
    element: <PNL />,
  },
  {
    path: "/deposit-statement",
    element: <DepositStatement />,
  },
  {
    path: "/withdraw-statement",
    element: <WithdrawStatement />,
  },
];
