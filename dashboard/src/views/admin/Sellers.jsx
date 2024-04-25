/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  get_active_sellers,
  xoa_seller,
  messageClear,
} from "../../store/Reducers/sellerReducer";
import { Tooltip } from "antd";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
const Sellers = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const { sellers, totalSeller, successMessage } = useSelector(
    (state) => state.seller
  );
  // const [show, setShow] = useState(false)
  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_active_sellers(obj));
  }, [currentPage, parPage, searchValue]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      window.location.reload();
    }
  }, [successMessage]);

  const delete_seller = (id) => {
    dispatch(xoa_seller(id));
  };
  return (
    <div className="px-2 lg:px-7 pt-5">
      {open &&
        sellers.map((u, i) => (
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
                Bạn Chắc Chắn Muốn Xóa Nhân Viên Này?
              </h1>
              <div className="p-[100px] flex justify-between items-center pt-4">
                <button
                  onClick={() => setOpen("")}
                  className="flex border p-2 bg-red-500 rounded-md text-white"
                >
                  Không
                </button>
                <button
                  onClick={() => delete_seller(open)}
                  className="flex border p-2 bg-green-500 rounded-md text-white"
                >
                  Có
                </button>
              </div>
            </div>
          </div>
        ))}
      <div className="w-full p-4  bg-dark border rounded-md">
        <div className="flex justify-between items-center">
          <select
            onChange={(e) => setParPage(parseInt(e.target.value))}
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
          >
            <option value="5">5</option>
            <option value="5">15</option>
            <option value="5">25</option>
          </select>
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
            type="text"
            placeholder="search"
          />
        </div>
        <div className="row ">
          <div className="text-white col-md-3 mb-3 text-end pl-2">
            <Link
              to="/admin/dashboard/chat-sellers"
              className="p-2 text-end bg-warning mt-4 rounded-md hover:bg-green-300 hover:text-black"
            >
              <button className="p-2 mt-4  text-dark h6">
                Chat Với Nhân Viên
              </button>
            </Link>
          </div>
          <div className="text-white col-md-3 mb-3 text-end pl-2">
            <Link
              to="/admin/dashboard/register-nvadmin"
              className="p-2 text-end bg-warning mt-4 rounded-md hover:bg-pink-300 hover:text-black"
            >
              <button className="p-2 mt-4 text-dark h6">
                Tạo Tài Khoản Nhân Viên
              </button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-xs text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  hình ảnh
                </th>
                <th scope="col" className="py-3 px-4">
                  tên
                </th>
                <th scope="col" className="py-3 px-4">
                  chức vụ
                </th>
                <th scope="col" className="py-3 px-4">
                  Email
                </th>
                <th scope="col" className="py-3 px-4">
                  địa chỉ
                </th>
                <th scope="col" className="py-3 px-4">
                  hành động
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-normal">
              {sellers.map((d, i) => (
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
                    <img
                      className="w-[45px] h-[45px]"
                      src={d.image ? d.image : "/images/seller.png"}
                      alt="img_seller"
                    />
                  </th>
                  <th
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{d.name}</span>
                  </th>
                  <th
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>
                      {d?.role === "nv_donhang"
                        ? "Duyệt Đơn Hàng"
                        : d?.role === "nv_nhapkho"
                        ? "Nhập Kho"
                        : d?.role === "nv_quanly"
                        ? "Quản Lý"
                        : d?.role === "nv_sanpham"
                        ? "Quyền Sản Phẩm"
                        : ""}
                    </span>
                  </th>
                  <th
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{d.email}</span>
                  </th>
                  <th
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>
                      {d.shopInfo?.district
                        ? d.shopInfo?.district
                        : "(chưa điền)"}
                    </span>
                  </th>

                  <th
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Tooltip title="Xem Chi Tiết Nhân Viên">
                        <Link
                          to={`/admin/dashboard/seller/details/${d._id}`}
                          className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                        >
                          <FaEye />
                        </Link>
                      </Tooltip>
                      <Tooltip title="Xóa Nhân Viên">
                        <Link
                          onClick={() => setOpen(d._id)}
                          // onClick={() => delete_seller(d._id)}
                          className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50"
                        >
                          <FaTrash />
                        </Link>
                      </Tooltip>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalSeller <= parPage ? (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalSeller}
              parPage={parPage}
              showItem={Math.floor(totalSeller / parPage)}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Sellers;
