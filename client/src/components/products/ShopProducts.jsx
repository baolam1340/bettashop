import React, { useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import Ratings from "../Ratings";
import { useDispatch, useSelector } from "react-redux";
import {
  add_to_wishlist,
  messageClear,
} from "../../store/reducers/cardReducer";
import toast from "react-hot-toast";
import { EyeOutlined, HeartOutlined } from "@ant-design/icons";

const ShopProducts = ({ styles, products }) => {
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
  };

  return (
    <div
      className={`container grid  ${
        styles === "grid"
          ? "grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2"
          : "grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2"
      } gap-3`}
    >
      {/**sap xep*/}
      {products.map((u, i) => (
        <div
          key={i}
          className={`flex transition-all  duration-1000 hover:shadow-md hover:-translate-y-2  ${
            styles === "grid"
              ? "flex-col justify-center items-center"
              : "justify-start items-center  md-lg:flex-col md-lg:justify-start md-lg:items-start"
          } w-full gap-4 bg-light border p-2 rounded text-center `}
        >
          <div
            className={
              styles === "grid"
                ? "w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden"
                : "md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden"
            }
          >
            <Link to={`/product/details/${u.slug}`}>
              <img
                className="col-md-9 mt-2 ml-8 rounded  justify-content-center object-contain cursor-pointer"
                src={u.images[0]}
                alt="img"
              />
            </Link>
            <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
              <li
                onClick={() => add_wishlist(u)}
                className="w-[45px] h-[45px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <HeartOutlined className="text-danger" />
              </li>
              <Link
                to={`/product/details/${u.slug}`}
                target="_blank"
                className="w-[45px] h-[45px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <EyeOutlined className="text-warning" />
              </Link>
              {/* <li
                onClick={() => add_card(u._id)}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <AiOutlineShoppingCart />
              </li> */}
            </ul>
          </div>
          <div className="flex justify-start items-start flex-col gap-1 row">
            <div className="row">
              <h6 className="text-md text-slate-700 font-medium">
                <b>{u.name}</b>
              </h6>
            </div>
            <div className="flex justify-center items-center row gap-2">
              <span className="text-lg  font-bold text-slate-700 ml-6">
                {u.price.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
            <div className="flex text-lg items-center justify-center ">
              {<Ratings ratings={u.rating} />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopProducts;
