/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_all_review_order } from "../../store/Reducers/OrderReducer";
import { Tooltip } from "antd";

const Request = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { review_order } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(get_all_review_order());
  }, [dispatch]);

  const rollback = () => {
    navigate(-1); // Sử dụng navigate(-1) để quay lại trang trước đó
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <div className="text-white cursor-pointer uppercase">
          <p
            onClick={rollback}
            className="p-2 border w-[100px] text-center rounded-md border-slate-500 hover:bg-green-400 hover:text-slate-600 transition-all duration-300"
          >
            Quay Lại
          </p>
        </div>
        {!review_order.length && (
          <p className="text-lg text-white">Chưa có lượt đánh giá đơn hàng</p>
        )}
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-xs text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  mã đơn hàng
                </th>
                <th scope="col" className="py-3 px-4">
                  hình ảnh
                </th>
                <th scope="col" className="py-3 px-4">
                  tên
                </th>
                <th scope="col" className="py-3 px-4">
                  đánh giá
                </th>
                <th scope="col" className="py-3 px-4">
                  số sao
                </th>
                <th scope="col" className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal">
              {review_order?.map((d, i) => (
                <tr key={i}>
                  <th
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {d.orderId.substring(0, 10).toUpperCase()}
                  </th>
                  <th
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <img
                      className="w-[45px] h-[45px]"
                      src={d?.image ? d?.image : "/images/seller.png"}
                      alt="img_seller"
                    />
                  </th>
                  <th
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{d?.name}</span>
                  </th>

                  <th
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{d?.review}</span>
                  </th>
                  <th
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{d?.rating}</span>
                  </th>
                  <th
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Tooltip title="Xem Chi Tiết Đơn Hàng">
                        <Link
                          to={`/admin/dashboard/review-order/details/${d.orderId}`}
                          className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                        >
                          <FaEye />
                        </Link>
                      </Tooltip>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Request;
