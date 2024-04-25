/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  get_nhacungcap,
  messageClear,
  submit_nhacungcap,
  xoa_nhacungcap,
} from "../../store/Reducers/productReducer";
import { FaWarehouse, FaEye, FaTrash } from "react-icons/fa";
import { Tooltip } from "antd";
import { RxCross1 } from "react-icons/rx";
import toast from "react-hot-toast";

const ThemNhaCungCap = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [status, setStatus] = useState();
  const { all_nhacungcap, count_nhacungcap, successMessage } = useSelector(
    (state) => state.product
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      status: status,
    };
    dispatch(submit_nhacungcap(obj));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setOpen(false);
    }
  }, [successMessage, dispatch]);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_nhacungcap(obj));
  }, [searchValue, currentPage, parPage]);

  const delete_nhacungcap = (id) => {
    dispatch(xoa_nhacungcap(id));
    window.location.reload(1);
  };

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
        <div className="relative overflow-x-auto mt-5">
          <div className="w-full flex justify-end">
            <div
              className={`w-[150px] bg-[#92389a] h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3 `}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Thêm nhà cung cấp</span>
            </div>
          </div>
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  ID
                </th>
                <th scope="col" className="py-3 px-4">
                  Tên nhà cung cấp
                </th>
                <th scope="col" className="py-3 px-4">
                  Email
                </th>
                <th scope="col" className="py-3 px-4">
                  Số điện thoại
                </th>
                <th scope="col" className="py-3 px-4">
                  Địa chỉ
                </th>
                <th scope="col" className="py-3 px-4">
                  Tình trạng
                </th>
                <th scope="col" className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {all_nhacungcap &&
                all_nhacungcap.map((d, i) => (
                  <tr key={i}>
                    <th
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      {d._id.slice(-3)}
                    </th>
                    <th
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      <span>{d?.name?.slice(0, 16)}...</span>
                    </th>
                    <th
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      <span>{d?.email}</span>
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
                      <span>{d.address}</span>
                    </th>
                    <th
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap "
                    >
                      <span
                        className={`p-2 ${
                          d.status === "đang hợp tác"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }  rounded-md text-black`}
                      >
                        {d.status}
                      </span>
                    </th>
                    <th
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      <div className="flex justify-start items-center gap-4">
                        {/* <Tooltip title="Nhập Hàng">
                          <Link
                            to={`/admin/dashboard/log-product-detail/${d._id}`}
                            className="p-[10px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                          >
                            <FaWarehouse />
                          </Link>
                        </Tooltip> */}
                        <Tooltip title="Xóa nhà cung cấp">
                          <Link
                            onClick={() => delete_nhacungcap(d._id)}
                            className="p-[10px] bg-red-500 text-white rounded hover:shadow-lg hover:shadow-yellow-500/50"
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
        {open && (
          <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
            <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4">
              <div className="w-full flex justify-end">
                <RxCross1
                  size={30}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <h5 className="text-[30px] font-Poppins text-center">
                Thêm nhà cung cấp
              </h5>
              {/* create coupoun code */}
              <form onSubmit={handleSubmit} aria-required={true}>
                <br />
                <div>
                  <label className="pb-2">
                    Tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={name}
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Thêm tên mã giảm giá..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    required
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email nhà cung cấp"
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">
                    {" "}
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="phoneNumber"
                    value={phoneNumber}
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="(+84)"
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">
                    {" "}
                    Địa chỉ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={address}
                    className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Nhập địa chỉ cụ thể..."
                  />
                </div>
                <br />
                <div>
                  <label className="pb-2">
                    Tình trạng <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="border border-slate-500 p-2 rounded-md ml-2"
                    onChange={(e) => setStatus(e.target.value)}
                    name="status"
                    id="status"
                  >
                    <option value={status}>---- chọn ----</option>
                    <option value="đang hợp tác">đang hợp tác</option>
                    <option value="hết hợp đồng">hết hợp đồng</option>
                  </select>
                </div>

                <br />
                <div>
                  <input
                    type="submit"
                    value="Thêm nhà cung cấp"
                    className="mt-2 appearance-none block w-full px-3 h-[35px] bg-[#050505bd] text-[#fff] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </form>
            </div>
          </div>
        )}

        {count_nhacungcap > parPage && (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={count_nhacungcap}
              parPage={parPage}
              showItem={Math.floor(count_nhacungcap / parPage)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemNhaCungCap;
