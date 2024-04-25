import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product, loader, successMessage } = useSelector(
    (state) => state.product
  );
  const [fullname, setFullname] = useState("");
  const [stock, setStock] = useState();
  const [note, setNote] = useState("");
  const [price, setPrice] = useState();

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
    };
    dispatch(update_logproduct(obj));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [dispatch, successMessage]);

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] text-xl font-semibold">Phiếu nhập hàng</h1>
        </div>
        <div>
          <form onSubmit={update}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">Người lập phiếu</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={(e) => setFullname(e.target.value)}
                  value={fullname}
                  type="text"
                  placeholder="name"
                  name="name"
                  id="name"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="stock">Thêm số lượng hàng</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={(e) => setStock(e.target.value)}
                  value={stock}
                  type="number"
                  min="0"
                  placeholder="Add to stock"
                  name="stock"
                  id="stock"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">Thay đổi giá bán</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  type="number"
                  placeholder="price"
                  name="price"
                  id="price"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="stock">Ghi chú</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={(e) => setNote(e.target.value)}
                  value={note}
                  type="text"
                  placeholder="Note to text"
                  name="note"
                  id="note"
                />
              </div>
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
