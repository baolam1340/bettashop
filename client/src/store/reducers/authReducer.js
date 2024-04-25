import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import jwt from "jwt-decode";

export const customer_register = createAsyncThunk(
  "auth/customer_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/customer-register", info);
      localStorage.setItem("customerToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const customer_login = createAsyncThunk(
  "auth/customer_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/customer-login", info);
      localStorage.setItem("customerToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const customer_gg_login = createAsyncThunk(
  "auth/customer_gg_login",
  async (res, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/customer-gg-login", res);
      localStorage.setItem("customerToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const change_password = createAsyncThunk(
  "auth/change_password",
  async (
    { oldPassword, newPassword },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { data } = await api.put("/customer/change-password/", {
        oldPassword,
        newPassword,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserAddress = createAsyncThunk(
  "auth/updatetUserAddress",
  async (
    { country, city, address1, addressType },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.put("/customer/update-address/", {
        country,
        city,
        address1,
        addressType,
      });
      localStorage.setItem("customerToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUserAddress = createAsyncThunk(
  "auth/deleteUserAddress",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/customer/delete-address/${id}`);
      localStorage.setItem("customerToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserInformation = createAsyncThunk(
  "auth/updateUserInformation",
  async (
    { name, email, phoneNumber, sex },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.put("/customer/update-profile/", {
        name,
        email,
        phoneNumber,
        sex,
      });
      localStorage.setItem("customerToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const decodeToken = (token) => {
  if (token) {
    const userInfo = jwt(token);
    return userInfo;
  } else {
    return "";
  }
};

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    loader: false,
    userInfo: decodeToken(localStorage.getItem("customerToken")),
    errorMessage: "",
    successMessage: "",
    user: {},
  },

  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    user_reset: (state, _) => {
      state.userInfo = "";
    },
  },
  extraReducers: {
    [customer_register.pending]: (state, _) => {
      state.loader = true;
    },
    [customer_register.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
      state.loader = false;
    },
    [customer_register.fulfilled]: (state, { payload }) => {
      const userInfo = decodeToken(payload.token);
      state.successMessage = payload.message;
      state.loader = false;
      state.userInfo = userInfo;
    },
    [customer_login.pending]: (state, _) => {
      state.loader = true;
    },
    [customer_login.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
      state.loader = false;
    },
    [customer_login.fulfilled]: (state, { payload }) => {
      const userInfo = decodeToken(payload.token);
      state.successMessage = payload.message;
      state.loader = false;
      state.userInfo = userInfo;
    },

    [customer_gg_login.pending]: (state, _) => {
      state.loader = true;
    },
    [customer_gg_login.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
      state.loader = false;
    },
    [customer_gg_login.fulfilled]: (state, { payload }) => {
      const userInfo = decodeToken(payload.token);
      state.successMessage = payload.message;
      state.loader = false;
      state.userInfo = userInfo;
    },

    [change_password.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [change_password.rejected]: (state, { payload }) => {
      state.errorMessage = payload.message;
    },
    [updateUserAddress.fulfilled]: (state, { payload }) => {
      const userInfo = decodeToken(payload.token);
      state.userInfo = userInfo;
      state.successMessage = payload.message;
    },
    [updateUserAddress.rejected]: (state, { payload }) => {
      state.errorMessage = payload.message;
    },
    [deleteUserAddress.fulfilled]: (state, { payload }) => {
      const userInfo = decodeToken(payload.token);
      state.userInfo = userInfo;
      state.successMessage = payload.message;
    },
    [updateUserInformation.fulfilled]: (state, { payload }) => {
      const userInfo = decodeToken(payload.token);
      state.userInfo = userInfo;
      state.successMessage = payload.message;
    },
    [updateUserInformation.rejected]: (state, { payload }) => {
      state.errorMessage = payload.message;
    },
  },
});

export const { messageClear, user_reset } = authReducer.actions;
export default authReducer.reducer;
