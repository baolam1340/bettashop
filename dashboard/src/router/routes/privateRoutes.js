import { adminRoutes } from "./adminRoutes";
import { sellerRoutes } from "./sellerRoutes";
import { nv_adminRoutes } from "./nv_adminRoutes";
import { shipperRoutes } from "./shipperRoutes";

export const privateRoutes = [
  ...adminRoutes,
  ...sellerRoutes,
  ...nv_adminRoutes,
  ...shipperRoutes,
];
