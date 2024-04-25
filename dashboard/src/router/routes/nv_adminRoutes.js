/* eslint-disable no-unused-vars */
import { lazy } from "react";
import RegisterNvAdmin from "../../views/admin/RegisterNvAdmin";
import DsNhanvien from "../../views/admin/DsNhanvien";
const SellerDetails = lazy(() => import("../../views/admin/SellerDetail"));
const DeactiveSellers = lazy(() => import("../../views/admin/DeactiveSellers"));
const SellerRequest = lazy(() => import("../../views/admin/SellerRequest"));
const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));
const Orders = lazy(() => import("../../views/admin/Orders"));
const Category = lazy(() => import("../../views/admin/Category"));
const Sellers = lazy(() => import("../../views/admin/Sellers"));
const PaymentRequest = lazy(() => import("../../views/admin/PaymentRequest"));
const ChatSeller = lazy(() => import("../../views/admin/ChatSeller"));
const OrderDetails = lazy(() => import("../../views/admin/OrderDetails"));
export const nv_adminRoutes = [
    {
        path: "nhanvien-admin/dashboard",
        element: <AdminDashboard />,
        role: "nhanvien_admin",
      },
      {
        path: "nhanvien-admin/dashboard/orders",
        element: <Orders />,
        role: "nhanvien_admin",
      },
      {
        path: "nhanvien-admin/dashboard/category",
        element: <Category />,
        role: "nhanvien_admin",
      },
      {
        path: "nhanvien-admin/dashboard/sellers",
        element: <Sellers />,
        role: "nhanvien_admin",
      },
      {
        path: "nhanvien-admin/dashboard/payment-request",
        element: <PaymentRequest />,
        role: "nhanvien_admin",
      },
      {
        path: "nhanvien-admin/dashboard/deactive-sellers",
        element: <DeactiveSellers />,
        role: "nhanvien_admin",
      },
      {
        path: "nhanvien-admin/dashboard/sellers-request",
        element: <SellerRequest />,
        role: "nhanvien_admin",
      },
      {
        path: "nhanvien-admin/dashboard/seller/details/:sellerId",
        element: <SellerDetails />,
        role: "nhanvien_admin",
      },
      {
        path: "nhanvien-admin/dashboard/chat-sellers",
        element: <ChatSeller />,
        role: "nhanvien_admin",
      },
      {
        path: "nhanvien-admin/dashboard/chat-sellers/:sellerId",
        element: <ChatSeller />,
        role: "nhanvien_admin",
      },
      {
        path: "nhanvien-admin/dashboard/order/details/:orderId",
        element: <OrderDetails />,
        role: "nhanvien_admin",
      },
      {
        path: "nhanvien-admin/dashboard/sellers",
        element: <Sellers />,
        role: "nhanvien_admin",
      },
      {
        path: "nhanvien-admin/dashboard/deactive-sellers",
        element: <DeactiveSellers />,
        role: "nhanvien-admin",
      },
 
];
