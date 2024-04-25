/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/scope */
import React, { useEffect, useState } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Chart from "react-apexcharts";
import customer from "../../assets/seller.png";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import toast from "react-hot-toast";
import {
  get_shipper_new_order,
  comfirm_order_shipper,
  messageClear,
} from "../../store/Reducers/dashboardIndexReducer";
import { FaEye } from "react-icons/fa";

const ShipperDashboard = () => {
  const { orders, Total_Orders, Total_TimShipper,Total_Complete, successMessage } =
    useSelector((state) => state.dashboardIndex);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(get_shipper_new_order(userInfo._id));
  }, []);

  const nhandonhang = (orderId) => {
    dispatch(comfirm_order_shipper({ orderId, userInfo }));
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage]);
  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className="text-3xl font-bold">{Total_Orders}</h2>
            <span className="text-md font-medium">Tổng Đơn Hàng</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#00cfe81f] flex justify-center items-center text-xl">
            <AiOutlineShoppingCart className="text-[#00cfe8] shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className="text-3xl font-bold">{Total_TimShipper}</h2>
            <span className="text-md font-medium">Đơn Hàng Đang Chờ</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#7367f01f] flex justify-center items-center text-xl">
            <AiOutlineShoppingCart className="text-[#7367f0] shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#283046] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
            <h2 className="text-3xl font-bold">{Total_Complete}</h2>
            <span className="text-md font-medium">Đơn Hàng Hoàn Thành</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#7367f01f] flex justify-center items-center text-xl">
            <AiOutlineShoppingCart className="text-[#7367f0] shadow-lg" />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap mt-7">
        <div className="w-full p-4  bg-[#283046] rounded-md">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-[#d0d2d6]">
              <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
                <tr>
                  <th scope="col" className="py-3 px-4">
                    Tên người mua
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Địa chỉ giao hàng
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Số điện thoại
                  </th>
                  <th scope="col" className="py-3 px-4">
                    trạng thái đơn hàng
                  </th>
                  <th scope="col" className="py-3 px-4">
                    ngày mua
                  </th>
                  <th scope="col" className="py-3 px-4">
                    hoạt động
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((d, i) =>
                  d.delivery_status === "Chưa Xử Lí" ||
                  d.delivery_status === "Đã Xử Lí" ||
                  d.delivery_status === "Hủy"||
                  d.delivery_status === "Xác Nhận Trả Hàng" ? (
                    ""
                  ) : (
                    <tr key={i}>
                      <td
                        scope="row"
                        className="py-3 px-4 font-medium whitespace-nowrap"
                      >
                        {d.shippingInfo.name}
                      </td>
                      <td
                        scope="row"
                        className="py-3 px-4 font-medium whitespace-nowrap"
                      >
                        {d.shippingInfo.address1}
                      </td>
                      <td
                        scope="row"
                        className="py-3 px-4 font-medium whitespace-nowrap"
                      >
                        <span>{d.shippingInfo.phoneNumber}</span>
                      </td>
                      <td
                        scope="row"
                        className="py-3 px-4 font-medium whitespace-nowrap"
                      >
                        <span>{d.delivery_status}</span>
                      </td>
                      <td
                        scope="row"
                        className="py-3 px-4 font-medium whitespace-nowrap"
                      >
                        {d.date}
                      </td>
                      <td
                        scope="row"
                        className="py-3 px-4 font-medium whitespace-nowrap"
                      >
                        {d.shipperInfo ? (
                          <div>
                            Đã nhận đơn vào ngày <b className="text-green-400">{d.shipper_date}</b>
                            <Link
                              to={`/shipper/dashboard/details/${d._id}`}
                              className="pl-2 p-[6px] w-[30px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 flex justify-center items-center"
                            >
                              <FaEye />
                            </Link>
                          </div>
                        ) : (
                          <button
                            onClick={() => nhandonhang(d._id)}
                            className="p-[6px] w-full bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 flex justify-center items-center text-black"
                          >
                            Nhận Đơn Hàng
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipperDashboard;
