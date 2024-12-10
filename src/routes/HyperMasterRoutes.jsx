import ViewBranches from "../pages/HyperMaster/Branch/ViewBranches";
import GameDetails from "../pages/HyperMaster/GameDetails/GameDetails";
import AddBanner from "../pages/HyperMaster/Settings/AddBanner";
import EditBanner from "../pages/HyperMaster/Settings/EditBanner";
import ViewBanner from "../pages/HyperMaster/Settings/ViewBanner";
import MarketAnalysis from "../pages/HyperMaster/Exposure/MarketAnalysis";
import CurrentBets from "../pages/HyperMaster/Exposure/CurrentBets";
import AddBonus from "../pages/HyperMaster/Bonus/AddBonus";
import ViewBonus from "../pages/HyperMaster/Bonus/ViewBonus";
import ViewChecker from "../pages/HyperMaster/Staff/ViewChecker";

export const HyperMasterRoutes = [
  {
    path: "/view-branches",
    element: <ViewBranches />,
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
    path: "/view-bonus",
    element: <ViewBonus />,
  },
  {
    path: "/view-checker",
    element: <ViewChecker />,
  },
];
