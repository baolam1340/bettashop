/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  get_review_products,
  messageClear,
  xoa_review,
} from "../../store/Reducers/productReducer";
import { FaTrash } from "react-icons/fa";
import { Tooltip } from "antd";
import { RxCross1 } from "react-icons/rx";
import toast from "react-hot-toast";
import FadeLoader from "react-spinners/FadeLoader";

const SeeReviewCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState("");

  const { product_find, successMessage, loader } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    dispatch(get_review_products());
  }, [dispatch]);

  const delete_review = (id) => {
    dispatch(xoa_review(id));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      window.location.reload(1);
    }
  }, [successMessage]);

  const rollback = () => {
    navigate(-1); // Sử dụng navigate(-1) để quay lại trang trước đó
  };

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <div className="text-white cursor-pointer uppercase">
          <p
            onClick={rollback}
            className="p-2 border w-[100px] text-center rounded-md border-slate-500 hover:bg-green-400 hover:text-slate-600 transition-all duration-300"
          >
            Quay Lại
          </p>
        </div>
        {open &&
          product_find.map((u, i) => (
            <div
              key={i}
              className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center"
            >
              <div className="p-4 w-[auto] h-[200px] bg-white rounded shadow relative">
                <div className="w-full flex justify-end p-3">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen("")}
                  />
                </div>
                <h1 className="text-center text-[25px] font-Poppins">
                  Bạn Chắc Chắn Muốn Xóa Đánh Giá Này?
                </h1>
                <div className="p-[100px] flex justify-between items-center pt-4">
                  <button
                    onClick={() => setOpen("")}
                    className="flex border p-2 bg-red-500 rounded-md text-white"
                  >
                    Không
                  </button>
                  <button
                    onClick={() => delete_review(open)}
                    className="flex border p-2 bg-green-500 rounded-md text-white"
                  >
                    Có
                  </button>
                </div>
              </div>
            </div>
          ))}
        <div className="overflow-x-auto mt-5">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  tt
                </th>
                <th scope="col" className="py-3 px-4">
                  hình ảnh sản phẩm
                </th>
                <th scope="col" className="py-3 px-4">
                  tên sản phẩm
                </th>
                <th scope="col" className="py-3 px-4">
                  tên khách hàng
                </th>
                <th scope="col" className="py-3 px-4">
                  số sao đánh giá
                </th>
                <th scope="col" className="py-3 px-4">
                  bình luận
                </th>
                <th scope="col" className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {loader ? (
                <FadeLoader />
              ) : (
                product_find &&
                product_find.map((d, i) => (
                  <tr key={i}>
                    <th
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      {i + 1}
                    </th>

                    <th
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      <span>
                        <img
                          className="h-[50] w-[50px]"
                          src={d.product.images[0]}
                          alt=""
                        />
                      </span>
                    </th>
                    <th
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      <span>{d.product.name.slice(0, 16)}...</span>
                    </th>
                    <th
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      <span>{d.review.name}</span>
                    </th>
                    <th
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      <span>{d.review.rating}</span>
                    </th>
                    <th
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      <span>
                        {" "}
                        <Tooltip title={d.review.review}>
                          {d.review.review.slice(0, 16)}...
                        </Tooltip>
                      </span>
                    </th>
                    <th
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      <div className="flex justify-start items-center gap-4">
                        <Tooltip title="Xóa Đánh Giá">
                          <Link
                            onClick={() => setOpen(d?.review?._id)}
                            // to={`/admin/dashboard/delete_review_product/${d.review._id}`}
                            className="p-[10px] bg-red-500 text-white rounded hover:shadow-lg hover:shadow-yellow-500/50"
                          >
                            <FaTrash />
                          </Link>
                        </Tooltip>
                      </div>
                    </th>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SeeReviewCustomer;
