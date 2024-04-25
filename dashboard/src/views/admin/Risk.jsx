import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get_product,
  risk_management,
  messageClear,
} from "../../store/Reducers/productReducer";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function Risk() {
  const dispatch = useDispatch();
  const { product, successMessage, errorMessage } = useSelector(
    (state) => state.product
  );
  const { productId } = useParams();
  const [reason, setReason] = useState("");

  const text_reason = (e) => {
    setReason(e.target.value);
  };

  useEffect(() => {
    dispatch(get_product(productId));
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [productId, dispatch, successMessage, product.stock]);

  const [quantity, setQuantity] = useState(1);

  const inc = () => {
    if (quantity >= product.stock) {
      toast.error("Số lượng không thể vượt quá kho!");
    } else {
      setQuantity(quantity + 1);
    }
  };

  const dec = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (
      !isNaN(newQuantity) &&
      newQuantity >= 1 &&
      product &&
      product.stock &&
      newQuantity <= product.stock
    ) {
      setQuantity(newQuantity);
    } else if (newQuantity >= product.stock) {
      setQuantity(product.stock);
    } else {
      setQuantity(1);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const obj = {
      productId,
      reason: reason,
      quantity: quantity,
    };
    dispatch(risk_management(obj));
    if (product.stock === 0) {
      toast.error("Số Lượng Đã Hết!!!");
    }
  };

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <form onSubmit={submit}>
        <div className="w-full p-4  bg-dark rounded-md">
          <div className="flex justify-between items-center pb-4">
            <h1 className="text-[#d0d2d6] text-[26px] font-semibold">
              Quản Lý Rủi Ro
            </h1>
          </div>
          <div className="flex">
            <img
              className="w-[300px] h-[300px]"
              src={product && product?.images[0]}
              alt="images"
            />
            <div className="pl-6 text-[20px]">
              <p className="text-white">Tên: {product && product.name}</p>
              <p className="text-white">Giống: {product && product.sex}</p>
              <p className="text-white">Màu Sắc: {product && product.color}</p>
              <p className="text-white">
                Số Lượng Có Sẵn: ({product && product.stock})
              </p>

              <div>
                <p className="text-white">Nhập nguyên nhân rủi ro (sự cố):</p>
                <textarea
                  className="text-left break-words overflow-auto rounded-md border-2 border-blue-500 hover:border-[#fff] w-[450px] h-[150px]"
                  type="text"
                  placeholder="lý do... (giới hạn 250 ký tự)"
                  maxLength="250"
                  name="reason"
                  value={reason}
                  onChange={text_reason}
                  required
                />
              </div>

              <p className="text-white">Chọn Số Lượng: </p>
              {product.stock && (
                <div className="row">
                  <div className="flex mt-2 col-md-3 gap-3 ml-5 rounded justify-center items-center text-xl">
                    <div
                      onClick={() => dec()}
                      className="col-md-4 btn btn-success text-white  cursor-pointer"
                    >
                      -
                    </div>
                    <input
                      type="text"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className=" col-md-4 text-center"
                    />

                    <div
                      onClick={() => inc()}
                      className="col-md-4 btn btn-success text-white  cursor-pointer"
                    >
                      +
                    </div>
                  </div>
                </div>
              )}
              <div className="text-danger">
                Lưu ý: sau khi nhấn lưu thì không thể thay đổi{" "}
              </div>
              <button
                className="px-9 py-2 bg-blue-400 rounded-md text-white mt-3 ml-5 hover:bg-blue-500 hover:text-[#111]"
                type="submit"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Risk;
