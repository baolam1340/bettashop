/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { messageClear, seller_login } from "../../store/Reducers/authReducer";
import toast from "react-hot-toast";
function Login() {
  const navigate = useNavigate();
  const [state, setSatate] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage, userInfo } = useSelector(
    (state) => state.auth
  );
  const inputHandle = (e) => {
    setSatate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const submit = (e) => {
    e.preventDefault();
    dispatch(seller_login(state));
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      if (userInfo.role === "nv_donhang") {
        navigate("/seller/dashboard/orders");
      }
      if (userInfo.role === "nv_nhapkho") {
        navigate("/seller/dashboard/log-product");
      }
      if (userInfo.role === "nv_quanly") {
        navigate("/seller/dashboard");
      }
      if (userInfo.role === "nv_sanpham") {
        navigate("/seller/dashboard/add-product");
      }
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="min-w-screen min-h-screen container flex justify-center items-center rounded  bg-secondary">
      <div className="row col-md-4 p-2">
        <div className="bg-light  p-4 rounded-md">
          <h2 className="text-xl mb-3 text-center">
            CHÀO MỪNG ĐẾN VỚI BETTA SHOP
          </h2>
          <p className="mb-3 items-center justify-center text-center uppercase text-lg text-dark h5">
            Nhân viên
          </p>
          <div className="flex justify-center items-center mt-2">
            <div className="">
              <img className="" src="/images/bettashop-rm.png" alt="image" />
            </div>
          </div>

          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input
                onChange={inputHandle}
                value={state.email}
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-secondary focus:border-indigo-500 overflow-hidden"
                type="text"
                name="email"
                placeholder="email"
                id="email"
                required
              />
            </div>
            <div className="flex flex-col w-full gap-1 mb-5">
              <label htmlFor="password">Password</label>
              <input
                onChange={inputHandle}
                value={state.password}
                className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-secondary focus:border-indigo-500 overflow-hidden"
                type="password"
                name="password"
                placeholder="password"
                id="password"
                required
              />
            </div>
            <button
              disabled={loader ? true : false}
              className="bg-blue-500 w-full hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
            >
              {loader ? (
                <PropagateLoader color="#fff" cssOverride={overrideStyle} />
              ) : (
                "Đăng Nhập"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
