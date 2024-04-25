/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { admin_login, messageClear } from "../../store/Reducers/authReducer";
import { Link, useNavigate } from "react-router-dom";
import { Spin } from "antd";

function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );
  const [state, setSatate] = useState({
    email: "",
    password: "",
  });
  const inputHandle = (e) => {
    setSatate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const submit = (e) => {
    e.preventDefault();
    dispatch(admin_login(state));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [errorMessage, successMessage, dispatch, navigate]);
  return (
    <div className="min-w-screen min-h-screen  flex justify-center items-center container bg-secondary rounded ">
      <div className="col-md-4  p-2">
        <div className="bg-light p-4 rounded-md ">
          <h2 className="text-xl mb-3 text-center">
            CHÀO MỪNG ĐẾN VỚI BETTA SHOP
          </h2>

          <h1 className="text-center uppercase text-lg text-dark h5 ">admin</h1>
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
                <Spin tip="Loading" size="large" className="text-primary ">
                  <div className="đang tải" />
                </Spin>
              ) : (
                "Đăng Nhập"
              )}
            </button>
          </form>
          {/* <div className="justify-items-center">
            Bạn là nhân viên?{" "}
            <Link to={"/nhanvien-admin/login"} className="text-green-500">
              Nhân Viên
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
