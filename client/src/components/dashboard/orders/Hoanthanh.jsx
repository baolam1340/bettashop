/* eslint-disable react-hooks/exhaustive-deps */
import Orders from "../Orders";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  messageClear,
  get_all_orders,
} from "../../../store/reducers/orderReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import Reviews from "../../Reviews";
import { get_product } from "../../../store/reducers/homeReducer";

import FadeLoader from "react-spinners/FadeLoader";
const Hoanthanh = () => {
  const dispatch = useDispatch();
  const { allOrders, successMessage, loader, product_complete } = useSelector(
    (state) => state.order
  );
  const { userInfo } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [slugitem, setSlug] = useState("");

  useEffect(() => {
    dispatch(get_all_orders(userInfo.id));
    for (let i = 0; i < product_complete.length; i++) {
      let products = product_complete[i];
      for (let j = 0; j < products.length; j++) {
        dispatch(get_product(products[j].slug));
      }
    }
  }, [dispatch]);

  const product_2 = [];

  for (let i = 0; i < product_complete.length; i++) {
    let products = product_complete[i];
    for (let j = 0; j < products.length; j++) {
      const product_1 = products.filter((items) => items.slug);
      product_2.push(product_1[j]);
    }
  }

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      messageClear();
    }
  }, [successMessage]);

  const hoanthanh = allOrders.filter(
    (items) =>
      items.delivery_status === "Đã Giao Hàng" ||
      items.delivery_status === "Yêu Cầu Trả Hàng"
  );

  return (
    <div>
      <Orders />
      {hoanthanh.length ? (
        <div className="bg-white p-4 rounded-md w-full mt-5 justify-center">
          {open && (
            <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
              <div className="w-[50%] h-[80vh] pl-[100px] bg-white rounded shadow relative overflow-y-scroll">
                <div className="w-full flex justify-end p-3">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h1 className="text-center text-[25px] font-Poppins">
                  Đánh giá
                </h1>
                <div className="w-[50%]">
                  {product_2.map(
                    (u) => slugitem === u.slug && <Reviews product={u} />
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center w-full">
            <ul className="w-full">
              {loader ? (
                <FadeLoader />
              ) : (
                hoanthanh.map((q, i) => (
                  <li
                    key={i}
                    className="mt-3 border border-slate-300 rounded-md"
                  >
                    <div className="flex flex-col w-full ">
                      <div className="p-5 flex flex-col">
                        <h2 className="text-slate-600 font-semibold">
                          Đã mua vào ngày: <span>{q.date}</span>{" "}
                          <div className="text-end">
                            <Link
                              to={`/dashboard/order/${q._id}`}
                              className="pl-[100px] text-success text-decoration-none"
                            >
                              Đã Giao Hàng
                            </Link>
                            {q.delivery_status === "Đã Giao Hàng" ? (
                              <b className="border-l-2 text-primary uppercase ml-4 pl-2">
                                hoàn thành
                              </b>
                            ) : q.delivery_status === "Yêu Cầu Trả Hàng" ? (
                              <b className="border-l-2 text-red-400 uppercase ml-4 pl-2">
                                Đang chờ yêu cầu trả hàng
                              </b>
                            ) : (
                              ""
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
                          <div className="w-full flex">
                            Trạng thái thanh toán:{" "}
                            {q?.payment_status === "unpaid" ? (
                              <p className="flex pl-2 text-red-500 w-auto">
                                Chưa chọn hình thức thanh toán{" "}
                              </p>
                            ) : q?.payment_status === "paid" ? (
                              <p className="pl-2 text-green-500">
                                Đã Thanh Toán
                              </p>
                            ) : (
                              <p className="pl-2 text-green-500">
                                Thanh Toán Khi Nhận Hàng
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-3 flex flex-col">
                          <h2 className="text-slate-600 text-lg pb-2">
                            Sản phẩm
                          </h2>
                          <div className="flex gap-5 ">
                            <ul>
                              {q.products?.map((p, i) => (
                                <li key={i}>
                                  <div className="flex flex-col w-full">
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
                                      {q.delivery_status === "Đã Giao Hàng" && (
                                        <div className="pt-2 flex items-center justify-start md-lg:flex-col">
                                          <Link
                                            onClick={() =>
                                              setOpen(true) || setSlug(p.slug)
                                            }
                                            className={`rounded-md text-white bg-warning m-2 p-2 text-decoration-none`}
                                            // to={`/product/details/${p.slug}`}
                                          >
                                            Đánh Giá
                                          </Link>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default Hoanthanh;
