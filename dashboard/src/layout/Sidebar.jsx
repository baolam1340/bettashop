/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getNavs } from "../navigation/index";
import { logout } from "../store/Reducers/authReducer";
import { BiLogInCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import logo from "../assets/shopvn.png";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { role, count_order } = useSelector((state) => state.auth);

  const { pathname } = useLocation();
  const [allNav, setAllNav] = useState([]);
  useEffect(() => {
    const navs = getNavs(role);
    setAllNav(navs);
  }, [role]);

  return (
    <div>
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed duration-200 ${
          !showSidebar ? "invisible" : "visible"
        } w-screen h-screen bg-[#22292f80] top-0 left-0 z-10`}
      ></div>
      <div
        className={`w-[300px] fixed hover:overflow-x-scroll hover:scroll-smooth bg-dark z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${
          showSidebar ? "left-0" : "-left-[300px] lg:left-0"
        }`}
      >
        <div className=" flex justify-center items-center mt-5 col-md-10 ml-9 ">
          <Link className="">
            <img className="" src="/images/bettashop-rm.png" alt="" />
          </Link>
        </div>
        <div className="px-[16px]">
          <ul>
            {allNav.map((n, i) => (
              <li key={i}>
                <Link
                  to={n.path}
                  className={`${
                    pathname === n.path
                      ? "bg-slate-600 shadow-indigo-500/30 text-white duration-500 "
                      : "text-[#d0d2d6] font-normal duration-200"
                  } px-[12px] py-[9px] rounded-end flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1 text-decoration-none`}
                >
                  <span>
                    {n.title === "Đơn Hàng" && role === "admin" && (
                      <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center">
                        {count_order}
                      </div>
                    )}
                  </span>
                  <span>{n.icon}</span>
                  <span>{n.title}</span>
                </Link>
              </li>
            ))}
            <li className="">
              <button
                onClick={() => dispatch(logout({ navigate, role }))}
                className="text-[#d0d2d6] font-normal duration-200 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1 "
              >
                <span>
                  <BiLogInCircle />
                </span>
                <span>Đăng Xuất</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
