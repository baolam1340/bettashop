import React, { useEffect, useState } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { get_products } from "../../store/Reducers/productReducer";
import { Pagination, Tooltip } from "antd";

import Search from "../components/Search";

import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
const ThongKeRuiRo = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const { products, totalProduct, tong_thiethai } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_products(obj));
  }, [searchValue, currentPage, parPage, dispatch]);

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-dark border rounded-md">
        <div className="row items-center  p-3 bg-secondary rounded border m-2 ">
          <div className="col-md-7  flex flex-col justify-start items-start text-white">
            <span className="text-[20px] font-medium">Tổng Thiệt Hại</span>
            <span>
              {tong_thiethai.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>

          <div className="col-md-3 h2 p-2 col-md-3 rounded-full bg-warning flex justify-center items-center text-xl">
            <BsCurrencyDollar className="text-dark " />
          </div>
        </div>
      </div>
      <div className="w-full p-4  bg-dark border mt-2 rounded-md">
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />

        <div className="overflow-x-auto mt-5">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  TT
                </th>
                <th scope="col" className="py-3 px-4">
                  Hình Ảnh
                </th>
                <th scope="col" className="py-3 px-4">
                  Tên
                </th>
                <th scope="col" className="py-3 px-4">
                  Danh mục
                </th>
                <th scope="col" className="py-3 px-4">
                  Thiệt Hại
                </th>
                <th scope="col" className="py-3 px-4">
                  Số Lượng Thiệt Hại
                </th>
                <th scope="col" className="py-3 px-4">
                  Xem Nguyên Nhân Chết
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map(
                (d, i) =>
                  d.thiethai > 0 && (
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
                        <span>
                          <Tooltip title={d.name}>
                            {d?.name?.slice(0, 16)}...
                          </Tooltip>
                        </span>
                      </th>
                      <th
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <span>{d.category}</span>
                      </th>
                      <th
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <span>
                          {d.thiethai.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                      </th>
                      <th
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap text-center"
                      >
                        <span>{d.soluong_thiethai}</span>
                      </th>
                      <th
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap text-center"
                      >
                        <Tooltip title="Xem Chi Tiết Nguyên Nhân Rủi Ro">
                          <Link
                            to={`/admin/dashboard/ThongKeRuiRo/${d._id}`}
                            className="p-[6px] w-[30px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 flex justify-center items-center"
                          >
                            <FaEye />
                          </Link>
                        </Tooltip>
                      </th>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={totalProduct}
            parPage={parPage}
            showItem={4}
          />
        </div>
      </div>
    </div>
  );
};

export default ThongKeRuiRo;
