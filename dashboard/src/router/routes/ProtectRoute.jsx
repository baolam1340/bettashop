import React from "react";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const ProtectRoute = ({ route, children }) => {
  const { role, userInfo } = useSelector((state) => state.auth);
  if (role) {
    if (userInfo) {
      if (route.role) {
        if (
          userInfo.role === "nv_donhang" ||
          userInfo.role === "nv_nhapkho" ||
          userInfo.role === "nv_quanly" ||
          userInfo.role === "nv_sanpham" ||
          userInfo.role === "admin" ||
          userInfo.role === "shipper"
        ) {
          if (route.status) {
            if (route.status === userInfo.status) {
              return <Suspense fallback={null}>{children}</Suspense>;
            } else {
              if (userInfo.status === "pending") {
                return <Navigate to="/seller/account-pending" replace />;
              } else {
                return <Navigate to="/seller/account-deactive" replace />;
              }
            }
          } else {
            if (route.visibility) {
              if (route.visibility.some((r) => r === userInfo.status)) {
                return <Suspense fallback={null}>{children}</Suspense>;
              } else {
                return <Navigate to="/seller/account-pending" replace />;
              }
            } else {
              return <Suspense fallback={null}>{children}</Suspense>;
            }
          }
          //return <Suspense fallback={null}>{children}</Suspense>
        } else {
          return <Navigate to="/unauthorized" replace />;
        }
      } else {
        if (route.ability === "seller") {
          return <Suspense fallback={null}>{children}</Suspense>;
        }
      }
    }
  } else {
    return <Navigate to="/admin/login" replace />;
  }
};

export default ProtectRoute;
