import ViewBranches from "../pages/HyperMaster/Branch/ViewBranches";
import AddBanner from "../pages/HyperMaster/Settings/AddBanner";
import EditBanner from "../pages/HyperMaster/Settings/EditBanner";
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
  {
    path: "/add-banner",
    element: <AddBanner />,
  },
  {
    path: "/edit-banner",
    element: <EditBanner />,
  },
];
