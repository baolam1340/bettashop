/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import {
  messageClear,
  nvadmin_register,
} from "../../store/Reducers/authReducer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const RegisterNvAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    district: "",
    sub_district: "",
    role: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (e) => {
    setState({
      ...state,
      role: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(nvadmin_register(state));
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
  }, [successMessage, errorMessage]);

  const rollback = () => {
    navigate(-1); // Sử dụng navigate(-1) để quay lại trang trước đó
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4  bg-[#283046] rounded-md text-white">
        <div className="text-white cursor-pointer uppercase">
          <p
            onClick={rollback}
            className="p-2 border w-[100px] text-center rounded-md border-slate-500 hover:bg-green-400 hover:text-slate-600 transition-all duration-300"
          >
            Quay Lại
          </p>
        </div>
        <h2 className="text-center">Đăng Ký Tài Khoản Nhân Viên</h2>
        <form onSubmit={submit}>
          <div className="flex flex-col w-full gap-1 mb-3 ">
            <label className="flex" htmlFor="name">
              Tên <p className="text-red-500">*</p>
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
            <label className="flex" htmlFor="email">
              Email <p className="text-red-500">*</p>
            </label>
            <input
              onChange={inputHandle}
              value={state.email}
              className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"
              type="email"
              name="email"
              placeholder="email"
              id="email"
              required
            />
          </div>

          <div className="flex flex-col w-full gap-1 mb-3">
            <label className="flex" htmlFor="email">
              địa chỉ 1<p className="text-red-500">*</p>
            </label>
            <input
              onChange={inputHandle}
              value={state.district}
              className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"
              type="text"
              name="district"
              placeholder="địa chỉ 1"
              id="district"
              required
            />
          </div>

          <div className="flex flex-col w-full gap-1 mb-3">
            <label className="flex" htmlFor="email">
              địa chỉ 2: (tùy chọn)
            </label>
            <input
              onChange={inputHandle}
              value={state.sub_district}
              className="px-3 py-2 pb-2 pt-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"
              type="text"
              name="sub_district"
              placeholder="địa chỉ 2"
              id="sub_district"
            />
          </div>

          <div className="flex flex-col w-full gap-1 mb-3">
            <label className="flex" htmlFor="email">
              Phân Quyền Nhân Viên<p className="text-red-500">*</p>
            </label>
            <select
              value={state.role}
              onChange={handleRoleChange}
              className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
              name={state.role}
              required
              id=""
            >
              <option value="">--Phân Quyền--</option>
              <option value="nv_donhang">Duyệt Đơn Hàng</option>
              <option value="nv_nhapkho">Nhập Kho</option>
              <option value="nv_quanly">Quản Lý</option>
              <option value="nv_sanpham">Quyền Sản Phẩm</option>
            </select>
          </div>

          <div className="flex flex-col w-full gap-1 mb-3">
            <label className="flex" htmlFor="password">
              Mật khẩu <p className="text-red-500">*</p>
            </label>
            <input
              onChange={inputHandle}
              value={state.password}
              className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"
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
              "Đăng Ký"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterNvAdmin;
