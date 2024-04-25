import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

//dùng api gọi tới home/get-cate để nhận sp
// nhận kết quả api trả về thông wa fulfillwithvalue
export const get_categorys = createAsyncThunk(
  "product/get_categorys",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/get-categorys");
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const get_brands = createAsyncThunk(
  "product/get_brands",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/get-brands");
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const get_products = createAsyncThunk(
  "product/get_products",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/get-products");
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const get_product = createAsyncThunk(
  "product/get_product",
  async (slug, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/get-product/${slug}`);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const recommendations = createAsyncThunk(
  "product/recommendations",
  async (id, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/recommendations/${id}`);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const price_range_product = createAsyncThunk(
  "product/price_range_product",
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/price-range-latest-product");
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const query_products = createAsyncThunk(
  "product/query_products",
  async (query, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/query-products?category=${query.category}&&sex=${
          query.sex
        }&&brand=${query.brand}&&rating=${query.rating}&&lowPrice=${
          query.low
        }&&highPrice=${query.high}&&sortPrice=${query.sortPrice}&&pageNumber=${
          query.pageNumber
        }&&searchValue=${query.searchValue ? query.searchValue : ""}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const customer_review = createAsyncThunk(
  "review/customer_review",
  async (info, { fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/customer/submit-review", info);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const get_reviews = createAsyncThunk(
  "review/get_reviews",
  async ({ productId, pageNumber }, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-reviews/${productId}?pageNo=${pageNumber}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const customer_review_order = createAsyncThunk(
  "review/customer_review_order",
  async (info, { fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/home/customer/submit-review-order",
        info
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const check_review_customer = createAsyncThunk(
  "review/check_review_customer",
  async ({ customerId, productId }, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/check-review-customer/${customerId}/${productId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const homeReducer = createSlice({
  name: "home",
  initialState: {
    loader: false,
    categorys: [],
    products: [],
    totalProduct: 0,
    parPage: 2,
    latest_products: [],
    topRated_products: [],
    discount_products: [],
    priceRange: { low: 0, high: 1000 },
    product: {},
    relatedProducts: [],
    moreProducts: [],
    successMessage: "",
    errorMessage: "",
    totalReview: 0,
    rating_review: [],
    reviews: [],
    sexs: ["Đực", "Cái"],
    brands: [],
    review_order: {},
    check_review: 0,
    search_products: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [get_categorys.fulfilled]: (state, { payload }) => {
      state.categorys = payload.categorys;
    },
    [get_brands.fulfilled]: (state, { payload }) => {
      state.brands = payload.brands;
    },
    [get_products.pending]: (state, { payload }) => {
      state.loader = true;
    },
    [get_products.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.products = payload.products;
      state.latest_products = payload.latest_products;
      state.topRated_products = payload.topRated_products;
      state.discount_products = payload.discount_products;
      state.relatedProducts = payload.relatedProducts;
      state.search_products = payload.search_products;
    },
    [get_product.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.product = payload.product;
      state.relatedProducts = payload.relatedProducts;
      state.moreProducts = payload.moreProducts;
    },
    [get_product.pending]: (state, { payload }) => {
      state.loader = true;
    },
    [price_range_product.fulfilled]: (state, { payload }) => {
      state.latest_products = payload.latest_products;
      state.priceRange = payload.priceRange;
    },
    [query_products.pending]: (state, { payload }) => {
      state.loader = true;
    },
    [query_products.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.search_products = payload.search_products;
      state.products = payload.products;
      state.totalProduct = payload.totalProduct;
      state.parPage = payload.parPage;
    },
    [customer_review.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [get_reviews.fulfilled]: (state, { payload }) => {
      state.reviews = payload.reviews;
      state.totalReview = payload.totalReview;
      state.rating_review = payload.rating_review;
    },
    [customer_review_order.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
    },
    [customer_review_order.pending]: (state, { payload }) => {
      state.loader = true;
    },
    [customer_review_order.rejected]: (state, { payload }) => {
      state.errorMessage = payload.message;
    },
    [check_review_customer.fulfilled]: (state, { payload }) => {
      state.check_review = payload.count !== "undefined" ? payload.count : 0;
    },
  },
});
export const { messageClear } = homeReducer.actions;
export default homeReducer.reducer;
