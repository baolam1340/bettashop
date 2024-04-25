import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PropagateLoader } from "react-spinners";
import {
  get_product,
  messageClear,
  update_logproduct,
} from "../../store/Reducers/productReducer";
import { overrideStyle } from "../../utils/utils";
import toast from "react-hot-toast";

const LogProductDetail = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product, loader, successMessage, get_all_nhacungcap } = useSelector(
    (state) => state.product
  );
  const [fullname, setFullname] = useState("");
  const [stock, setStock] = useState();
  const [note, setNote] = useState("");
  const [price, setPrice] = useState(product?.price);
  const [nhacungcap, setNhacungcap] = useState();

  useEffect(() => {
    dispatch(get_product(productId));
  }, [dispatch, productId]);

  const update = (e) => {
    e.preventDefault();
    const obj = {
      fullname: fullname,
      stock: stock,
      price: price,
      note: note,
      productId: product._id,
      ten_nhacungcap: nhacungcap,
    };
    dispatch(update_logproduct(obj));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [dispatch, successMessage]);

  const rollback = () => {
    navigate(-1);
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
        <div className="flex justify-between items-center pb-4 pt-2">
          <h1 className="text-[#d0d2d6] text-xl font-semibold">
            Phiếu nhập hàng
          </h1>
        </div>
        <div>
          <form onSubmit={update}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">
                  Người lập phiếu<span className="text-red-500">*</span>
                </label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={(e) => setFullname(e.target.value)}
                  value={fullname}
                  type="text"
                  placeholder="tên"
                  name="name"
                  id="name"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="stock">
                  Thêm số lượng hàng<span className="text-red-500">*</span>
                </label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={(e) => setStock(e.target.value)}
                  value={stock}
                  type="number"
                  min="0"
                  placeholder="thêm hàng"
                  name="stock"
                  id="stock"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">
                  Thay đổi giá bán<span className="text-red-500">*</span>
                </label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  type="text"
                  placeholder="giá"
                  name="price"
                  id="price"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="stock">
                  Ghi chú<span className="text-red-500">*</span>
                </label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={(e) => setNote(e.target.value)}
                  value={note}
                  type="text"
                  placeholder="thêm ghi chú"
                  name="note"
                  id="note"
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1 mb-4 text-white">
              <label htmlFor="stock">
                chọn nhà cung cấp<span className="text-red-500">*</span>
              </label>
              <select
                className="border text-black border-slate-500 p-2 rounded-md ml-2"
                onChange={(e) => setNhacungcap(e.target.value)}
                name="status"
                id="status"
              >
                <option value="">--- chọn nhà cung cấp ---</option>
                {get_all_nhacungcap &&
                  get_all_nhacungcap.map((u) => (
                    <option value={nhacungcap}>{u.name}</option>
                  ))}
              </select>
            </div>
            <div className="flex">
              <button
                disabled={loader ? true : false}
                className="bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              >
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  "Lập phiếu"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogProductDetail;
