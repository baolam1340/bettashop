/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import {
  messageClear,
  shipper_register,
} from "../../store/Reducers/authReducer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const RegisterShipper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );
  const [state, setSatate] = useState({
    name: "",
    phoneNumber: "",
    cccd: "",
    address: "",
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
    dispatch(shipper_register(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setTimeout(() => {
        window.location.reload(1);
      }, 2500);
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  const rollback = () => {
    navigate(-1); // Sử dụng navigate(-1) để quay lại trang trước đó
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4  bg-[#283046] rounded-md text-white">
        {" "}
        <div className="text-white cursor-pointer uppercase">
          <p
            onClick={rollback}
            className="p-2 border w-[100px] text-center rounded-md border-slate-500 hover:bg-green-400 hover:text-slate-600 transition-all duration-300"
          >
            Quay Lại
          </p>
        </div>
        <h2 className="text-center">Đăng Ký Tài Khoản Shipper</h2>
        <form onSubmit={submit}>
          <div className="flex flex-col w-full gap-1 mb-3 ">
            <label className="flex" htmlFor="text">
              Họ và Tên<p className="text-red-500">*</p>
            </label>
            <input
              onChange={inputHandle}
              value={state.name}
              className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"
              type="text"
              name="name"
              placeholder="name"
              id="name"
              required
            />
          </div>
          <div className="flex flex-col w-full gap-1 mb-3">
            <label className="flex" htmlFor="number">
              Số Điện Thoại <p className="text-red-500">*</p>
            </label>
            <input
              onChange={inputHandle}
              value={state.phoneNumber}
              className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"
              type="number"
              name="phoneNumber"
              placeholder="số điện thoại"
              id="phoneNumber"
              required
            />
          </div>
          <div className="flex flex-col w-full gap-1 mb-3">
            <label className="flex" htmlFor="number">
              Căn Cước Công Dân <p className="text-red-500">*</p>
            </label>
            <input
              onChange={inputHandle}
              value={state.cccd}
              className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"
              type="number"
              name="cccd"
              placeholder="cccd"
              id="cccd"
              required
            />
          </div>
          <div className="flex flex-col w-full gap-1 mb-3">
            <label className="flex" htmlFor="number">
              Địa Chỉ <p className="text-red-500">*</p>
            </label>
            <input
              onChange={inputHandle}
              value={state.address}
              className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"
              type="text"
              name="address"
              placeholder="số nhà / đường / tỉnh / huyện / xã"
              id="address"
              required
            />
          </div>
          <div className="flex flex-col w-full gap-1 mb-3">
            <label className="flex" htmlFor="password">
              Mật Khẩu <p className="text-red-500">*</p>
            </label>
            <input
              onChange={inputHandle}
              value={state.password}
              className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"
              type="password"
              name="password"
              placeholder="Mật Khẩu"
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
              "Đăng Ký"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterShipper;
