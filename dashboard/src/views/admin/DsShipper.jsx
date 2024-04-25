/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  get_all_shipper,
  xoa_shipper,
  messageClear,
} from "../../store/Reducers/shipperReducer";
import { Tooltip } from "antd";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";

const DsShipper = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const { shippers, totalShipper, successMessage } = useSelector(
    (state) => state.shipper
  );
  // const [show, setShow] = useState(false)
  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_all_shipper(obj));
  }, [currentPage, parPage, searchValue]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());

      window.location.reload();
    }
  }, [successMessage]);

  const delete_shipper = (id) => {
    dispatch(xoa_shipper(id));
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      {open &&
        shippers.map((u, i) => (
          <div
            key={i}
            className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center"
          >
            <div className="p-4 w-[auto] h-[200px] bg-white rounded shadow relative">
              <div className="w-full flex justify-end p-3">
                <RxCross1
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <h1 className="text-center text-[25px] font-Poppins">
                Bạn Chắc Chắn Muốn Xóa Shipper Này?
              </h1>
              <div className="p-[100px] flex justify-between items-center pt-4">
                <button
                  onClick={() => setOpen(false)}
                  className="flex border p-2 bg-red-500 rounded-md text-white"
                >
                  Không
                </button>
                <button
                  onClick={() => delete_shipper(u._id)}
                  className="flex border p-2 bg-green-500 rounded-md text-white"
                >
                  Có
                </button>
              </div>
            </div>
          </div>
        ))}
      <div className="w-full p-4  bg-[#283046] rounded-md">
        
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
        <div className="text-white text-end pl-2">
          <Link
            to="/admin/dashboard/register-shipper"
            className="p-2 text-end bg-green-500 mt-4 rounded-md hover:bg-green-300 hover:text-black"
          >
            <button className="p-2 mt-4">Tạo Tài Khoản Shipper</button>
          </Link>
        </div>
        <div className=" overflow-x-auto">
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
                  số điện thoại
                </th>
                <th scope="col" className="py-3 px-4">
                  cccd
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
              {shippers?.map((d, i) => (
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
                    <span>{d.phoneNumber}</span>
                  </th>
                  <th
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{d.cccd}</span>
                  </th>
                  <th
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{d.address}</span>
                  </th>
                  <th
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Tooltip title="Xem Chi Tiết Shipper">
                        <Link
                          to={`/admin/dashboard/shipper/details/${d._id}`}
                          className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                        >
                          <FaEye />
                        </Link>
                      </Tooltip>
                      <Tooltip title="Xóa Shipper">
                        <Link
                          onClick={() => setOpen(true)}
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
        {totalShipper < parPage ? (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalShipper}
              parPage={parPage}
              showItem={3}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DsShipper;
