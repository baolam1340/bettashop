/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Headers from "../components/Headers";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  get_card_products,
  delete_card_product,
  messageClear,
  quantity_inc,
  quantity_dec,
} from "../store/reducers/cardReducer";
import toast from "react-hot-toast";
import { Tooltip } from "antd";
import { FaQuestionCircle } from "react-icons/fa";
import { ShoppingOutlined } from "@ant-design/icons";

const Cart = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 200,
      left: 400,
      behavior: "smooth",
    });
  }, [location]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    card_products,
    successMessage,
    card_product_count,
    shipping_fee,
    buy_product_item,
    outofstock_products,
    price,
    size,
  } = useSelector((state) => state.card);

  const redirect = () => {
    navigate("/shipping", {
      state: {
        products: card_products,
        price: price,
        shipping_fee: shipping_fee,
        items: buy_product_item,
      },
    });
  };

  useEffect(() => {
    dispatch(get_card_products(userInfo.id));
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      dispatch(get_card_products(userInfo.id));
    }
  }, [successMessage]);

  const inc = (quantity, stock, card_id) => {
    const temp = quantity + 1;
    if (temp <= stock) {
      dispatch(quantity_inc(card_id));
    } else {
      toast.error("Số lượng không thể vượt quá kho!!");
      dispatch(messageClear());
    }
  };

  const dec = (quantity, card_id) => {
    const temp = quantity - 1;
    if (temp !== 0) {
      dispatch(quantity_dec(card_id));
    } else {
      dispatch(delete_card_product(card_id));
    }
  };

  return (
    <div className="container">
      <Headers />
      <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
        <h2>Giỏ Hàng</h2>
        <div className="w-[100px] h-[4px] bg-success mt-4"></div>
      </div>
      <section className="row">
        <div className="row  py-16 ">
          {card_products.length > 0 || outofstock_products.length > 0 ? (
            <div className="flex flex-wrap justify-content-center">
              {/** 8 phần đầu */}
              <div className="col-md-8 ">
                <div className=" md-lg:pr-0">
                  <div className="flex flex-col gap-3 ">
                    <div className="row bg-light border rounded-start p-3 text-danger h6">
                      <b>
                        Ngoại thành Cần Thơ chỉ nhận chuyển khoản trước, mong
                        quý khách thông cảm!
                      </b>
                    </div>
                    <div className="row bg-light border rounded-start ">
                      {/** Số lượng sản phẩm */}
                      <div className=" p-3 row mb-2">
                        <div className="  h4 text-secondary">
                          <b> Số lượng sản phẩm</b> <ShoppingOutlined /> :
                          {card_product_count}
                        </div>
                      </div>
                      {/** thông tin sản phâm: số lượng, giá,  ảnh, xóa */}
                      <div className="row ">
                        {card_products.map((p, i) => (
                          <div key={i} className="flex  flex-col gap-2 ">
                            {p.products.map((pt, i) => (
                              <div
                                key={i}
                                className=" flex flex-wrap  justify-content-between m-2"
                              >
                                {/** ảnh và thông tin cá 7 phần */}
                                <div className="flex sm:w-full gap-2 col-md-8 ">
                                  <div className="flex gap-2 justify-start items-start row">
                                    <div className="col-md-4">
                                      <Link
                                        to={`/product/details/${pt.productInfo.slug}`}
                                      >
                                        {/** ảnh trong cart trong giỏ hàng thanh toán */}
                                        <img
                                          className="img-fluid  mb-3 ml-2"
                                          src={pt.productInfo.images[0]}
                                          alt="product_image"
                                        />
                                      </Link>
                                    </div>
                                    <div className="col-md-7 text-slate-600">
                                      {/** tên cá */}
                                      <h4 className="ml-2 ">
                                        {pt.productInfo.name}
                                      </h4>
                                      <span className="text-sm ml-2">
                                        Thương hiệu : {pt.productInfo.brand}
                                      </span>
                                      {/** Màu sắc */}
                                      <h5 className="ml-2">
                                        Màu sắc:{" "}
                                        {pt.productInfo?.color &&
                                          pt.productInfo?.color}
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                                {/** giá tiền / số lượng / xóa */}
                                <div className="flex justify-between col-md-4  sm:w-full sm:mt-3 ">
                                  <div>
                                    <div className=" sm:pl-0">
                                      <h2 className="text-lg text-success">
                                        {(
                                          pt.productInfo.price -
                                          Math.floor(
                                            pt.productInfo.price *
                                              pt.productInfo.discount
                                          ) /
                                            100
                                        ).toLocaleString("vi", {
                                          style: "currency",
                                          currency: "VND",
                                        })}
                                      </h2>
                                      <p className="line-through">
                                        {pt.productInfo.price.toLocaleString(
                                          "vi",
                                          {
                                            style: "currency",
                                            currency: "VND",
                                          }
                                        )}
                                      </p>
                                      <p>-{pt.productInfo.discount}%</p>
                                    </div>
                                    <div className="flex gap-2 flex-col">
                                      {/** + - sản phẩm */}
                                      <div className="flex bg-secondary rounded text-white h-[30px] justify-center items-center text-xl">
                                        <div
                                          onClick={() =>
                                            dec(pt.quantity, pt._id)
                                          }
                                          className="px-3 cursor-pointer"
                                        >
                                          -
                                        </div>
                                        <div className="px-3">
                                          {pt.quantity}
                                        </div>
                                        <div
                                          onClick={() =>
                                            inc(
                                              pt.quantity,
                                              pt.productInfo.stock,
                                              pt._id
                                            )
                                          }
                                          className="px-3 cursor-pointer"
                                        >
                                          +
                                        </div>
                                      </div>
                                      {/** xóa */}
                                      <button
                                        onClick={() =>
                                          dispatch(delete_card_product(pt._id))
                                        }
                                        className="px-5 py-[3px]   btn btn-danger text-white"
                                      >
                                        Xóa
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-[200px] h-[4px] bg-success mt-4"></div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>

                      <div>
                        {outofstock_products.length > 0 && (
                          <div className="flex flex-col gap-3">
                            <div className=" p-4">
                              <h2 className="text-md text-red-500 font-semibold">
                                Hết Hàng {outofstock_products.length}
                              </h2>
                            </div>
                            <div className=" p-4">
                              {outofstock_products.map((p, i) => (
                                <div key={i} className="w-full flex flex-wrap">
                                  <div className="flex sm:w-full gap-2 w-7/12">
                                    <div className="flex gap-2 justify-start items-center">
                                      <img
                                        className="w-[80px] h-[80px]"
                                        src={p.products[0].images[0]}
                                        alt="product_image"
                                      />
                                      <div className="pr-4 text-slate-600">
                                        <h2 className="text-md">
                                          {p.products[0].name}
                                        </h2>
                                        <span className="text-sm">
                                          Thương hiệu : {p.products[0].brand}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                                    <div className="pl-4 sm:pl-0">
                                      <h2 className="text-lg text-orange-500">
                                        {(
                                          p.products[0].price -
                                          Math.floor(
                                            (p.products[0].price *
                                              p.products[0].discount) /
                                              100
                                          )
                                        ).toLocaleString("vi", {
                                          style: "currency",
                                          currency: "VND",
                                        })}
                                      </h2>
                                      <p className="line-through">
                                        {p.products[0].price.toLocaleString(
                                          "vi",
                                          {
                                            style: "currency",
                                            currency: "VND",
                                          }
                                        )}
                                      </p>
                                      <p>-{p.products[0].discount}%</p>
                                    </div>
                                    <div className="flex gap-2 flex-col">
                                      <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                        <div
                                          onClick={() => dec(p.quantity, p._id)}
                                          className="px-3 cursor-pointer"
                                        >
                                          -
                                        </div>
                                        <div className="px-3">{p.quantity}</div>
                                        <div
                                          onClick={() =>
                                            dec(
                                              p.quantity,
                                              p.products[0].stock,
                                              p._id
                                            )
                                          }
                                          className="px-3 cursor-pointer"
                                        >
                                          +
                                        </div>
                                      </div>
                                      <button
                                        onClick={() =>
                                          dispatch(delete_card_product(p._id))
                                        }
                                        className="px-5 py-[3px] bg-red-500 text-white"
                                      >
                                        Xóa
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/**4 phần sau tổng tiền*/}
              <div className="col-md-3 bg-light border rounded-end  ml-5 ">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  {card_products.length > 0 && (
                    <div className="bg-light p-3 text-slate-600 flex flex-col gap-3">
                      <h2 className="text-xl font-bold text-secondary">
                        TỔNG SỐ TIỀN
                      </h2>
                      <div className="flex justify-between  items-center">
                        <span>{buy_product_item} SẢN PHẨM</span>
                        <span>
                          {price.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between  items-center">
                        <span>PHÍ VẬN CHUYỂN</span>
                        <span className="flex flex-row">
                          {shipping_fee.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                          <b className="pt-1 pl-1">
                            <Tooltip title="Tổng số tiền trong giỏ hàng > 200.000đ sẽ miễn phí vận chuyển, nếu không thì mặc định phí vận chuyển 30.000đ">
                              <FaQuestionCircle />
                            </Tooltip>
                          </b>
                        </span>
                      </div>
                      <div className="flex gap-2 border-t-2 border-slate-500">
                        {/* <input
                          className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500"
                          type="text"
                          placeholder="nhập voucher của bạn"
                        />
                        <button className="px-4 py-[1px]  bg-blue-500 text-white rounded-sm uppercase text-sm">
                          apply
                        </button> */}
                      </div>
                      {/** tổng tiền + ship */}
                      <div className="flex justify-between  items-center">
                        <span>TỔNG</span>
                        <span className="text-lg text-success">
                          {(price + shipping_fee).toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                      </div>
                      <button
                        onClick={redirect}
                        className="px-5 py-[6px] rounded hover:shadow-orange-500/20 hover:shadow-lg bg-success text-sm text-white uppercase"
                      >
                        tiến hành thanh toán {buy_product_item} sản phẩm
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link to="/shops" className=" btn btn-primary ">
                Mua Sắm Ngay
              </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Cart;
