/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import Ratings from "../Ratings";
import { useDispatch, useSelector } from "react-redux";
import {
  add_to_wishlist,
  messageClear,
} from "../../store/reducers/cardReducer";
import toast from "react-hot-toast";

const FeatureProducts = ({ products }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { successMessage, errorMessage } = useSelector((state) => state.card);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [dispatch, errorMessage, successMessage]);

  const add_wishlist = (pro) => {
    if (userInfo) {
      dispatch(
        add_to_wishlist({
          userId: userInfo.id,
          productId: pro._id,
          name: pro.name,
          price: pro.price,
          image: pro.images[0],
          discount: pro.discount,
          rating: pro.rating,
          slug: pro.slug,
        })
      );
    } else {
      toast.error("Cần đăng nhập để thêm vào yêu thích!!");
    }
  };

  return (
    <div className="w-[85%] flex flex-wrap mx-auto ">
      <div className="w-full ">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
          <h2>Sản Phẩm Mới Nhất</h2>
          <div className="w-[100px] h-[4px] bg-success mt-4"></div>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 bg-light border rounded  p-2">
        {products.map((c, i) => (
          <div
            key={i}
            className="border rounded bg-secondary group transition-all duration-500 hover:shadow-md hover:-mt-3"
          >
            <div className="relative overflow-hidden">
              {c.discount ? (
                <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                  {c.discount}%
                </div>
              ) : (
                ""
              )}
              <Link to={`/product/details/${c.slug}`}>
                <img
                  key={i}
                  className="sm:w-full w-full h-[240px]"
                  src={c.images[0]}
                  alt="product image"
                />
              </Link>
              <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
                <li
                  onClick={() => add_wishlist(c)}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
                >
                  <AiFillHeart />
                </li>
                <Link
                  to={`/product/details/${c.slug}`}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
                >
                  <FaEye />
                </Link>
                {/* <li
                  onClick={() => add_card(c._id)}
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
                >
                  <AiOutlineShoppingCart />
                </li> */}
              </ul>
            </div>
            <div className="py-3 text-white px-2">
              <h5>{c.name}</h5>
              <div className="flex justify-start items-center gap-3">
                <span className="text-lg  font-bold">
                  {c.price.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
                <div className="flex">{<Ratings ratings={c.rating} />}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProducts;
