import React, { useEffect, useState } from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  customer_login,
  messageClear,
  customer_gg_login,
} from "../store/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import FadeLoader from "react-spinners/FadeLoader";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
const Login = () => {
  const { loader, successMessage, errorMessage, userInfo } = useSelector(
    (state) => state.auth
  );

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    dispatch(customer_login(state));
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
  }, [successMessage, errorMessage, userInfo, dispatch, navigate]);

  useEffect(() => {
    window.scrollTo({
      top: 100,
      left: 400,
      behavior: "smooth",
    });
  }, [location]);

  const login_google = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        dispatch(customer_gg_login(res));

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="container">
      {loader && (
        <div className="w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[9999]">
          <FadeLoader />
        </div>
      )}
      <Headers />
      <div className=" text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
        <h2>Đăng Nhập Tài Khoản</h2>
        <div className="w-[100px] h-[4px] bg-success mt-4"></div>
      </div>
      <div className=" mt-4">
        <div className="w-auto justify-center items-center p-10">
          <div className="grid grid-cols-2 w-[60%] md-lg:w-full mx-auto bg-light rounded border md:grid-cols-1">
            <div className="w-full px-8 py-8">
              <h2 className="text-center w-full text-xl text-slate-600 font-bold">
                Đăng Nhập
              </h2>
              <div className="w-full md:w-full">
                <form onSubmit={login} className="text-slate-600" action="">
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
                    />
                  </div>
                  <button className="px-8 w-full py-2 mt-3 btn btn-primary text-white rounded-md">
                    Đăng Nhập
                  </button>
                </form>
                {/*<div className="flex justify-center items-center py-2">
                  <div className="h-[1px] bg-slate-300 w-[95%]"></div>
                  <span className="px-3 text-slate-600">Or</span>
                  <div className="h-[1px] bg-slate-300 w-[95%]"></div>
      </div>*/}
              </div>
              <div className="text-center text-slate-600 pt-1">
                <p className="h6">
                  Bạn Chưa Có Tài Khoản ?{" "}
                  <Link
                    className="text-blue-500 text-decoration-none"
                    to="/register"
                  >
                    Đăng Ký Ngay
                  </Link>
                </p>
              </div>
            </div>
            <div className="lg:w-full py-4 pr-4 md:hidden">
              <img
                className="w-full h-[95%] rounded md:w-0"
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

export default Login;
