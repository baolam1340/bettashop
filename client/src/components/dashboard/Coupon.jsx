/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_coupon } from "../../store/reducers/orderReducer";
import toast from "react-hot-toast";
import dayjs from "dayjs";

const Coupon = () => {
  const dispatch = useDispatch();
  const [copy, setCopy] = useState("");
  const { all_coupon } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(get_all_coupon());
  }, [dispatch]);

  if (copy) {
    toast.success("Copy mã thành công!");
  }

  return (
    <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
      <h2 className="text-slate-600 text-lg">Mã giảm giá của bạn:</h2>

      {all_coupon.map((u) => (
        <div className="flex bg-white p-3 shadow-md rounded-s-3xl justify-between items-center">
          <div className="bg-white">
            <img
              className="w-[500px] justify-between text-center items-center"
              src="/images/shopvn1.png"
              alt=""
            />
          </div>
          <div className="">
            Nhập mã <b>{u.name}</b> giảm <b>{u.value}%</b> cho đơn từ{" "}
            <b>
              {u.minAmount.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}{" "}
            </b>
            , tối đa giảm{" "}
            <b>
              {u.maxAmount.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </b>
            <p> số lượng: {u.count}</p>
            <p>
              HSD: {u?.endDate ? dayjs(u?.endDate).format("D/MM/YYYY") : ""}
            </p>
            <div className="items-center text-center">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(u.name) && setCopy(u.name);
                }}
                className="uppercase pt-2 pl-6 pr-6 pb-2 border border-slate-500 transition  hover:bg-slate-900 hover:text-white"
              >
                {copy !== u.name ? "lấy mã" : "đã lấy mã"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Coupon;
