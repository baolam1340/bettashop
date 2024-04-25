/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { useSelector, useDispatch } from "react-redux";
import { get_products } from "../../store/Reducers/productReducer";
import { FaWarehouse, FaEye } from "react-icons/fa";
import { Tooltip } from "antd";

const LogProduct = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  const { products, totalProduct } = useSelector((state) => state.product);
  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_products(obj));
  }, [searchValue, currentPage, parPage]);

  console.log(currentPage);

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
        <div className="relative overflow-x-auto mt-5">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  tt
                </th>
                <th scope="col" className="py-3 px-4">
                  hình ảnh
                </th>
                <th scope="col" className="py-3 px-4">
                  tên
                </th>
                <th scope="col" className="py-3 px-4">
                  giá
                </th>
                <th scope="col" className="py-3 px-4">
                  số lượng
                </th>
                <th scope="col" className="py-3 px-4">
                  hoạt động
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((d, i) => (
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
                      src={d.images[0]}
                      alt=""
                    />
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
                    <span>
                      {d.price.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}{" "}
                    </span>
                  </th>
                  <th
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{d.stock}</span>
                  </th>
                  <th
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex justify-start items-center gap-4">
                      <Tooltip title="Nhập Hàng">
                        <Link
                          to={`/admin/dashboard/log-product-detail/${d._id}`}
                          className="p-[10px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                        >
                          <FaWarehouse />
                        </Link>
                      </Tooltip>
                      <Tooltip title="Xem Chi Tiết Phiếu Nhập">
                        <Link
                          to={`/admin/dashboard/log-product-see-detail/${d._id}`}
                          className="p-[10px] bg-yellow-300 text-white rounded hover:shadow-lg hover:shadow-yellow-500/50"
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
        {totalProduct > parPage && (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalProduct}
              parPage={parPage}
              showItem={Math.floor(totalProduct / parPage)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LogProduct;
