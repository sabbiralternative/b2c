import AddClient from "../pages/Master/Client/AddClient";
import ViewClient from "../pages/Master/Client/ViewClient";

export const MasterRoutes = [
  {
    path: "/view-client",
    element: <ViewClient />,
  },
  {
    path: "/add-client",
    element: <AddClient />,
  },
];
