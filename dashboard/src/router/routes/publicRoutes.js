import { lazy } from "react";
import NhanvienAdminLogin from "../../views/auth/NhanvienAdminLogin";
import ShipperLogin from "../../views/auth/ShipperLogin";
import RegisterShipper from "../../views/auth/RegisterShipper";
// const Success = lazy(() => import("../../views/Success"));
const Login = lazy(() => import("../../views/auth/Login"));
const Register = lazy(() => import("../../views/auth/Register"));
const AdminLogin = lazy(() => import("../../views/auth/AdminLogin"));
const Home = lazy(() => import("../../views/Home"));
const UnAuthorized = lazy(() => import("../../views/UnAuthorized"));
const Success = lazy(() => import("../../views/Success"));
const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/shipper/login",
    element: <ShipperLogin />,
  },
  {
    path: "/shipper/register",
    element: <RegisterShipper />,
  },
  {
    path: "/nhanvien-admin/login",
    element: <NhanvienAdminLogin />,
  },
  {
    path: "/unauthorized",
    element: <UnAuthorized />,
  },
  {
    path: "/success?",
    element: <Success />,
  },
];
export default publicRoutes;
