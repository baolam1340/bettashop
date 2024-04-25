import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";

const Home = () => {
  const { role } = useSelector((state) => state.auth);
  if (role === "seller") return <Navigate to="seller/dashboard"></Navigate>;
  else if (role === "admin") return <Navigate to="admin/dashboard"></Navigate>;
  else if (role === "nhanvien_admin")
    return <Navigate to="nhanvien-admin/dashboard"></Navigate>;
  else if (role === "shipper")
    return <Navigate to="shipper/dashboard"></Navigate>;
  else return <Navigate to="/admin/login" replace />;
};

export default Home;
