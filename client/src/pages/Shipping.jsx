/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  orderReducer,
  place_order,
  update_product,
} from "../store/reducers/orderReducer";
import { Country, State } from "country-state-city";
import api from "../api/api";
import toast from "react-hot-toast";
import { Tooltip } from "antd";
import { FaQuestionCircle } from "react-icons/fa";

const Shipping = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 400,
      left: 400,
      behavior: "smooth",
    });
  }, [location]);

  const [couponCode, setCouponCode] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    state: { products, price, shipping_fee, items },
  } = useLocation();
  const { card_products } = useSelector((state) => state.card);
  const [openVoucher, setOpenVoucher] = useState(false);

  const search_address_macdinh = userInfo.addresses?.filter(
    (item) => item.addressType === "Mặc định"
  );

  const [res, setRes] = useState(
    search_address_macdinh?.length && userInfo.phoneNumber ? true : false
  );

  const [country, setCountry] = useState("VN");
  const [city, setCity] = useState(
    search_address_macdinh?.length ? search_address_macdinh[0].city : ""
  );

  const [address1, setAddress1] = useState(
    search_address_macdinh?.length ? search_address_macdinh[0].address1 : ""
  );
  const [user, setUser] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [couponCodeData, setCouponCodeData] = useState(null);

  const save = (e) => {
    e.preventDefault();
    const data = {
      userId: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      address1: address1,
      city: city,
      country: country,
      phoneNumber: userInfo.phoneNumber,
    };
    if (data) {
      setRes(true);
    }
  };

  const subTotalPrice = price;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;
    await api.get(`/coupon/get-coupon-value/${name}`).then((res) => {
      const selectedProduct = res.data.couponCode?.selectedProduct;
      const couponCodeValue = res.data.couponCode?.value;
      const minAmount = res.data.couponCode?.minAmount;
      const maxAmount = res.data.couponCode?.maxAmount;

      if (res.data.couponCode !== null) {
        if (minAmount > subTotalPrice) {
          toast.error("Không đáp ứng điều kiện của voucher!");
          setCouponCode("");
        } else if (maxAmount < subTotalPrice) {
          const discountPrice = maxAmount;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setOpenVoucher(true);
        } else {
          const discountPrice = (subTotalPrice * couponCodeValue) / 100;

          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setOpenVoucher(true);
          // setCouponCode("");
        }
      }
      if (res.data.couponCode === null) {
        toast.error("Mã Voucher này không tồn tại!");
        setCouponCode("");
      }
    });
  };

  const discountPercentenge = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? subTotalPrice + shipping_fee - discountPercentenge
    : subTotalPrice + shipping_fee;

  const placeOrder = () => {
    const data = {
      userId: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      address1: address1,
      city: city,
      country: country,
      phoneNumber: userInfo.phoneNumber,
    };
    dispatch(
      place_order({
        price,
        products,
        shipping_fee: city === "Cần Thơ" ? 20000 : 30000,
        shippingInfo: data,
        userId: userInfo.id,
        discountPrice,
        couponCode,
        navigate,
        items,
      })
    );
  };

  return (
    <div className="container">
      <Headers />
      <div className=" text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
        <h2>Địa Chỉ Nhận Hàng</h2>
        <div className="w-[100px] h-[4px] bg-success mt-4"></div>
      </div>
      <section className="row">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 ">
          <div className="w-full flex flex-wrap ">
            <div className="col-md-8 md-lg:w-full">
              <div className="flex flex-col gap-3">
                {/**thong tin van chuyen */}
                <div className="bg-light border p-6 shadow-sm rounded-start">
                  <h2 className="text-slate-600 font-bold pb-3">
                    Thông tin vận chuyển
                  </h2>
                  {!res && (
                    <div className="w-full 800px:w-[95%] bg-white rounded border p-5 pb-8">
                      <h5 className="text-[18px] font-[500]">
                        Thông tin giao hàng
                      </h5>
                      <br />
                      <form onSubmit={save}>
                        <div className="w-full flex pb-3">
                          <div className="w-[50%]">
                            <label className="block pb-2">
                              Tên khách hàng:
                            </label>
                            <input
                              type="text"
                              value={userInfo && userInfo.name}
                              required
                              className={`border p-1 rounded-[5px] !w-[95%]`}
                            />
                          </div>
                          <div className="w-[50%]">
                            <label className="block pb-2">Email:</label>
                            <input
                              type="email"
                              value={userInfo && userInfo.email}
                              required
                              className={`w-full border p-1 rounded-[5px]`}
                            />
                          </div>
                        </div>

                        <div className="w-full flex pb-3">
                          <div className="w-[50%]">
                            <label className="block pb-2">
                              Số điện thoại: +(84)
                            </label>
                            <input
                              type="number"
                              required
                              value={userInfo && userInfo.phoneNumber}
                              className={`border p-1 rounded-[5px] !w-[95%]`}
                            />
                          </div>

                          <div className="w-[50%]">
                            <label className="block pb-2">
                              Tỉnh, thành phố:
                            </label>
                            <select
                              className="w-[95%] border h-[40px] rounded-[5px]"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              required
                            >
                              <option className="block pb-2" value="">
                                Chọn tỉnh, thành phố
                              </option>
                              {State &&
                                State.getStatesOfCountry(country).map(
                                  (item) => (
                                    <option key={item.name} value={item.name}>
                                      {item.name}
                                    </option>
                                  )
                                )}
                            </select>
                          </div>
                        </div>

                        <div className="w-full flex pb-3">
                          <div className="w-[50%]">
                            <label className="block pb-2">Khu vực:</label>
                            <select
                              className="w-[95%] border h-[40px] rounded-[5px]"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                            >
                              <option className="block pb-2" value="">
                                Chọn khu vực
                              </option>
                              {Country &&
                                Country.getAllCountries().map((item) => (
                                  <option
                                    key={item.isoCode}
                                    value={item.isoCode}
                                  >
                                    {item.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="w-full flex pb-3">
                          <div className="w-[50%]">
                            <label className="block pb-2">Địa chỉ:</label>
                            <input
                              type="address"
                              required
                              value={address1}
                              onChange={(e) => setAddress1(e.target.value)}
                              className={`border p-1 rounded-[5px] !w-[95%]`}
                            />
                          </div>
                        </div>
                        {/**Luu */}
                        <div className="flex  ">
                          <div className="">
                            <button className="btn btn-primary text-white">
                              Lưu
                            </button>
                          </div>
                        </div>
                      </form>
                      <h5
                        className="text-[18px] cursor-pointer inline-block mt-4"
                        onClick={() => setUser(!user)}
                      >
                        Chọn địa chỉ mà bạn đã lưu:{" "}
                        <b>(địa chỉ mặc định sẽ tự động lưu)</b>
                        <h5 className="text-[#027df0fd]">
                          (Nhấn vào đây để chọn)
                        </h5>
                      </h5>
                      {user && (
                        <div>
                          {userInfo &&
                            userInfo.addresses?.map((item, index) => (
                              <div
                                onClick={() => setRes(true)}
                                key={index}
                                className="w-full flex mt-1"
                              >
                                <input
                                  type="checkbox"
                                  className="mr-3"
                                  value={item.addressType}
                                  onClick={() =>
                                    setAddress1(item.address1) ||
                                    setCountry(item.country) ||
                                    setCity(item.city)
                                  }
                                />
                                <h2>{item.addressType}</h2>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  )}

                  {res && (
                    <div className="flex flex-col gap-1">
                      <h2 className="text-slate-600 font-semibold pb-2">
                        Giao hàng đến {userInfo.name}
                      </h2>
                      <p>
                        <span className="bg-blue-200 text-blue-800 text-xs font-medium mr-2 px-3 py-1 rounded">
                          Địa chỉ
                        </span>
                        <span className="text-slate-600 text-sm">
                          {address1} {city} {country}{" "}
                        </span>
                        <span
                          onClick={() => setRes(false)}
                          className="text-blue-500 cursor-pointer pl-[20px]"
                        >
                          thay đổi
                        </span>
                      </p>
                      <p>Email được gửi tới {userInfo.email}</p>
                    </div>
                  )}
                </div>

                {products.map((p, i) => (
                  <div
                    key={i}
                    className="flex bg-light rounded border p-4 flex-col gap-2"
                  >
                    {/**Betta shop */}
                    <div className="flex justify-start items-center ">
                      <h2 className="text-md text-secondary">{p.shopName}</h2>
                    </div>
                    {p.products.map((pt, j) => (
                      <div key={j} className="row ">
                        <div className=" col-md-10 ">
                          <div className="flex  justify-start items-start">
                            <div className="col-md-4">
                              <img
                                className=" rounded"
                                src={pt.productInfo.images[0]}
                                alt="product_image"
                              />
                            </div>
                            <div className="col-md-8 ml-2 text-slate-600">
                              <h4 className="text-md">{pt.productInfo.name}</h4>
                              <span className="text-sm">
                                Thương hiệu : {pt.productInfo.brand}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-2 ">
                          <div className="pl-4 sm:pt-0">
                            <h2 className="text-warning text-lg">
                              {(
                                pt.productInfo.price -
                                Math.floor(
                                  pt.productInfo.price * pt.productInfo.discount
                                ) /
                                  100
                              ).toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </h2>
                            <p className="line-through">
                              {pt.productInfo.price.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </p>
                            <p>-{pt.productInfo.discount}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-4 md-lg:w-full">
              <div className="pl-3 md-lg:pl-0">
                <div className="bg-light border rounded font-medium p-5 text-slate-600 flex flex-col gap-3">
                  <h2 className="text-xl font-semibold">HÓA ĐƠN</h2>
                  <div className="flex justify-between  items-center">
                    <span>Tổng Số Tiền</span>
                    <span className="text-lg text-warning">
                      {price.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between  items-center">
                    <span>Phí Giao Hàng</span>
                    <span className="flex text-lg text-warning">
                      {city === "Cần Thơ" ? "20.000 đ" : " 30.000 đ"}{" "}
                      <b className="flex justify-between items-center pl-1">
                        <Tooltip title="Nội thành Cần thơ 20k, Ngoại thành 30k phí ship">
                          <FaQuestionCircle />
                        </Tooltip>
                      </b>
                    </span>
                  </div>
                  {/**20k 30k ship */}
                  <div className="flex justify-between  items-center">
                    <span>Tổng Số Tiền Cần Trả</span>
                    <span className="text-lg text-warning">
                      {(
                        price + (city === "Cần Thơ" ? 20000 : 30000)
                      ).toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                  {/*  {res && !openVoucher ? (
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        className={`w-full border p-1 rounded-[5px] h-[40px] pl-2`}
                        placeholder="Áp dụng mã Voucher ngay!!! "
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        required
                      />
                      <input
                        className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] font-bold rounded-[3px] mt-8 cursor-pointer`}
                        required
                        value="Áp dụng mã voucher"
                        type="submit"
                      />
                    </form>
                  ) : couponCodeData && openVoucher ? (
                    <div className="flex border-b-2 pb-2 border-slate-500">
                      <p>Đã áp dụng mã voucher giảm {couponCodeData.value}%</p>
                      <span
                        onClick={() => setOpenVoucher(false)}
                        className="text-blue-400 cursor-pointer"
                      >
                        Thay đổi
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
*/}
                  <div className="flex justify-between  items-center">
                    <span>TỔNG</span>
                    <span className="text-lg text-warning">
                      {!discountPercentenge
                        ? (
                            price + (city === "Cần Thơ" ? 20000 : 30000)
                          ).toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })
                        : totalPrice.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                    </span>
                  </div>
                  <button
                    onClick={placeOrder}
                    disabled={res ? false : true}
                    className={`px-5 py-[6px] rounded btn btn-secondary ${
                      res ? "btn btn-success" : "bg-secondary"
                    }  text-sm text-white uppercase`}
                  >
                    Tiến Hành Thanh Toán
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shipping;
