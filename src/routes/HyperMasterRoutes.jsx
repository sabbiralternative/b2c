import ViewBranches from "../pages/HyperMaster/Branch/ViewBranches";
import ViewBanner from "../pages/HyperMaster/Settings/ViewBanner";

export const HyperMasterRoutes = [
  {
    path: "/view-branches",
    element: <ViewBranches />,
  },
  {
    path: "/view-banner",
    element: <ViewBanner />,
  },
];
