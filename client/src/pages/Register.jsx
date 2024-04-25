/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import FadeLoader from "react-spinners/FadeLoader";
import { Link } from "react-router-dom";
import { customer_register, messageClear } from "../store/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { loader, successMessage, errorMessage, userInfo } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const register = (e) => {
    e.preventDefault();
    dispatch(customer_register(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (userInfo) {
      navigate("/");
    }
  }, [successMessage, errorMessage, messageClear]);
  return (
    <div className="container">
      {loader && (
        <div className="w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[9999]">
          <FadeLoader />
        </div>
      )}
      <Headers />
      <div className=" text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
        <h2>Đăng Ký Tài Khoản</h2>
        <div className="w-[100px] h-[4px] bg-success mt-4"></div>
      </div>
      <div className=" mt-4">
        <div className="w-full justify-center items-center p-10">
          <div className="grid grid-cols-2 w-[60%] md-lg:w-full mx-auto bg-light rounded border md:grid-cols-1">
            <div className="px-8 py-8">
              <h2 className="text-center w-full text-xl text-slate-600 font-bold">
                Đăng Ký
              </h2>
              <div>
                <form onSubmit={register} className="text-secondary" action="">
                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="name">Tên</label>
                    <input
                      onChange={inputHandle}
                      value={state.name}
                      type="text"
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                      id="name"
                      name="name"
                      placeholder="Nhập đầy đủ họ và tên"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="email">Email</label>
                    <input
                      onChange={inputHandle}
                      value={state.email}
                      type="email"
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                      id="email"
                      name="email"
                      placeholder="email"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="phoneNumber">Số điện thoại</label>
                    <input
                      onChange={inputHandle}
                      value={state.phoneNumber}
                      type="number"
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="(+84)"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="email">Mật Khẩu</label>
                    <input
                      onChange={inputHandle}
                      value={state.password}
                      type="password"
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                      id="password"
                      name="password"
                      placeholder="Mật khẩu"
                      required
                    />
                  </div>
                  <button className="px-8 w-full py-2 btn mt-2 btn-primary text-white rounded-md">
                    Đăng Ký
                  </button>
                </form>
              </div>
              <div className="text-center text-secondary pt-2">
                <p className="h6">
                  Bạn Đã Có Tài Khoản ?{" "}
                  <Link
                    className="text-blue-500 text-decoration-none "
                    to="/login"
                  >
                    Đăng Nhập Ngay !
                  </Link>
                </p>
              </div>
            </div>
            <div className="w-full h-full py-4 pr-4 md:hidden">
              <img
                className="w-full h-[95%] rounded"
                src="/images/login.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
