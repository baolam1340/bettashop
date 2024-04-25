/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Headers from "../components/Headers";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Footer from "../components/Footer";
import Ratings from "../components/Ratings";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import Reviews from "../components/Reviews";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import FadeLoader from "react-spinners/FadeLoader";
import {
  get_product,
  check_review_customer,
  // recommendations,
} from "../store/reducers/homeReducer";
import {
  add_to_card,
  messageClear,
  add_to_wishlist,
} from "../store/reducers/cardReducer";
import toast from "react-hot-toast";

const Details = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, relatedProducts, moreProducts, totalReview, loader } =
    useSelector((state) => state.home);
  const { slug } = useParams();
  const [image, setImage] = useState("");
  const [state, setState] = useState("reviews");
  const [selectedOption, setSelectedOption] = useState(product?.color);

  const { userInfo } = useSelector((state) => state.auth);
  const { errorMessage, successMessage } = useSelector((state) => state.card);

  const location = useLocation();

  // useEffect(() => {
  //   dispatch(recommendations(userInfo.id));
  // }, [userInfo.id, dispatch]);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    dispatch(
      check_review_customer({
        customerId: userInfo?.id,
        productId: product._id,
      })
    );
    dispatch(get_product(slug));
    if (product && product?.size) {
      setSelectedSize(product.size[0]);
    }
  }, [dispatch, userInfo?.id, product._id]);

  useEffect(() => {
    window.scrollTo({
      top: 400,
      left: 400,
      behavior: "smooth",
    });
  }, [location]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };

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

  const add_card = () => {
    if (userInfo) {
      if (selectedSize === "") {
        setSize(true);
        toast.error("Vui lòng chọn size!");
      } else {
        dispatch(
          add_to_card({
            userId: userInfo?.id,
            quantity,
            size: selectedSize,
            productId: product._id,
          })
        );
      }
    } else {
      toast.error("Cần đăng nhập để tiếp tục!");
      navigate("/login");
    }
  };

  const add_wishlist = () => {
    if (userInfo) {
      dispatch(
        add_to_wishlist({
          userId: userInfo.id,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product?.images[0],
          discount: product.discount,
          rating: product.rating,
          slug: product.slug,
        })
      );
    } else {
      toast.error("Cần đăng nhập để tiếp tục!");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [dispatch, errorMessage, successMessage]);

  const [size, setSize] = useState(false);

  const buy = () => {
    if (userInfo) {
      if (selectedSize === "") {
        setSize(true);
        toast.error("Vui lòng chọn size!");
      } else {
        let price = 0;

        if (product.discount !== 0) {
          price =
            product.price -
            Math.floor((product.price * product.discount) / 100);
        } else {
          price = product.price;
        }
        const obj = [
          {
            sellerId: product.sellerId,
            shopName: product?.shopName,
            price: quantity * (price - Math.floor(price * 5) / 100),
            products: [{ quantity, productInfo: product }],
            selectedSize,
            selectedOption,
          },
        ];
        navigate("/shipping", {
          state: {
            products: obj,
            price: price * quantity,
            shipping_fee: userInfo
              ? userInfo?.addresses[0]?.city === "Cần Thơ"
                ? 20000
                : 30000
              : 30000,
            items: 1,
          },
        });
      }
    } else {
      toast.error("Cần đăng nhập để tiếp tục!");
      navigate("/login");
    }
  };

  console.log(userInfo);

  return (
    <div className="container">
      <div className="row">
        <Headers />
      </div>

      <div className=" text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
        <h2>Chi Tiết Sản Phẩm</h2>
        <div className="w-[100px] h-[4px] bg-success mt-4"></div>
      </div>
      <div className="row justify-content-center">
        <div className="row">
          <section>
            {loader ? (
              <FadeLoader />
            ) : (
              <div className="row  ">
                <div className=" row bg-light border rounded ">
                  <div className="col-md-4 mt-5">
                    <div className=" ">
                      <img
                        className="img-fluid col-md-12 rounded"
                        src={image ? image : product.images?.[0]}
                        alt="product_image"
                      />
                    </div>
                    <div className=" row">
                      {product.images && (
                        <Carousel
                          autoPlay={true}
                          infinite={true}
                          transitionDuration={500}
                          responsive={responsive}
                        >
                          {product.images.map((img, i) => {
                            return (
                              <div key={i} onClick={() => setImage(img)}>
                                <img
                                  className="img-fluid cursor-pointer rounded p-1 "
                                  src={img}
                                  alt="img_new"
                                />
                              </div>
                            );
                          })}
                        </Carousel>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 mt-5">
                    {/**tên sản phẩm cá */}
                    <div className="h2 text-secondary font-bold row ">
                      <b> {product.name}</b>
                    </div>
                    {/**đánh giá số sao */}
                    <div className="flex justify-start items-center mt-2 row ">
                      <div className="flex text-xl ">
                        <Ratings
                          ratings={product.rating}
                          className="text-warning"
                        ></Ratings>
                      </div>
                      <div className="row">
                        <span className="text-warning">
                          ({totalReview} Đánh Giá)
                        </span>
                      </div>
                    </div>
                    {/**giảm giá */}
                    <div className="text-2xl text-red-500 font-bold flex gap-3">
                      {product.discount ? (
                        <>
                          <h5 className="line-through text-dark ">
                            {product.price.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}{" "}
                          </h5>
                          <h3>
                            {(
                              product.price -
                              Math.floor(product.price * product.discount) / 100
                            ).toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}{" "}
                            (-{product.discount}%)
                          </h3>
                        </>
                      ) : (
                        <h3>
                          {product.price.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </h3>
                      )}
                    </div>
                    {/**giới tính */}
                    <h4 className="text-secondary ">
                      Giới tính: {product.sex}
                    </h4>
                    {/**màu sắc */}
                    <h4 className="text-secondary ">
                      Màu sắc: {product?.color}
                    </h4>
                    {/**sản phẩm có sẵn*/}
                    <div className="flex  ">
                      <div className="w-[200px] text-secondary font-bold text-xl flex flex-col gap-5">
                        <span>Sản phẩm có sẵn</span>
                      </div>
                      <div className="flex flex-col gap-5 h6 mt-2 ">
                        <span
                          className={`text-${
                            product.stock ? "green" : "red"
                          }-500`}
                        >
                          {product.stock
                            ? `Còn (${product.stock})`
                            : "Hết hàng"}
                        </span>
                      </div>
                    </div>
                    {/*<div className="text-secondary">
                      <p>{product.description}</p>
                    </div>*/}
                    {/** + - số lượng sản phẩm */}
                    <div className="row  ">
                      {product.stock ? (
                        <div className="row">
                          <div className="flex mt-2 col-md-3 bg-light rounded justify-center items-center text-xl">
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
                          {/**thêm vào giỏ hàng*/}
                          <div className="col-md-4 btn btn-warning text-center mt-2">
                            <button
                              onClick={add_card}
                              className=" cursor-pointer   text-dark"
                            >
                              <b> Thêm Vào Giỏ Hàng</b>
                            </button>
                          </div>
                          <div className="col-md-4 btn btn-warning text-center mt-2 ml-1">
                            <div
                              onClick={add_wishlist}
                              className={` flex justify-center items-center cursor-pointer 0 text-dark
                  `}
                            >
                              <b>Thêm Vào Yêu Thích</b>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    {/**Chọn kích thước */}
                    <div className="flex text-secondary mt-2">
                      <h2>Chọn kích thước:</h2>

                      {product?.size &&
                        product?.size.map((u) => (
                          <div
                            onClick={() => setSelectedSize(u) || setSize(false)}
                            className={``}
                          >
                            <input
                              readOnly
                              className={`flex w-auto p-2 text-center border rounded ml-2 mt-1 font-bold cursor-pointer ${
                                selectedSize === u
                                  ? "text-success border-success cursor-not-allowed"
                                  : "hover:text-red-500 border hover:border-red-500"
                              }`}
                              name="size"
                              id=""
                              value={u}
                            />
                          </div>
                        ))}
                      {size ? (
                        <h2 className="text-red-500">
                          <b>vui lòng chọn kích thước </b>
                        </h2>
                      ) : (
                        ""
                      )}
                    </div>
                    {/**mua ngay */}
                    <div className="flex gap-3">
                      {product.stock ? (
                        <button
                          onClick={buy}
                          className="mt-5 col-md-4  cursor-pointer btn btn-primary h5 text-white "
                        >
                          Mua Ngay
                        </button>
                      ) : (
                        ""
                      )}
                      {/* <button
                  onClick={() => chat_to_shop(product.sellerId)}
                  className="px-8 py-3 sm:h-full h-[50px] cursor-pointer hover:shadow-lg hover:shadow-orange-500/40 bg-orange-500 text-white block"
                >
                  Chat với Người Bán
                </button> */}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
        <div className="mt-5 text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
          <h2>Thông Tin Vận Chuyển Và Giao Hàng</h2>
          <div className="w-[100px] h-[4px] bg-success mt-4"></div>
        </div>
        {/* Thông Tin Vận Chuyển Và Giao Hàng*/}
        <div className="row rounded border bg-light justify-content-center">
          <div className="col-md-3">
            <img src="/images/kirara.png" alt="" className="img-fluid" />
          </div>
          <div className="col-md-8 mt-5">
            <div className="h4">GIAO HÀNG NHANH CHÓNG</div>
            <div className="m-3">
              Sau khi quý khách đặt hàng thành công bên bộ phận kiểm tra hàng sẽ
              gọi điện thông báo tình trạng sản phẩm, báo phí vận chuyển và thời
              gian giao - nhận hàng cho quý khách cách nhanh nhất.
            </div>
            <div className="h4">NHẬN HÀNG ĐẢM BẢO</div>
            <div className="m-3">
              Quý khách sẽ có 2 lựa chọn nhận hàng khi đặt hàng ở phần thanh
              toán:
            </div>
            <ol type="1">
              <li className="mb-1">
                - <b className="text-warning">Chuyển khoản ngân hàng</b>: Quý
                khách sẽ chuyển khoản thanh toán tiền đơn hàng vào tài khoản đã
                liệt kê trong phần thanh toán với nội dung thanh toán là thông
                tin đơn hàng.
              </li>
              <li>
                -
                <b className="text-warning">Trả tiền mặt khi nhận hàng (COD)</b>
                : Quý khách sẽ nhận được sản phẩm tại nhà, sau khi nhận hàng Quý
                Khách sẽ thanh toán cho nhân viên giao hàng. Với hình thức thanh
                toán này.
              </li>
            </ol>
          </div>
        </div>
        <div className=" text-center flex mt-5 justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
          <h2>Đánh Giá Sản Phẩm </h2>
          <div className="w-[100px] h-[4px] bg-success mt-4"></div>
        </div>
        <div className="row   mt-3">
          <section>
            <div className=" mx-auto pb-3  ">
              <div className="">
                <div className="row justify-content-center">
                  <div className="  col-md-9 bg-light rounded-start  border">
                    <div className="row text-center mt-2">
                      {/**chon danh gia san pham muc rating */}
                      <div className="col-md-6">
                        <button
                          onClick={() => setState("reviews")}
                          className={`py-1 px-5 hover:text-white btn btn-secondary ${
                            state === "reviews"
                              ? "bg-success text-white"
                              : "bg-slate-200 text-slate-700"
                          } rounded-sm`}
                        >
                          Đánh Giá
                        </button>
                      </div>
                      {/**chọn thông tin san pham */}
                      <div className="col-md-6">
                        <button
                          onClick={() => setState("description")}
                          className={`py-1 px-5 hover:text-white btn btn-secondary ${
                            state === "description"
                              ? "bg-success text-white"
                              : "bg-slate-200 text-slate-700"
                          } rounded-sm`}
                        >
                          Thông Tin Sản Phẩm
                        </button>
                      </div>
                    </div>
                    {/**rating */}
                    <div className="row pl-3">
                      {state === "reviews" ? (
                        <Reviews product={product} />
                      ) : (
                        <p className="py-5 text-secondary">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </div>
                  {/**san pham cung loai */}
                  <div className="col-md-3  bg-light rounded-end  border">
                    <div className=" ">
                      <div className=" text-secondary ">
                        <h5>
                          <b className="m-2 mt-1">Sản Phẩm Cùng Loại</b>
                        </h5>
                      </div>
                      <div className="flex  flex-col gap-5 mt-3  border bg-secondary rounded ">
                        <div className="">
                          {moreProducts.map((p, i) => {
                            return (
                              <Link
                                to={`/product/details/${p.slug}`}
                                target="_blank"
                                key={i}
                                className="block text-decoration-none"
                              >
                                <div className="relative ">
                                  <img
                                    className="img-fluid col-md-12 rounded  "
                                    src={p?.images[0]}
                                    alt=""
                                  />
                                  {p.discount !== 0 && (
                                    <div className="flex justify-center items-center absolute text-dark w-[38px] h-[38px] rounded-full bg-warning font-semibold text-xs left-2 top-2">
                                      {p.discount}%
                                    </div>
                                  )}
                                </div>
                                <div className="">
                                  <h5 className="text-white m-2">{p.name}</h5>
                                  <div className="ml-2 flex gap-2">
                                    <h2 className="text-white text-lg font-bold">
                                      {p.price.toLocaleString("vi", {
                                        style: "currency",
                                        currency: "VND",
                                      })}
                                    </h2>
                                    <div className="flex items-center gap-2 text-warning">
                                      <Ratings ratings={p.rating} />
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                      <div className=" text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
                        <div className="w-[100px] h-[4px] bg-success mt-4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Details;
