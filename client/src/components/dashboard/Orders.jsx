/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Orders = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [state, setState] = useState("");

  return (
    <div className="bg-secondary flex p-4 rounded-md w-full ">
      <div className="flex justify-between items-center w-full">
        <div className="md-lg:w-full w-full">
          <div className="flex justify-between md-lg:justify-center items-center flex-wrap sm:w-auto">
            <ul className="flex md:flex-col gap-20 text-sm font-bold uppercase w-full">
              <li className="flex justify-start items-center gap-2 py-2 w-auto sm:justify-center col-md-3">
                <Link
                  to="/dashboard/tatca"
                  className={` flex justify-center items-center text-decoration-none  p-2 ${
                    pathname === "/dashboard/tatca"
                      ? "text-white h2 "
                      : "text-white"
                  }`}
                >
                  <b> tất cả</b>
                </Link>
              </li>
              <li className="flex justify-start items-center gap-2 py-2 w-auto sm:justify-center col-md-3">
                <Link
                  to="/dashboard/choxuly"
                  className={`p-2 text-decoration-none flex justify-start items-center ${
                    pathname === "/dashboard/choxuly"
                      ? "text-white h2 "
                      : "text-white"
                  }`}
                >
                  <b> chờ xử lý</b>
                </Link>
              </li>
              <li className="flex justify-start items-center gap-2 py-2 w-auto sm:justify-center col-md-3">
                <Link
                  to="/dashboard/vanchuyen"
                  className={`p-2 text-decoration-none flex justify-start items-center ${
                    pathname === "/dashboard/vanchuyen"
                      ? "text-white h2 "
                      : "text-white"
                  }`}
                >
                  <b> vận chuyển</b>
                </Link>
              </li>
              <li className="flex justify-start items-center gap-2 py-2 w-auto sm:justify-center col-md-3">
                <Link
                  to="/dashboard/danggiao"
                  className={`p-2 text-decoration-none flex justify-start items-center ${
                    pathname === "/dashboard/danggiao"
                      ? "text-white h2 "
                      : "text-white"
                  }`}
                >
                  <b> đang giao</b>
                </Link>
              </li>
              <li className="flex justify-start items-center gap-2 py-2 w-auto sm:justify-center col-md-3">
                <Link
                  to="/dashboard/hoanthanh"
                  className={`p-2 text-decoration-none flex justify-start items-center ${
                    pathname === "/dashboard/hoanthanh"
                      ? "text-white h3 "
                      : "text-white"
                  }`}
                >
                  <b> hoàn thành</b>
                </Link>
              </li>
              <li className="flex justify-start items-center gap-2 py-2 w-auto sm:justify-center col-md-3">
                <Link
                  to="/dashboard/dahuy"
                  className={`p-2 text-decoration-none flex justify-start items-center ${
                    pathname === "/dashboard/dahuy"
                      ? "text-white h2 "
                      : "text-white"
                  }`}
                >
                  <b> đã hủy</b>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
