import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { get_risk_management } from "../../store/Reducers/productReducer";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
const DetailRuiRo = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { risk } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(get_risk_management(productId));
  }, [productId, dispatch]);
  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-[#283046] rounded-md ">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] font-semibold text-2xl">
            Chi Tiết Rủi Ro
          </h1>
        </div>
        {risk.map((u, i) => (
          <div key={i} className="flex flex-col w-full gap-1">
            <div className="text-white">-------------------------</div>

            <div className="text-white">
              <p>id phiếu: {u._id.substring(0, 10).toUpperCase()}</p>
            </div>
            <div className="text-white">
              <p>Nguyên Nhân Chết: {u.reason}</p>
            </div>
            <div className="text-white">
              <p>Số Lượng Cá Chết: {u.quantity}</p>
            </div>
            <div className="text-white">
              <p>Ngày Chết: {moment(u.updatedAt).format("LLL")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailRuiRo;
