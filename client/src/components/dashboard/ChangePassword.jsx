import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  change_password,
  messageClear,
} from "../../store/reducers/authReducer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { user_reset } from "../../store/reducers/authReducer";
import { reset_count } from "../../store/reducers/cardReducer";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { successMessage, errorMessage } = useSelector((state) => state.auth);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const passwordChangeHandler = (e) => {
    e.preventDefault();
    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    dispatch(change_password(data));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      localStorage.removeItem("customerToken");
      dispatch(user_reset());
      dispatch(reset_count());
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch, navigate]);

  return (
    <div className=" bg-secondary pl-5 rounded-md">
      <h2 className="text-xl text-white h3 ">Thay Đổi Mật Khẩu</h2>
      <div className="row ml-5">
        <form onSubmit={passwordChangeHandler}>
          <div className="flex flex-col  gap-1 mb-2 text-white row ">
            <label htmlFor="old_password ">Mật Khẩu Cũ</label>
            <input
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
              id="oldPassword"
              name="oldPassword"
              placeholder="Nhập mật khẩu cũ"
              className="outline-none px-3 py-1 border rounded-md col-md-3  text-slate-600"
            />
          </div>
          <div className="flex flex-col gap-1 mb-2 text-white row">
            <label htmlFor="new_password">Mật Khẩu Mới</label>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Nhâp mật khẩu mới"
              className="outline-none px-3 py-1 border col-md-3 rounded-md text-slate-600"
            />
          </div>
          <div>
            <button className="m-2 btn btn-primary text-white rounded-md">
              Cập Nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
