import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt from "jwt-decode";
import api from "../../api/api";
// khai báo để xử lý các hành động không đồng bộ như đăng nhập, đăng xuất, đăng ký,
// cập nhật hồ sơ và tìm nạp thông tin người dùng từ máy chủ. Các thunks này xử lý logic
// không đồng bộ và gửi các hành động thích hợp dựa trên độ phân giải hoặc từ chối đã hứa.
export const admin_login = createAsyncThunk(
  //tạo qtrinh dang nhap cua admin
  "auth/admin_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    // dùng nhận vào tham số cần thiết login
    try {
      const { data } = await api.post("/admin-login", info, {
        //sử dụng phương thức POST để gửi dữ liệu thông tin đăng nhập
        //Nếu request thành công, nó lưu trữ access token nhận được vào
        // localStorage và trả về thành công với dữ liệu nhận được
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      //Nếu request thất bại, nó trả về lỗi với dữ liệu từ response
      return rejectWithValue(error.response.data);
    }
  }
);

export const nvadmin_login = createAsyncThunk(
  "auth/nvadmin_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/nvadmin-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_login = createAsyncThunk(
  "auth/seller_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/seller-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const shipper_login = createAsyncThunk(
  "auth/shipper_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/shipper-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async ({ navigate, role }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/logout", { withCredentials: true });
      localStorage.removeItem("accessToken");

      if (role === "admin") {
        navigate("/admin/login");
      } else if (role === "seller") {
        navigate("/login");
      } else if (role === "shipper") {
        navigate("/login");
      } else {
        navigate("/login");
      }

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_register = createAsyncThunk(
  "auth/seller_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/seller-register", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const shipper_register = createAsyncThunk(
  "auth/shipper_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/shipper-register", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const nvadmin_register = createAsyncThunk(
  "auth/nvadmin_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/nvadmin-register", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const profile_image_upload = createAsyncThunk(
  "auth/profile_image_upload",
  async (image, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/profile-image-upload", image, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const profile_info_add = createAsyncThunk(
  "auth/profile_info_add",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/profile-info-add", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_user_info = createAsyncThunk(
  "auth/get_user_info",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/get-user", { withCredentials: true });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_nvadmin = createAsyncThunk(
  "auth/get_nvadmin",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/get-nvadmin", { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_shipper = createAsyncThunk(
  "auth/get_nvadmin",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-nvadmin`, { withCredentials: true });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_all_customer = createAsyncThunk(
  "auth/get_all_customer",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-all-customers?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const xoa_customer = createAsyncThunk(
  "auth/xoa_customer",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(`/xoa-customer/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const returnRole = (token) => {
  if (token) {
    const decodeToken = jwt(token);
    const expireTime = new Date(decodeToken.exp * 1000);
    if (new Date() > expireTime) {
      localStorage.removeItem("accessToken");
      return "";
    } else {
      return decodeToken.role;
    }
  } else {
    return "";
  }
};

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
    role: returnRole(localStorage.getItem("accessToken")),
    token: localStorage.getItem("accessToken"),
    nvAdmin: [],
    customers: [],
    totalCustomers: 0,
    count_order: 0,
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
    //------------- admin --------------------
    [admin_login.pending]: (state, _) => {
      state.loader = true;
    },
    [admin_login.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [admin_login.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.token = payload.token;
      state.role = returnRole(payload.token);
    },

    //---------------- nhan vien --------------------
    [nvadmin_login.pending]: (state, _) => {
      state.loader = true;
    },
    [nvadmin_login.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [nvadmin_login.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.token = payload.token;
      state.role = returnRole(payload.token);
    },
    [nvadmin_register.pending]: (state, _) => {
      state.loader = true;
    },
    [nvadmin_register.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [nvadmin_register.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.nvAdmin = payload.nvAmin;
      state.successMessage = payload.message;
    },
    // ---------------------

    // -------------------- seller --------------------
    [seller_login.pending]: (state, _) => {
      state.loader = true;
    },

    [seller_login.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [seller_login.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.token = payload.token;
      state.role = returnRole(payload.token);
    },
    [seller_register.pending]: (state, _) => {
      state.loader = true;
    },
    [seller_register.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [seller_register.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.token = payload.token;
      state.role = returnRole(payload.token);
    },
    [get_user_info.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.userInfo = payload.userInfo;
      state.role = payload.userInfo.role;
      state.count_order = payload.count_order;
    },
    [get_nvadmin.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.nvAdmin = payload.userInfo;
    },
    [profile_image_upload.pending]: (state, _) => {
      state.loader = true;
    },
    [profile_image_upload.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.userInfo = payload.userInfo;
      state.successMessage = payload.message;
    },
    [profile_info_add.pending]: (state, _) => {
      state.loader = true;
    },
    [profile_info_add.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.userInfo = payload.userInfo;
      state.successMessage = payload.message;
    },

    // -------------------- shipper --------------------

    [shipper_register.pending]: (state, _) => {
      state.loader = true;
    },
    [shipper_register.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [shipper_register.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
    },

    [shipper_login.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.error;
    },
    [shipper_login.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.token = payload.token;
      state.role = returnRole(payload.token);
    },
    // ----------------- customers ---------------------

    [get_all_customer.pending]: (state, { payload }) => {
      state.loader = true;
    },
    [get_all_customer.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.customers = payload.customers;
      state.totalCustomers = payload.totalCustomers;
    },
    [xoa_customer.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
  },
});
export const { messageClear, user_reset } = authReducer.actions;
export default authReducer.reducer;
