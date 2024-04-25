/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Orders from "../Orders";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  messageClear,
  get_all_orders,
} from "../../../store/reducers/orderReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import FadeLoader from "react-spinners/FadeLoader";
const Dahuy = () => {
  const dispatch = useDispatch();
  const { allOrders, successMessage, loader } = useSelector(
    (state) => state.order
  );
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(get_all_orders(userInfo.id));
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      messageClear();
    }
  }, [successMessage]);

  const huy = allOrders.filter((items) => items.delivery_status === "Hủy");

  return (
    <div>
      <Orders />
      {huy.length ? (
        <div className="bg-white p-4 rounded-md w-full mt-5 justify-center">
          <div className="flex justify-between items-center w-full">
            <ul className="w-full">
              {loader ? (
                <FadeLoader />
              ) : (
                huy.map((q, i) => (
                  <li
                    key={i}
                    className="mt-3 border border-slate-300 rounded-md"
                  >
                    <div className="flex flex-col w-full ">
                      <div className="p-5 flex flex-col">
                        <h2 className="text-slate-600 font-semibold">
                          Đã mua vào ngày: <span>{q.date}</span>{" "}
                          <div className="text-end">
                            <Link to={``} className="pl-[100px] text-green-500">
                              Hủy
                            </Link>
                            {q.delivery_status === "complete" && (
                              <b className="border-l-2 text-red-400 uppercase ml-4">
                                {" "}
                                hoàn thành
                              </b>
                            )}
                          </div>
                        </h2>

                        <div className="gap-3">
                          <div className="flex flex-col gap-1">
                            <h2 className="text-slate-600 font-semibold">
                              Chuyển Đến: {q.shippingInfo?.name}
                            </h2>
                            <p>
                              <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                Địa chỉ:{" "}
                              </span>
                              <span>
                                {q.shippingInfo?.address}{" "}
                                {q.shippingInfo?.country} {q.shippingInfo?.city}{" "}
                                {q.shippingInfo?.address1}{" "}
                              </span>
                            </p>
                            <p className="text-slate-600 text-sm font-semibold">
                              Email: {userInfo.email}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-col">
                          <h2 className="text-slate-600 text-lg pb-2">
                            Sản phẩm
                          </h2>
                          <div className="flex gap-5 ">
                            <ul>
                              {q.products?.map((p, i) => (
                                <li>
                                  <div className="flex flex-col w-full" key={i}>
                                    <div className="flex gap-5 justify-start items-center text-slate-600">
                                      <div className="flex gap-2">
                                        <img
                                          className="w-[55px] h-[55px]"
                                          src={p.images[0]}
                                          alt="image1"
                                        />
                                        <div className="flex text-sm flex-col justify-start items-start">
                                          <Link>{p.name.slice(0, 80)}...</Link>
                                          <p>
                                            <span>Thương hiệu: {p.brand}</span>
                                            <span className="pl-[7px]">
                                              Số lượng: {p.quantity}
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="pl-4">
                                        <h2 className="text-md text-orange-500">
                                          {(
                                            p.price -
                                            Math.floor(
                                              (p.price * p.discount) / 100
                                            )
                                          ).toLocaleString("vi", {
                                            style: "currency",
                                            currency: "VND",
                                          })}
                                        </h2>
                                        <p className="line-through">
                                          {p.price.toLocaleString("vi", {
                                            style: "currency",
                                            currency: "VND",
                                          })}
                                        </p>
                                        <p>-{p.discount}%</p>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <button
                      onClick={() => huydonhang(q._id)}
                      className={`rounded-md text-white bg-red-500 m-2 p-2`}
                    >
                      Hủy Đơn Hàng
                    </button> */}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-md w-full mt-5 justify-center">
          <div className="flex justify-between items-center w-full">
            <h1 className="justify-items-center text-center text-lg">
              Chưa có đơn hàng!
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dahuy;
