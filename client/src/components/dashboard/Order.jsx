/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_order } from "../../store/reducers/orderReducer";

const Order = () => {
  const dispatch = useDispatch();
  const { myOrder } = useSelector((state) => state.order);
  const { orderId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(get_order(orderId));
  }, [dispatch, orderId]);

  return (
    <div className="bg-white p-5 row ">
      <h2 className="text-slate-600 font-semibold">
        Mã đơn hàng: {myOrder._id && myOrder._id.substring(0, 10).toUpperCase()}
        , <span>{myOrder.date}</span>
      </h2>
      <div className="grid grid-cols-2 gap-3 bg-danger">
        <div className="flex flex-col gap-1">
          <h2 className="text-slate-600 font-semibold">
            Chuyển Đến: {myOrder.shippingInfo?.name}
          </h2>
          <p>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
              Địa chỉ:{" "}
            </span>
            <span>
              {myOrder.shippingInfo?.address} {myOrder.shippingInfo?.country}{" "}
              {myOrder.shippingInfo?.city} {myOrder.shippingInfo?.address1}{" "}
            </span>
          </p>
          <p className="text-slate-600 text-sm font-semibold">
            Email to: {userInfo.email}
          </p>
        </div>
        <div className="text-slate-600 ">
          <h2>Price: {myOrder.price} đ Đã bao gồm phí ship</h2>
          <p className="">
            Trạng thái thanh toán:
            <span
              className={`py-[1px] text-xs px-3 ${
                myOrder.payment_status === "paid"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              } rounded-md `}
            >
              {myOrder.payment_status}
            </span>
          </p>
          <p>
            Trạng thái đơn hàng:{" "}
            <span
              className={`py-[1px] text-xs px-3 ${
                myOrder.payment_status === "paid"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              } rounded-md `}
            >
              {myOrder.delivery_status}
            </span>
          </p>
        </div>
      </div>
      <div className="mt-3">
        <h2 className="text-slate-600 text-lg pb-2">Sản phẩm</h2>
        <div className="flex gap-5 flex-col">
          {myOrder.products?.map((p, i) => (
            <div key={i}>
              <div className="flex gap-5 justify-start items-center text-slate-600">
                <div className="flex gap-2">
                  <img
                    className="w-[55px] h-[55px]"
                    src={p.images[0]}
                    alt="image"
                  />
                  <div className="flex text-sm flex-col justify-start items-start">
                    <Link>{p.name}</Link>
                    <p>
                      <span>Thương hiệu: {p.brand}</span>
                      <span className="pl-[7px]">Số lượng: {p.quantity}</span>
                    </p>
                  </div>
                </div>
                <div className="pl-4">
                  <h2 className="text-md text-orange-500">
                    {(
                      p.price - Math.floor((p.price * p.discount) / 100)
                    ).toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </h2>
                  <p>
                    {p.price.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}{" "}
                  </p>
                  <p>-{p.discount}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
