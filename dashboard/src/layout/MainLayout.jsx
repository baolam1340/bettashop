/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { socket } from "../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCustomer,
  updateSellers,
  activeStatus_update,
} from "../store/Reducers/chatReducer";

function MainLayout() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (
      userInfo.role === "nv_donhang" ||
      userInfo.role === "nv_nhapkho" ||
      userInfo.role === "nv_sanpham" ||
      userInfo.role === "nv_quanly"
    ) {
      socket.emit("add_seller_admin", userInfo._id, userInfo);
    } else if (userInfo.role === "admin") {
      socket.emit("add_admin", userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    socket.on("activeCustomer", (customers) => {
      dispatch(updateCustomer(customers));
    });
    socket.on("activeSeller", (sellers) => {
      dispatch(updateSellers(sellers));
    });
    socket.on("activeAdmin", (data) => {
      dispatch(activeStatus_update(data));
    });
  }, []);

  return (
    <div className="bg-secondary w-full min-h-screen">
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="ml-0 lg:ml-[300px] pt-[95px] transition-all">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
