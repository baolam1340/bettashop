/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { FaEdit, FaEye, FaTrash, FaWarehouse } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { useSelector, useDispatch } from "react-redux";
import {
  get_products,
  delete_product,
  messageClear,
} from "../../store/Reducers/productReducer";
import toast from "react-hot-toast";
import { Tooltip } from "antd";
import { RxCross1 } from "react-icons/rx";
import { CgDanger } from "react-icons/cg";

const Products = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  const { products, totalProduct, successMessage } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_products(obj));
  }, [searchValue, currentPage, parPage]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage]);

  const deleteProduct = (id) => {
    dispatch(delete_product(id));
    window.location.reload();
  };

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center">
          {" "}
          <div className="p-4 w-[400px] h-[230px] bg-white rounded shadow relative">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen("")}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Bạn Chắc Chắn Muốn Xóa Sản Phẩm Này?
            </h1>
            <div className="p-[100px] flex justify-between items-center pt-4">
              <button
                onClick={() => setOpen("")}
                className="flex border p-2 bg-red-500 rounded-md text-white"
              >
                Không
              </button>
              <button
                onClick={() => deleteProduct(open)}
                className="flex border p-2 bg-green-500 rounded-md text-white"
              >
                Có
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full p-4  bg-dark border rounded-md">
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
        <div className="text-white text-end">
          <Link
            to="/admin/dashboard/add-product"
            className="p-2 text-end bg-green-500 mt-4 rounded-md hover:bg-green-300 hover:text-black"
          >
            <button className="p-2 mt-4">Thêm sản phẩm</button>
          </Link>
        </div>
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
                  Danh Mục
                </th>

                <th scope="col" className="py-3 px-4">
                  Giá
                </th>
                <th scope="col" className="py-3 px-4">
                  Giảm Giá
                </th>
                <th scope="col" className="py-3 px-4">
                  SL
                </th>
                <th scope="col" className="py-3 px-4"></th>
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
                      {d.price.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </th>
                  <th
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {d.discount === 0 ? (
                      <span>Không giảm giá</span>
                    ) : (
                      <span>{d.discount}%</span>
                    )}
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
                      <Tooltip title="Chỉnh Sửa Sản Phẩm">
                        <Link
                          to={`/admin/dashboard/edit-product/${d._id}`}
                          className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50"
                        >
                          <FaEdit />
                        </Link>
                      </Tooltip>
                      <Tooltip title="Xóa Sản Phẩm">
                        <button
                          onClick={() => setOpen(d._id)}
                          className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50"
                        >
                          <FaTrash />
                        </button>
                      </Tooltip>
                      <Tooltip title="Quản Lý Rủi Ro">
                        <Link
                          to={`/admin/dashboard/risk-management-product/${d._id}`}
                          className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50"
                        >
                          <CgDanger />
                        </Link>
                      </Tooltip>
                    </div>
                  </th>
                </tr>
              ))}
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

export default Products;
