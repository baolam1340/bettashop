/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import {
  AiFillGithub,
  AiFillHeart,
  AiFillShopping,
  AiOutlineTwitter,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  get_card_products,
  get_wishlist_products,
} from "../store/reducers/cardReducer";
import {
  MailOutlined,
  PhoneOutlined,
  SendOutlined,
  ShakeOutlined,
} from "@ant-design/icons";
const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { card_product_count, wishlist_count } = useSelector(
    (state) => state.card
  );
  useEffect(() => {
    if (userInfo) {
      dispatch(get_card_products(userInfo.id));
      dispatch(get_wishlist_products(userInfo.id));
    }
  }, [dispatch, userInfo]);
  return (
    <footer className="bg-[#F3F6Fa] row rounded mt-5">
      <div className="col-md-4 mt-5 ">
        <img className="" src="/images/bettashop.png" alt="logo" />
      </div>
      <div className="col-md-4 mt-5  ">
        <div className="row">
          <p>
            Betta shop - Chuyên cung cấp các loại betta: galaxy, nemo, Koi,
            fancy, halfmoon, vv…
            <b className="text-danger h6 col">
              Nhận vận chuyển nhanh nội thành Cần Thơ trong vòng 1-2 tiếng.
            </b>
          </p>
        </div>
        <div className="row">
          <p>
            Shop nhỏ, không có chổ show cá cho khách xem! Bạn thông cảm đặt hàng
            online nhé!
          </p>
        </div>
        <div className="row">
          <p>
            Bạn có thể xem mẫu trên web rồi đến hẻm liên tổ 12-20 Nguyễn Văn Cừ,
            Phường An Khánh, Q. Ninh Kiều nhận cá để khỏi tốn phí ship nha.
          </p>
        </div>
      </div>
      <div className="col-md-4 mt-5">
        <ul className="flex flex-col gap-2 text-slate-600 ">
          <li>
            <SendOutlined /> hẻm liên tổ 12-20 Nguyễn Văn Cừ, Phường An Khánh,
            Q. Ninh Kiều
          </li>
          <li>
            <PhoneOutlined /> 0123456789
          </li>
          <li>
            <MailOutlined /> : B1910343@student.ctu.edu.com
          </li>
          <li>
            <span>
              Copyright ©2024 All rights reserved | made by{" "}
              <a className="text-blue-500 underline" href="">
                @Bao
              </a>
            </span>
          </li>
        </ul>
      </div>

      <div className="hidden fixed md-lg:block w-[50px] bottom-14 h-[110px] right-2 bg-white rounded-full p-2">
        <div className="w-full h-full flex gap-2 flex-col justify-center items-center">
          <div
            onClick={() => navigate(userInfo ? "/cart" : "/login")}
            className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
          >
            <span className="text-xl text-orange-500">
              <AiFillShopping />
            </span>
            {card_product_count !== 0 && (
              <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px] text-[12px]">
                {card_product_count}
              </div>
            )}
          </div>
          <div
            onClick={() =>
              navigate(userInfo ? "/dashboard/my-wishlist" : "/login")
            }
            className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
          >
            <Link to="/dashboard/my-wishlist">
              <span className="text-xl text-red-500">
                <AiFillHeart />
              </span>
            </Link>
            {wishlist_count !== 0 && (
              <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                {wishlist_count}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
