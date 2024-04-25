import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get_logproduct,
  get_product,
} from "../../store/Reducers/productReducer";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../Pagination";
import Search from "../components/Search";

const LogProductSeeDetail = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { logProduct, totallogProduct } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(get_product(productId));
    dispatch(
      get_logproduct({
        parPage: parseInt(parPage),
        page: parseInt(currentPage),
        searchValue,
        productId,
      })
    );
  }, [currentPage, dispatch, parPage, productId, searchValue]);

  const rollback = () => {
    navigate(-1);
  };

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-[#283046] rounded-md ">
        <div onClick={rollback} className="text-white cursor-pointer uppercase">
          <p className="p-2 pb-2 border w-[100px] text-center rounded-md border-slate-500 hover:bg-green-400 hover:text-slate-600 transition-all duration-300">
            Quay Lại
          </p>
        </div>
        <div className="pt-2">
          <Search
            setParPage={setParPage}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
          />
        </div>
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] font-semibold text-2xl">
            Chi tiết phiếu nhập hàng
          </h1>
        </div>
        {totallogProduct ? (
          logProduct.map((u, i) => (
            <div key={i} className="flex flex-col w-full gap-1">
              <div className="text-white">-------------------------</div>

              <div className="text-white">
                <p>id phiếu: {u._id}</p>
              </div>
              <div className="text-white">
                <p>nhà cung cấp: {u.ten_nhacungcap}</p>
              </div>
              <div className="text-white">
                <p>Tên người lập phiếu: {u.fullname}</p>
              </div>
              <div className="text-white">
                <p>số lượng khi nhập: {u.stock}</p>
              </div>
              <div className="text-white">
                <p>
                  giá:{" "}
                  {u.price.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
              <div className="text-white">
                <p>ghi chú: {u.note}</p>
              </div>
              <div className="text-white">
                <p>ngày lập: {u.date}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-between items-center text-2xl text-red-500">
            <p>Chưa có ai lập phiếu! </p>
          </div>
        )}

        {totallogProduct > parPage ? (
          ""
        ) : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totallogProduct}
              parPage={parPage}
              showItem={Math.floor(totallogProduct / parPage)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LogProductSeeDetail;
