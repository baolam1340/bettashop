import React, { useEffect } from "react";
import { get_detail_review_order } from "../../store/Reducers/OrderReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ReviewOrderDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { order_review_detail } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(get_detail_review_order(orderId));
  }, [dispatch, orderId]);

  const rollback = () => {
    navigate(-1);
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <div onClick={rollback} className="text-white cursor-pointer uppercase">
          <p className="p-2 pb-2 border w-[100px] text-center rounded-md border-slate-500 hover:bg-green-400 hover:text-slate-600 transition-all duration-300">
            Quay Lại
          </p>
        </div>
        <div className="flex justify-between items-center p-4 flex-col text-white">
          <h1>Hình ảnh</h1>
          {order_review_detail.images &&
            order_review_detail?.images.map((u, i) => (
              <div key={i}>
                <div>
                  <img className="w-[500px] h-[500px]" src={u} alt="" />
                </div>
              </div>
            ))}
          <h1 className="mt-[50px]">video review</h1>
          {order_review_detail.videos &&
            order_review_detail?.videos.map((u, i) => (
              <div className="w-[500px] h-[500px] " key={i}>
                <video src={u} controls></video>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewOrderDetail;
