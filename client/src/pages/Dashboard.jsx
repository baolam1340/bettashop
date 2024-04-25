/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import { FaList } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { RiProductHuntLine } from "react-icons/ri";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import { TfiLock } from "react-icons/tfi";
import { BiLogInCircle } from "react-icons/bi";
import { RiCoupon2Line } from "react-icons/ri";
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { user_reset } from "../store/reducers/authReducer";
import { reset_count } from "../store/reducers/cardReducer";
import { ImProfile } from "react-icons/im";
import toast from "react-hot-toast";
import { FaRankingStar } from "react-icons/fa6";

const Dashboard = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterShow, setFilterShow] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const logout = async () => {
    try {
      const { data } = await api.get("/customer/logout");
      localStorage.removeItem("customerToken");
      dispatch(user_reset());
      dispatch(reset_count());
      toast.success("Đăng Xuất thành công!!");
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="container">
      <Headers /> {/*  Cum here  */}
      <div className=" text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
        <h2>Tài Khoản Của Tôi</h2>
        <div className="w-[100px] h-[4px] bg-success mt-4"></div>
      </div>
      <div className="bg-light rounded border row">
        <div className="w-[90%] mx-auto pt-5  md-lg:block hidden">
          <div className="">
            <button
              onClick={() => setFilterShow(!filterShow)}
              className="text-center py-3 px-3 bg-white  "
            >
              <FaList />
            </button>
          </div>
        </div>
        <div className="h-full mx-auto z-20 ">
          <div className="py-5 flex md-lg:w-[90%] mx-auto relative ">
            <div
              className={`rounded-md z-50 md-lg:absolute ${
                filterShow ? "-left-4" : "-left-[360px]"
              } w-[270px] ml-4 bg-secondary`}
            >
              <ul className="py-2 text-white px-4 ">
                {/**  Trang chủ*/}
                <li
                  className={`flex justify-start items-center gap-2 py-2 ${
                    pathname === "/dashboard" ? "text-white" : ""
                  }`}
                >
                  <span className="text-xl ">
                    <RxDashboard />
                  </span>
                  <Link
                    to="/dashboard"
                    className={`block text-white text-decoration-none text-white${
                      pathname === "/dashboard"
                        ? "border-b-2 text-decoration-none h4 border-green-500"
                        : ""
                    }`}
                  >
                    Trang Chủ
                  </Link>
                </li>
                <li
                  className={`flex justify-start items-center gap-2 py-2 ${
                    pathname === "/dashboard/address" ? "text-white" : ""
                  }`}
                >
                  <span className="text-xl">
                    <FaAddressBook />
                  </span>
                  {/**dia chi */}
                  <Link
                    to="/dashboard/address"
                    className={`block text-white text-decoration-none ${
                      pathname === "/dashboard/address"
                        ? "  text-decoration-none h4 "
                        : ""
                    }`}
                  >
                    Địa Chỉ
                  </Link>
                </li>

                <li
                  className={`flex justify-start items-center gap-2 py-2 ${
                    pathname === "/dashboard/tatca" ||
                    pathname === "/dashboard/choxuly" ||
                    pathname === "/dashboard/vanchuyen" ||
                    pathname === "/dashboard/danggiao" ||
                    pathname === "/dashboard/hoanthanh" ||
                    pathname === "/dashboard/dahuy" ||
                    pathname === "/dashboard/trahang"
                      ? "text-white"
                      : ""
                  }`}
                >
                  <span className="text-xl">
                    <RiProductHuntLine />
                  </span>
                  <Link
                    to="/dashboard/tatca"
                    className={`block text-white text-decoration-none${
                      pathname === "/dashboard/tatca" ||
                      pathname === "/dashboard/choxuly" ||
                      pathname === "/dashboard/vanchuyen" ||
                      pathname === "/dashboard/danggiao" ||
                      pathname === "/dashboard/hoanthanh" ||
                      pathname === "/dashboard/dahuy" ||
                      pathname === "/dashboard/trahang"
                        ? "border-b-2 border-green-500 text-decoration-none h5"
                        : ""
                    }`}
                  >
                    Đơn Hàng của tôi
                  </Link>
                </li>
                <li
                  className={`flex justify-start items-center gap-2 py-2 ${
                    pathname === "/dashboard/my-wishlist" ? "text-white" : ""
                  }`}
                >
                  {/** Yêu Thích*/}
                  <span className="text-xl">
                    <BsHeart />
                  </span>
                  {/** yeu thich*/}
                  <Link
                    to="/dashboard/my-wishlist"
                    className={`block text-white text-decoration-none${
                      pathname === "/dashboard/my-wishlist"
                        ? "border-b-2 border-green-500 text-decoration-none h4"
                        : ""
                    }`}
                  >
                    Yêu Thích
                  </Link>
                </li>
                {/* <li
                  className={`flex justify-start items-center gap-2 py-2 ${
                    pathname === "/dashboard/chat" ? "text-white" : ""
                  }`}
                >
                  <span className="text-xl">
                    <BsChat />
                  </span>
                  <Link
                    to="/dashboard/chat"
                    className={`block text-white ${
                      pathname === "/dashboard/chat"
                        ? "border-b-2 border-green-500 text-decoration-none h4"
                        : ""
                    }`}
                  >
                    Chat
                  </Link>
                </li> */}
                <li
                  className={`flex justify-start items-center gap-2 py-2 ${
                    pathname === "/dashboard/profile" ? "text-white" : ""
                  }`}
                >
                  {" "}
                  {/** Thông tin*/}
                  <span className="text-xl">
                    <ImProfile />
                  </span>
                  <Link
                    to="/dashboard/profile"
                    className={`block text-white text-decoration-none${
                      pathname === "/dashboard/profile"
                        ? "border-b-2 border-green-500 text-decoration-none h4"
                        : ""
                    }`}
                  >
                    Thông tin
                  </Link>
                </li>
                {userInfo.email_verified ? (
                  ""
                ) : (
                  <li
                    className={`flex justify-start items-center gap-2 py-2 ${
                      pathname === "/dashboard/change-password"
                        ? "text-white"
                        : ""
                    }`}
                  >
                    {" "}
                    {/** Thay đổi mật khẩu*/}
                    <span className="text-xl">
                      <TfiLock />
                    </span>
                    <Link
                      to="/dashboard/change-password"
                      className={`block text-white text-decoration-none${
                        pathname === "/dashboard/change-password"
                          ? "border-b-2  text-decoration-none h5"
                          : ""
                      }`}
                    >
                      Thay đổi mật khẩu
                    </Link>
                  </li>
                )}
                <li
                  onClick={logout}
                  className="flex justify-start items-center gap-2 py-2 cursor-pointer"
                >
                  <span className="text-xl">
                    <BiLogInCircle />
                  </span>
                  {/**   Đăng xuất */}
                  <Link
                    to="/dashboard"
                    className="block text-white text-decoration-none"
                  >
                    Đăng xuất
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-[calc(100%-270px)] md-lg:w-full">
              {/** yeu thich*/}
              <div className="mx-4 md-lg:mx-0 ">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Dashboard;
