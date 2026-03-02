import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import ClientReport from "../pages/Report/ClientReport";
import DepositReport from "../pages/Report/DepositReport";
import WithdrawReport from "../pages/Report/WithdrawReport";
import TransferStatement from "../pages/Report/TransferStatement";
import FirstDepositReport from "../pages/Report/FirstDepositReport";
import NoDepositReport from "../pages/Report/NoDepositReport";
import ChangePasswordSuccess from "../pages/ChangePasswordSuccess/ChangePasswordSuccess";
import ChangePasswordAfterLogin from "../pages/ChangePassword/ChangePasswordAfterLogin";
import ClientBranchChangeReport from "../pages/Report/ClientBranchChangeReport";
import SecondDepositReport from "../pages/Report/SecondDepositReport";
import ThirdDepositReport from "../pages/Report/ThirdDepositReport";
import FourthDepositReport from "../pages/Report/FourthDepositReport";
import FifthDepositReport from "../pages/Report/FifthDepositReport";
import NoDepositReportLast15Days from "../pages/Report/NoDepositReportLast15Days";
import AddNotification from "../pages/Settings/AddNotification";
import ViewNotification from "../pages/Settings/ViewNotification";
import PendingComplaints from "../pages/Complaints/PendingComplaints";
import ResolvedComplaints from "../pages/Complaints/ResolvedComplaints";
import DirectDepositReport from "../pages/Report/DirectDepositReport";
import DirectWithdrawReport from "../pages/Report/DirectWithdrawReport";
import LastDepositReport from "../pages/Report/LastDepositReport";
import ViewBranches from "../pages/Branch/ViewBranches";
import ViewBanner from "../pages/Settings/ViewBanner";
import AddBanner from "../pages/Settings/AddBanner";
import AddLoginBanner from "../pages/Settings/AddLoginBanner";
import EditBanner from "../pages/Settings/EditBanner";
import MarketAnalysis from "../pages/Exposure/MarketAnalysis";
import CurrentBets from "../pages/Exposure/CurrentBets";
import GameDetails from "../pages/GameDetails/GameDetails";
import AddBonus from "../pages/Bonus/AddBonus";
import ViewBonus from "../pages/Bonus/ViewBonus";
import ViewStaff from "../pages/Staff/ViewStaff";
import ViewSuperBranches from "../pages/ViewSuperBranch/ViewSuperBranch";
import ActivityLogs from "../pages/ActivityLogs/ActivityLogs";
import WithdrawStatement from "../pages/Statement/WithdrawStatement";
import DepositStatement from "../pages/Statement/DepositStatement";
import PNL from "../pages/Client/PNL";
import AddNewPaymentGateway from "../pages/Payments/AddNewPaymentGateway";
import AddWhatsappDeposit from "../pages/Payments/AddWhatsappDeposit";
import AddUPI from "../pages/Payments/AddUPI";
import AddPaymentGateway3 from "../pages/Payments/AddPaymentGateway3";
import AddPaymentGateway2 from "../pages/Payments/AddPaymentGateway2";
import AddI100PaymentGateway from "../pages/Payments/AddI100PaymentGateway";
import AddTOITPaymentGateway from "../pages/Payments/AddTOITPaymentGateway";
import AddUPIPaymentGateway from "../pages/Payments/AddUPIPaymentGateway";
import AddUSDTBEP20 from "../pages/Payments/AddUSDTBEP20";
import AddUSDT from "../pages/Payments/AddUSDT";
import AddQR from "../pages/Payments/AddQR";
import AddBankAccount from "../pages/Payments/AddBankAccount";
import ViewPaymentLogs from "../pages/Payments/ViewPaymentLogs";
import ViewPaymentMethod from "../pages/Payments/ViewPaymentMethod";
import CompletedBonus from "../pages/Bonus/CompletedBonus";
import RejectedBonus from "../pages/Bonus/RejectedBonus";
import PendingBonus from "../pages/Bonus/PendingBonus";
import CompletedWithdraw from "../pages/Withdraw/CompletedWithdraw";
import RejectedWithdraw from "../pages/Withdraw/RejectedWithdraw";
import PendingWithdraw from "../pages/Withdraw/PendingWithdraw";
import UTRSearch from "../pages/Deposit/UTRSearch";
import RejectedDeposit from "../pages/Deposit/RejectedDeposit";
import CompletedDeposit from "../pages/Deposit/CompletedDeposit";
import PendingDeposit from "../pages/Deposit/PendingDeposit";
import ChangeBranchReport from "../pages/Client/ChangeBranchReport";
import SuspendedClient from "../pages/Client/SuspendedClient";
import InActiveClient from "../pages/Client/InActiveClient";
import ActiveClient from "../pages/Client/ActiveClient";
import AllClient from "../pages/Client/AllClient";
import ClientWithBalance from "../pages/Client/ClientWithBalance";
import AddClient from "../pages/Client/AddClient";
import ViewClient from "../pages/Client/ViewClient";
import ViewWhiteLabel from "../pages/WhiteLabel/ViewWhiteLabel";
import ViewAffiliate from "../pages/Affiliate/ViewAffiliate";
import ViewAffiliateClient from "../pages/Affiliate/ViewAffiliateClient";
import ViewAffiliateDeposit from "../pages/Affiliate/ViewAffiliateDeposit";
import ViewAffiliateWithdraw from "../pages/Affiliate/ViewAffiliateWithdraw";
import AddLossBackBonusByEvent from "../pages/Bonus/AddLossBackBonusByEvent";
import AddLossBackBonusByDate from "../pages/Bonus/AddLossBackBonusByDate";
import ViewLossBackBonus from "../pages/Bonus/ViewLossBackBonus";
import LossBackBonusReport from "../pages/Bonus/LossBackBonusReport";
import AddWhiteLabel from "../pages/WhiteLabel/AddWhiteLabel";
import NonTrustedClients from "../pages/Client/NonTrustedClients";
import TrustedClients from "../pages/Client/TrustedClients";
import VIPClients from "../pages/Client/VIPClients";
import VVIPClients from "../pages/Client/VVIPClients";
import UpdateWhiteLabel from "../pages/WhiteLabel/UpdateWhiteLabel";
import PremiumClients from "../pages/Client/PremiunClients";

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
          path: "/direct-deposit-report",
          element: <DirectDepositReport />,
        },
        {
          path: "/1st-deposit-report",
          element: <FirstDepositReport />,
        },
        {
          path: "/last-deposit-report",
          element: <LastDepositReport />,
        },
        {
          path: "/2nd-deposit-report",
          element: <SecondDepositReport />,
        },
        {
          path: "/3rd-deposit-report",
          element: <ThirdDepositReport />,
        },
        {
          path: "/4th-deposit-report",
          element: <FourthDepositReport />,
        },
        {
          path: "/5th-deposit-report",
          element: <FifthDepositReport />,
        },
        {
          path: "/no-deposit-report",
          element: <NoDepositReport />,
        },
        {
          path: "/no-deposit-report-last-15-days",
          element: <NoDepositReportLast15Days />,
        },
        {
          path: "/withdraw-report",
          element: <WithdrawReport />,
        },
        {
          path: "/direct-withdraw-report",
          element: <DirectWithdrawReport />,
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
        {
          path: "/add-notification",
          element: <AddNotification />,
        },
        {
          path: "/view-notification",
          element: <ViewNotification />,
        },
        {
          path: "/pending-complaints",
          element: <PendingComplaints />,
        },
        {
          path: "/resolved-complaints",
          element: <ResolvedComplaints />,
        },
        {
          path: "/view-branch",
          element: <ViewBranches />,
        },
        {
          path: "/view-super-branch",
          element: <ViewSuperBranches />,
        },
        {
          path: "/view-banner",
          element: <ViewBanner />,
        },
        {
          path: "/add-banner",
          element: <AddBanner />,
        },
        {
          path: "/add-login-banner",
          element: <AddLoginBanner />,
        },
        {
          path: "/edit-banner",
          element: <EditBanner />,
        },
        {
          path: "/market-analysis",
          element: <MarketAnalysis />,
        },
        {
          path: "/current-bets",
          element: <CurrentBets />,
        },
        {
          path: "/game-details/:eventTypeId/:eventId",
          element: <GameDetails />,
        },
        {
          path: "/add-bonus",
          element: <AddBonus />,
        },
        {
          path: "/add-loss-back-bonus-by-event",
          element: <AddLossBackBonusByEvent />,
        },
        {
          path: "/add-loss-back-bonus-by-date",
          element: <AddLossBackBonusByDate />,
        },
        {
          path: "/view-lossback-bonus",
          element: <ViewLossBackBonus />,
        },
        {
          path: "/view-bonus",
          element: <ViewBonus />,
        },
        {
          path: "/view-staff",
          element: <ViewStaff />,
        },
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
          path: "/all-client",
          element: <AllClient />,
        },
        {
          path: "/active-client",
          element: <ActiveClient />,
        },
        {
          path: "/inactive-client",
          element: <InActiveClient />,
        },
        {
          path: "/suspended-client",
          element: <SuspendedClient />,
        },
        {
          path: "/non-trusted-clients",
          element: <NonTrustedClients />,
        },
        {
          path: "/trusted-clients",
          element: <TrustedClients />,
        },
        {
          path: "/vip-clients",
          element: <VIPClients />,
        },
        {
          path: "/vvip-clients",
          element: <VVIPClients />,
        },
        {
          path: "/premium-clients",
          element: <PremiumClients />,
        },
        {
          path: "/change-branch-report/:userId",
          element: <ChangeBranchReport />,
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
          path: "/utr-search",
          element: <UTRSearch />,
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
          path: "/pending-bonus",
          element: <PendingBonus />,
        },
        {
          path: "/rejected-bonus",
          element: <RejectedBonus />,
        },
        {
          path: "/completed-bonus",
          element: <CompletedBonus />,
        },
        {
          path: "/view-payment-method",
          element: <ViewPaymentMethod />,
        },
        {
          path: "/view-payment-logs/:paymentId",
          element: <ViewPaymentLogs />,
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
          path: "/add-USDT-TRC20",
          element: <AddUSDT />,
        },
        {
          path: "/add-USDT-BEP20",
          element: <AddUSDTBEP20 />,
        },
        {
          path: "/add-upi-payment-gateway",
          element: <AddUPIPaymentGateway />,
        },
        {
          path: "/add-toit-payment-gateway",
          element: <AddTOITPaymentGateway />,
        },
        {
          path: "/add-i100-payment-gateway",
          element: <AddI100PaymentGateway />,
        },
        {
          path: "/add-payment-gateway-2",
          element: <AddPaymentGateway2 />,
        },
        {
          path: "/add-payment-gateway-3",
          element: <AddPaymentGateway3 />,
        },

        {
          path: "/add-UPI",
          element: <AddUPI />,
        },
        {
          path: "/add-whatsapp-deposit",
          element: <AddWhatsappDeposit />,
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
        {
          path: "/view-staff",
          element: <ViewStaff />,
        },
        {
          path: "/activity-logs",
          element: <ActivityLogs />,
        },
        {
          path: "/view-whitelable",
          element: <ViewWhiteLabel />,
        },
        {
          path: "/add-whitelable",
          element: <AddWhiteLabel />,
        },
        {
          path: "/update-whitelabel",
          element: <UpdateWhiteLabel />,
        },
        {
          path: "/view-affiliate",
          element: <ViewAffiliate />,
        },
        {
          path: "/view-affiliate-client",
          element: <ViewAffiliateClient />,
        },
        {
          path: "/view-affiliate-deposit",
          element: <ViewAffiliateDeposit />,
        },
        {
          path: "/view-affiliate-withdraw",
          element: <ViewAffiliateWithdraw />,
        },
        {
          path: "/lossback-bonus-report",
          element: <LossBackBonusReport />,
        },
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
  },
);
