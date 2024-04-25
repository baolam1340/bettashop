import { lazy } from "react";
import ShipperDetails from "../../views/shipper/ShipperDetails";
const ShipperDashboard = lazy(() => import("../../views/shipper/ShipperDashboard"));


export const shipperRoutes = [
  {
    path: "shipper/dashboard",
    element: <ShipperDashboard />,
    role: "shipper",
  },
  {
    path: "shipper/dashboard/details/:orderId",
    element: <ShipperDetails />,
    role: "shipper",
  }
 
];
