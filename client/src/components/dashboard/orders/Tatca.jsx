import Orders from "../Orders";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  get_all_orders,
  huy_order,
  messageClear,
} from "../../../store/reducers/orderReducer";
import toast from "react-hot-toast";
import FadeLoader from "react-spinners/FadeLoader";
import { Tooltip } from "antd";
import { FaQuestionCircle } from "react-icons/fa";

const Tatca = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allOrders, successMessage, loader } = useSelector(
    (state) => state.order
  );
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo && userInfo.id) {
      dispatch(get_all_orders(userInfo.id));
    }
  }, [userInfo, dispatch]);

  const huydonhang = (id) => {
    dispatch(huy_order({ orderId: id }));

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      messageClear();
    }
  }, [successMessage]);

  const redirect = (ord) => {
    let items = 0;
    for (let i = 0; i < ord.length; i++) {
      items = ord.products[i].quantity + items;
    }
    navigate("/payment", {
      state: {
        price: ord.price,
        items,
        orderId: ord._id,
      },
    });
  };

  return (
    <div>
      <Orders />
      {allOrders.length ? (
        <div className="bg-secondary p-4 rounded-md w-full mt-5">
          <div className="flex w-full">
            <ul className="w-full">
              {loader ? (
                <div className="w-screen h-screen">
                  <FadeLoader />
                </div>
              ) : (
                allOrders.map((q, i) => (
                  <li
                    key={`${q.id}_${i}`}
                    className="mt-3 border bg-light  rounded-md w-full"
                  >
                    <div className="flex flex-col w-full ">
                      <div className="p-5 flex flex-col justify-items-center pl-3">
                        <h2 className="text-slate-600 font-semibold">
                          Đã mua vào ngày: <span>{q.date}</span>{" "}
                          <div className="flex justify-end items-end text-end">
                            <Link
                              to={`/dashboard/order/${q._id}`}
                              className="pl-[100px] text-decoration-none text-success"
                            >
                              {q.delivery_status === "Tìm Shipper" ||
                              q.delivery_status === "Tìm Thấy Shipper" ? (
                                "Đã Xử Lí"
                              ) : q.delivery_status ===
                                "Shipper Nhận Được Hàng" ? (
                                "Vận Chuyển"
                              ) : q.delivery_status ===
                                "Giao Hàng Thành Công" ? (
                                "Đang Giao Hàng"
                              ) : q.delivery_status === "Xác Nhận Trả Hàng" ? (
                                <p className="text-red-500">Đã Trả Hàng</p>
                              ) : (
                                q.delivery_status
                              )}
                            </Link>
                            <b className="flex justify-between items-center pl-1">
                              <Tooltip title="Bấm vào chữ kế bên để xem thông tin chi tiết đơn hàng hoặc trả hàng nếu cần">
                                <FaQuestionCircle />
                              </Tooltip>
                            </b>
                            {q.delivery_status === "Đã Giao Hàng" && (
                              <b className="border-l-2 text-primary uppercase ml-4 pl-3">
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
                          <div className="w-full flex">
                            Trạng thái thanh toán:{" "}
                            {q?.payment_status === "unpaid" ? (
                              <p className="flex pl-2 text-red-500 w-auto">
                                Chưa chọn hình thức thanh toán{" "}
                                <span
                                  onClick={() => redirect(q)}
                                  className="bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded cursor-pointer"
                                >
                                  Chọn Ngay
                                </span>
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
                                <li key={`${q.id}_${i}`}>
                                  <div
                                    className="flex flex-col w-full"
                                    key={`${q.id}_${i}`}
                                  >
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
                                          {/* <span>Tên Shop: {p.shopName}</span> */}
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
                                        <div className="pt-2 flex items-center md-lg:flex-col">
                                          <Link
                                            className={`rounded-md text-white text-decoration-none bg-warning m-2 p-2 `}
                                            to={`/product/details/${p.slug}`}
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
                    {q.delivery_status === "Hủy" ||
                    q.delivery_status === "Đã Giao Hàng" ||
                    q.delivery_status === "Đang Giao Hàng" ||
                    q.delivery_status === "Xác Nhận Trả Hàng" ? (
                      ""
                    ) : (
                      <button
                        onClick={() => huydonhang(q._id)}
                        className={`rounded-md text-white bg-red-500 m-2 p-2`}
                      >
                        Hủy Đơn Hàng
                      </button>
                    )}
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

export default Tatca;
