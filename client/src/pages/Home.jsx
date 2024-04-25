import React, { useEffect } from "react";
import Headers from "../components/Headers";
import Banner from "../components/Banner";
// import Categorys from "../components/Categorys";
import FeatureProducts from "../components/products/FeatureProducts";
import Products from "../components/products/Products";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { get_categorys, get_products } from "../store/reducers/homeReducer";

const Home = () => {
  const dispatch = useDispatch();
  const { products, topRated_products, discount_products } = useSelector(
    (state) => state.home
  );
  useEffect(() => {
    dispatch(get_categorys());
    dispatch(get_products());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row">
        <Headers />
      </div>
      <div className="row  ">
        <Banner />
      </div>
      <div className="row">{/*<Categorys />*/}</div>
      <div className="py-[45px]">
        <FeatureProducts products={products} />
      </div>
      <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
        <h2>Sản Phẩm Khác</h2>
        <div className="w-[100px] h-[4px] bg-success mt-4"></div>
      </div>
      <div className="py-10">
        <div className="row  ">
          <div className="row">
            {/**san pham moi nhat 
            <div className="overflow-hidden bg-danger p-2 border rounded ">
              <Products
                title="Sản phẩm mới nhất"
                products={latest_products}
                className=""
              />
            </div>*/}
            {/**san pham danh gia cao nhat */}
            <div className="col-md-6 overflow-hidden bg-light p-2 border rounded-start">
              <Products
                title="Sản phẩm được đánh giá cao nhất"
                products={topRated_products}
              />
            </div>
            {/**san pham giam gia cao nhat */}
            <div className="col-md-6 overflow-hidden bg-light p-2 border rounded-end">
              <Products
                title="Sản phẩm giảm giá cao nhất"
                products={discount_products}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
