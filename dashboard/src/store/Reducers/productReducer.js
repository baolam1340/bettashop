import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
export const add_product = createAsyncThunk(
  "product/add_product",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/product-add", product, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_product = createAsyncThunk(
  "product/updateProduct",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/product-update", product, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const product_image_update = createAsyncThunk(
  "product/product_image_update",
  async (
    { oldImage, newImage, productId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("oldImage", oldImage);
      formData.append("newImage", newImage);
      formData.append("productId", productId);
      const { data } = await api.post("/product-image-update", formData, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_products = createAsyncThunk(
  "product/get_products",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/products-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_product = createAsyncThunk(
  "product/get_product",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/product-get/${productId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const delete_product = createAsyncThunk(
  "product/delete_product",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/product-delete/${productId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_logproduct = createAsyncThunk(
  "product/update_logproduct",
  async (logProduct, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/logproduct-update", logProduct, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_logproduct = createAsyncThunk(
  "product/get_logproduct",
  async (
    { parPage, page, searchValue, productId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/logproduct-get/${productId}?page=${page}&searchValue=${searchValue}&parPage=${parPage}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_review_products = createAsyncThunk(
  "product/get_review_products",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-review-products`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const xoa_review = createAsyncThunk(
  "product/xoa_review",
  async (_id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/delete-review/${_id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const commit_review = createAsyncThunk(
//   "product/commit_review",
//   async (_id, { rejectWithValue, fulfillWithValue }) => {
//     try {
//       const { data } = await api.put(`/commit-review/${_id}`, {
//         withCredentials: true,
//       });
//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const get_nhacungcap = createAsyncThunk(
  "product/get_nhacungcap",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/nhacungcap?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const submit_nhacungcap = createAsyncThunk(
  "product/submit_nhacungcap",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/submit-nhacungcap`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const xoa_nhacungcap = createAsyncThunk(
  "product/xoa_nhacungcap",
  async (_id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/xoa-nhacungcap/${_id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const risk_management = createAsyncThunk(
  "product/risk_management",
  async (obj, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/risk-management", obj, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_risk_management = createAsyncThunk(
  "product/get_risk_management",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-risk-management/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const productReducer = createSlice({
  name: "product",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    products: [],
    product: "",
    totalProduct: 0,
    logProduct: [],
    totallogProduct: 0,
    total_product_find: 0,
    all_nhacungcap: [],
    count_nhacungcap: 0,
    get_all_nhacungcap: [],
    risk: [],
    tong_thiethai: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    [add_product.pending]: (state, _) => {
      state.loader = true;
    },
    [add_product.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    },
    [add_product.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
    },
    [get_products.fulfilled]: (state, { payload }) => {
      state.totalProduct = payload.totalProduct;
      state.products = payload.products;
      state.tong_thiethai = payload.result;
    },
    [get_product.fulfilled]: (state, { payload }) => {
      state.product = payload.product;
      state.updateDate = payload.updateDate;
      state.get_all_nhacungcap = payload.get_all_nhacungcap;
    },
    [update_product.pending]: (state, _) => {
      state.loader = true;
    },
    [update_product.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [update_product.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.product = payload.product;
      state.successMessage = payload.message;
    },
    [product_image_update.fulfilled]: (state, { payload }) => {
      state.product = payload.product;
      state.successMessage = payload.message;
    },
    [delete_product.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [update_logproduct.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [get_logproduct.fulfilled]: (state, { payload }) => {
      state.logProduct = payload.logProduct;
      state.totallogProduct = payload.totallogProduct;
    },
    [get_review_products.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.product_find = payload.product_find;
      state.total_product_find = payload.total_product_find;
    },
    [get_review_products.pending]: (state, { payload }) => {
      state.loader = true;
    },
    [xoa_review.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },

    [submit_nhacungcap.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [get_nhacungcap.fulfilled]: (state, { payload }) => {
      state.all_nhacungcap = payload.all_nhacungcap;
      state.count_nhacungcap = payload.count_nhacungcap;
    },
    [xoa_nhacungcap.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    // quan li rui ro
    [risk_management.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [risk_management.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
    },
    [get_risk_management.fulfilled]: (state, { payload }) => {
      state.risk = payload.risk;
    },
  },
});
export const { messageClear } = productReducer.actions;
export default productReducer.reducer;
