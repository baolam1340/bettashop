import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_all_shipper = createAsyncThunk(
  "shipper/get_all_shipper",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-all-shipper?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_shipper = createAsyncThunk(
  "shipper/get_shipper",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-shipper/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_profile_shipper = createAsyncThunk(
  "shipper/update_profile_shipper",
  async ( info , { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/update-profile-shipper`,
        info,
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

export const xoa_shipper = createAsyncThunk(
  "shipper/xoa_shipper",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/xoa-shipper/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const shipperReducer = createSlice({
  name: "shipper",
  initialState: {
    successMessage: "",
    errorMessage: "",
    shippers: [],
    totalShipper: 0,
    shipper: {},
    loader: false,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    [get_all_shipper.fulfilled]: (state, { payload }) => {
      state.shippers = payload.shippers;
      state.totalShipper = payload.totalShipper;
    },
    [get_all_shipper.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
    },
    [xoa_shipper.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [get_shipper.fulfilled]: (state, { payload }) => {
      state.shipper = payload.shipper;
    },
    [update_profile_shipper.pending]: (state, _) => {
      state.loader = true;
    },
    [update_profile_shipper.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
    },
    [update_profile_shipper.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    },
  },
});
export const { messageClear } = shipperReducer.actions;
export default shipperReducer.reducer;
