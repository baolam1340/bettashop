/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useState } from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Range } from "react-range";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { FaThList } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";
import Products from "../components/products/Products";
import ShopProducts from "../components/products/ShopProducts";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  price_range_product,
  query_products,
  get_brands,
} from "../store/reducers/homeReducer";
import FadeLoader from "react-spinners/FadeLoader";

const Shops = () => {
  const {
    sexs,
    brands,
    categorys,
    products,
    totalProduct,
    topRated_products,
    priceRange,
    parPage,
    loader,
  } = useSelector((state) => state.home);

  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [styles, setStyles] = useState("grid");
  const [filter, setFilter] = useState(true);
  const [state, setState] = useState({
    values: [priceRange.low, priceRange.high],
  });
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("");
  const [sex, setSex] = useState("");
  const [brand, setBrand] = useState("");
  const [sortPrice, setSortPrice] = useState("");

  useEffect(() => {
    dispatch(price_range_product());
  }, [dispatch]);

  useEffect(() => {
    dispatch(get_brands());
  }, [dispatch]);

  useEffect(() => {
    setState({
      values: [priceRange.low, priceRange.high],
    });
  }, [priceRange]);

  const queryCategory = (e, value) => {
    if (e.target.checked) {
      setCategory(value);
    } else {
      setCategory("");
    }
  };

  const querySex = (e, value) => {
    if (e.target.checked) {
      setSex(value);
    } else {
      setSex("");
    }
  };

  const queryBrand = (e, value) => {
    if (e.target.checked) {
      setBrand(value);
    } else {
      setBrand("");
    }
  };

  useEffect(() => {
    dispatch(
      query_products({
        low: state.values[0],
        high: state.values[1],
        category,
        sex,
        brand,
        rating,
        sortPrice,
        pageNumber,
      })
    );
  }, [
    state.values[0],
    state.values[1],
    sex,
    brand,
    category,
    rating,
    pageNumber,
    sortPrice,
  ]);

  const resetAll = () => {
    setCategory("");
    setRating("");
    setSortPrice("");
    setSex("");
    setBrand("");
    setState({
      values: [priceRange.low, priceRange.high],
    });
    dispatch(
      query_products({
        low: state.values[0],
        high: state.values[1],
        category: "",
        sex: "",
        brand: "",
        rating: "",
        pageNumber,
        sortPrice,
      })
    );
  };

  console.log(rating);

  return (
    <div className="container">
      <div className="row">
        <Headers isFixed={false} />
      </div>
      <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
        <h2>Sản Phẩm Của Betta Shop</h2>
        <div className="w-[100px] h-[4px] bg-success mt-4"></div>
      </div>
      <section className="mt-1">
        <div className="row">
          <div className={`md:block hidden ${!filter ? "mb-6" : "mb-0"}`}>
            <button
              onClick={() => setFilter(!filter)}
              className="text-center w-full py-2 px-3 bg-indigo-500 text-white"
            >
              Lọc Sản Phẩm
            </button>
          </div>
          <div className="row">
            {/**ben trai shop danh muc/ gioi tinh/ danh gia */}
            <div className="col-md-3 bg-light border rounded">
              <div
                className={` pr-8 ${
                  filter
                    ? "md:h-0 md:overflow-hidden md:mb-6"
                    : "md:h-auto md:overflow-auto md:mb-0"
                }`}
              >
                {/*Danh mục cá   */}
                <h2 className="text-3xl font-bold mb-3 text-slate-600">
                  Danh Mục Cá
                </h2>
                <div className="py-2">
                  {categorys.map((c, i) => (
                    <div
                      className="flex justify-start items-center gap-2 py-1"
                      key={i}
                    >
                      <input
                        checked={category === c.name ? true : false}
                        onChange={(e) => queryCategory(e, c.name)}
                        type="checkbox"
                        id={c.name}
                      />
                      <label
                        className="text-slate-600 block cursor-pointer"
                        htmlFor={c.name}
                      >
                        {c.name}
                      </label>
                    </div>
                  ))}
                </div>
                <h2 className="text-3xl font-bold mb-3 text-slate-600">
                  Chọn Giống
                </h2>
                <div className="py-2">
                  {sexs.map((c, i) => (
                    <div
                      className="flex justify-start items-center gap-2 py-1"
                      key={i}
                    >
                      <input
                        checked={sex === c ? true : false}
                        onChange={(e) => querySex(e, c)}
                        type="checkbox"
                        id={c}
                      />
                      <label
                        className="text-slate-600 block cursor-pointer"
                        htmlFor={c}
                      >
                        {c}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="py-2 flex flex-col gap-5">
                  <h2 className="text-3xl font-bold mb-3 text-slate-600">
                    Giá
                  </h2>
                  <Range
                    step={5}
                    min={priceRange.low}
                    max={priceRange.high}
                    values={state.values}
                    onChange={(values) => setState({ values })}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        className="w-full h-[6px] bg-slate-200 rounded-full cursor-default"
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        className="w-[15px] h-[15px] bg-blue-500 rounded-full"
                        {...props}
                      />
                    )}
                  />
                  <div>
                    <span className="text-red-500 font-bold text-lg">
                      {Math.floor(state.values[0]).toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}{" "}
                      -{" "}
                      {Math.floor(state.values[1]).toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                </div>
                {/**chon danh gia */}
                <div className="py-3 flex flex-col gap-4">
                  <h2 className="text-3xl font-bold mb-3 text-slate-600">
                    Chọn Đánh Giá
                  </h2>
                  <p className="text-md text-red-400 text-warning">
                    {rating === 1
                      ? "(Lọc từ 1 -> 2 sao)"
                      : rating === 2
                      ? "(Lọc từ 2 -> 3 sao)"
                      : rating === 3
                      ? "(Lọc từ 3 -> 4 sao)"
                      : rating === 4
                      ? "(Lọc từ 4 -> 5 sao)"
                      : rating === 5
                      ? "(Lọc 5 sao)"
                      : ""}
                  </p>
                  <div className="flex flex-col gap-3 ">
                    <div
                      onClick={() => setRating(5)}
                      className="text-warning flex justify-start items-start gap-2 text-xl cursor-pointer "
                    >
                      <span>
                        <AiFillStar />
                      </span>
                      <span>
                        <AiFillStar />
                      </span>
                      <span>
                        <AiFillStar />
                      </span>
                      <span>
                        <AiFillStar />
                      </span>
                      <span>
                        <AiFillStar />
                      </span>
                    </div>
                    <div
                      onClick={() => setRating(4)}
                      className="text-warning flex justify-start items-start gap-2 text-xl cursor-pointer"
                    >
                      <span>
                        <AiFillStar />
                      </span>
                      <span>
                        <AiFillStar />
                      </span>
                      <span>
                        <AiFillStar />
                      </span>
                      <span>
                        <AiFillStar />
                      </span>
                      <span>
                        <CiStar />
                      </span>
                    </div>
                    <div
                      onClick={() => setRating(3)}
                      className="text-warning flex justify-start items-start gap-2 text-xl cursor-pointer"
                    >
                      <span>
                        <AiFillStar />
                      </span>
                      <span>
                        <AiFillStar />
                      </span>
                      <span>
                        <AiFillStar />
                      </span>
                      <span>
                        <CiStar />
                      </span>
                      <span>
                        <CiStar />
                      </span>
                    </div>
                    <div
                      onClick={() => setRating(2)}
                      className="text-warning flex justify-start items-start gap-2 text-xl cursor-pointer"
                    >
                      <span>
                        <AiFillStar />
                      </span>
                      <span>
                        <AiFillStar />
                      </span>
                      <span>
                        <CiStar />
                      </span>
                      <span>
                        <CiStar />
                      </span>
                      <span>
                        <CiStar />
                      </span>
                    </div>
                    <div
                      onClick={() => setRating(1)}
                      className="text-warning flex justify-start items-start gap-2 text-xl cursor-pointer"
                    >
                      <span>
                        <AiFillStar />
                      </span>
                      <span>
                        <CiStar />
                      </span>
                      <span>
                        <CiStar />
                      </span>
                      <span>
                        <CiStar />
                      </span>
                      <span>
                        <CiStar />
                      </span>
                    </div>
                    <div
                      onClick={() => setRating(0)}
                      className="text-warning flex justify-start items-start gap-2 text-xl cursor-pointer"
                    >
                      <span>
                        <CiStar />
                      </span>
                      <span>
                        <CiStar />
                      </span>
                      <span>
                        <CiStar />
                      </span>
                      <span>
                        <CiStar />
                      </span>
                      <span>
                        <CiStar />
                      </span>
                    </div>
                    <div
                      onClick={resetAll}
                      className="flex justify-center items-center gap-2 pt-1 pb-1 cursor-pointer text-white text-xl border bg-success  rounded-full "
                    >
                      <span>Đặt Lại Tìm Kiếm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/**ben phai shop ca */}
            <div className="col-md-9">
              <div className="pl-8 md:pl-0">
                <div className="py-4 rounded border mb-10 px-3  flex justify-between items-start bg-light">
                  <h2 className="text-lg font-medium  text-slate-600 mt-2 ml-4">
                    Shop đang có {totalProduct} sản phẩm
                  </h2>
                  {/** sắp xếp theo thứ tự */}
                  <div className="flex justify-center items-center gap-3">
                    <select
                      onChange={(e) => setSortPrice(e.target.value)}
                      value={sortPrice}
                      className="p-1 border outline-0 text-slate-600 font-semibold"
                      name=""
                      id=""
                    >
                      <option value="">Sắp Xếp Từ</option>
                      <option value="low-to-high">Giá Thấp đến Cao </option>
                      <option value="high-to-low">Giá Cao đến Thấp</option>
                    </select>
                    <div className="flex justify-center items-start gap-4 md-lg:hidden">
                      <div
                        onClick={() => setStyles("grid")}
                        className={`p-2 ${
                          styles === "grid" && "bg-slate-300"
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm `}
                      >
                        <BsFillGridFill />
                      </div>
                    </div>
                  </div>
                </div>
                {/**card san pham shop product */}
                <div className="pb-8">
                  {loader ? (
                    <FadeLoader />
                  ) : (
                    <ShopProducts products={products} styles={styles} />
                  )}
                </div>
                <div>
                  {totalProduct >= parPage && (
                    <Pagination
                      pageNumber={pageNumber}
                      setPageNumber={setPageNumber}
                      totalItem={totalProduct}
                      parPage={parPage}
                      showItem={Math.floor(totalProduct / parPage)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="mt-5 text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
        <h2>Sản Phẩm Mua Nhiều Nhất</h2>
        <div className="w-[100px] h-[4px] bg-success mt-4"></div>
      </div>
      {/**san pham moi nhat */}
      <div className="py-5 flex flex-col gap-4 md:hidden bg-light p-4 border rounded">
        <Products
          title="Sản Phẩm Mua Nhiều Nhất"
          products={topRated_products}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Shops;
