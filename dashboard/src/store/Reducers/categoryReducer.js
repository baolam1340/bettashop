import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
export const categoryAdd = createAsyncThunk(
  "category/categoryAdd",
  async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      const { data } = await api.post("/category-add", formData, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const brandAdd = createAsyncThunk(
  "category/brandAdd",
  async ({ name }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      const { data } = await api.post("/brand-add", formData, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_category = createAsyncThunk(
  "category/get_category",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_brand = createAsyncThunk(
  "category/get_brand",
  async (
    { parPageBrand, currentPageBrand, searchValueBrand },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/brand-get?page=${currentPageBrand}&&searchValue=${searchValueBrand}&&parPage=${parPageBrand}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const xoa_category = createAsyncThunk(
  "category/xoa_category",
  async (_id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/xoa-category/${_id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const xoa_brand = createAsyncThunk(
  "category/xoa_brand",
  async (_id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/xoa-brand/${_id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const categoryReducer = createSlice({
  name: "category",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    categorys: [],
    totalCategory: 0,
    brands: [],
    totalBrand: 0,
    loaderBrand: false,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    [categoryAdd.pending]: (state, _) => {
      state.loader = true;
    },
    [categoryAdd.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [categoryAdd.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.categorys = [...state.categorys, payload.category];
    },
    [get_category.fulfilled]: (state, { payload }) => {
      state.totalCategory = payload.totalCategory;
      state.categorys = payload.categorys;
    },
    [xoa_category.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },

    // thương hiệu

    [brandAdd.pending]: (state, _) => {
      state.loaderBrand = true;
    },
    [brandAdd.rejected]: (state, { payload }) => {
      state.loaderBrand = false;
      state.errorMessage = payload.message;
    },
    [brandAdd.fulfilled]: (state, { payload }) => {
      state.loaderBrand = false;
      state.successMessage = payload.message;
      state.brands = [...state.brands, payload.brand];
    },
    [get_brand.fulfilled]: (state, { payload }) => {
      state.totalBrand = payload.totalBrand;
      state.brands = payload.brand;
    },
    [xoa_brand.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
  },
});
export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;
