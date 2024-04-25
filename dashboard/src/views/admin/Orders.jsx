/* eslint-disable jsx-a11y/scope */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import Search from "../components/Search";
import { useSelector, useDispatch } from "react-redux";
import { get_seller_orders } from "../../store/Reducers/OrderReducer";
import { Tooltip } from "antd";
import { MdRateReview } from "react-icons/md";
import { RiProductHuntFill } from "react-icons/ri";
const Orders = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const { myOrders, totalOrder } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(
      get_seller_orders({
        parPage: parseInt(parPage),
        page: parseInt(currentPage),
        searchValue,
        sellerId: userInfo._id,
      })
      // get_admin_orders({
      //   sellerId: userInfo._id,
      //   parPage: parseInt(parPage),
      //   page: parseInt(currentPage),
      //   searchValue,
      // })
    );
  }, [parPage, currentPage, searchValue]);

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-3  bg-dark border rounded-md ">
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
        <div className="row ">
          <div className="text-white col-md-3 text-start pl-2 mb-3"></div>
          <div className="text-white col-md-3 text-start pl-2 mb-3">
            <Link
              to="/admin/dashboard/all-review-product"
              className="p-2 text-end bg-warning mt-4 rounded-md hover:bg-pink-300 hover:text-black"
            >
              <button className="p-2 mt-4 text-dark h6">
                Xem Đánh Giá Sản Phẩm
              </button>
            </Link>
          </div>
          {/**   <div className="text-white col-md-3 text-start pl-2 mb-3">
            <Link
              to="/admin/dashboard/all-review-order"
              className="p-2 text-end bg-warning mt-4 rounded-md hover:bg-yellow-300 hover:text-black"
            >
              <button className="p-2 mt-4 text-dark h6">
                Xem Đánh Giá Đơn Hàng
              </button>
            </Link>
          </div>*/}
        </div>
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
              {myOrders.map((d, i) => (
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
                    <div className="flex justify-start items-center gap-4">
                      <Tooltip title="Xem Chi Tiết Đơn Hàng">
                        <Link
                          to={`/admin/dashboard/order/details/${d._id}`}
                          className="p-[6px] w-[30px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 flex justify-center items-center"
                        >
                          <FaEye />
                        </Link>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalOrder <= parPage ? (
          ""
        ) : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalOrder}
              parPage={parPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
