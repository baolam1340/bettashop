import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_seller_dashboard_index_data = createAsyncThunk(
  "dashboardIndex/get_seller_dashboard_index_data",
  async ({ sellerId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/seller/get-dashboard-index-data/${sellerId}`,
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

export const get_admin_dashboard_index_data = createAsyncThunk(
  "dashboardIndex/get_admin_dashboard_index_data",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/admin/get-dashboard-index-data`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_shipper_new_order = createAsyncThunk(
  "dashboardIndex/get_shipper_new_order",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/shipper/get-shipper-new-order/${id}`,

        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const comfirm_order_shipper = createAsyncThunk(
  "dashboardIndex/comfirm_order_shipper",
  async ({ orderId, userInfo }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/shipper/comfirm-order/${orderId}`,
        userInfo,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const thongke = createAsyncThunk(
  "order/thongke",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/seller/dashboard-thongke`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const dashboardIndexReducer = createSlice({
  name: "dashboardIndex",
  initialState: {
    totalSale: 0,
    totalOrder: 0,
    totalProduct: 0,
    totalPendingOrder: 0,
    totalSeller: 0,
    recentOrders: [],
    recentMessage: [],
    thongke: [],
    orders: [],
    Total_VanChuyen: 0,
    Total_Orders: 0,
    Total_TimShipper: 0,
    Total_Complete: 0,
    total_thunhap_thang: [],
    result_ngay: [],
    t1: 0,
    t2: 0,
    t3: 0,
    t4: 0,
    t5: 0,
    t6: 0,
    t7: 0,
    t8: 0,
    t9: 0,
    t10: 0,
    t11: 0,
    t12: 0,
    tt1: 0,
    tt2: 0,
    tt3: 0,
    tt4: 0,
    tt5: 0,
    tt6: 0,
    tt7: 0,
    tt8: 0,
    tt9: 0,
    tt10: 0,
    tt11: 0,
    tt12: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    [get_seller_dashboard_index_data.fulfilled]: (state, { payload }) => {
      state.totalSale = payload.totalSale;
      state.totalOrder = payload.totalOrder;
      state.totalProduct = payload.totalProduct;
      state.totalPendingOrder = payload.totalPendingOrder;
      state.recentOrders = payload.recentOrders;
      state.recentMessage = payload.messages;

      state.t1 = payload.t1;
      state.t2 = payload.t2;
      state.t3 = payload.t3;
      state.t4 = payload.t4;
      state.t5 = payload.t5;
      state.t6 = payload.t6;
      state.t7 = payload.t7;
      state.t8 = payload.t8;
      state.t9 = payload.t9;
      state.t10 = payload.t10;
      state.t11 = payload.t11;
      state.t12 = payload.t12;

      state.tt1 = payload.tt1;
      state.tt2 = payload.tt2;
      state.tt3 = payload.tt3;
      state.tt4 = payload.tt4;
      state.tt5 = payload.tt5;
      state.tt6 = payload.tt6;
      state.tt7 = payload.tt7;
      state.tt8 = payload.tt8;
      state.tt9 = payload.tt9;
      state.tt10 = payload.tt10;
      state.tt11 = payload.tt11;
      state.tt12 = payload.tt12;
    },
    [get_admin_dashboard_index_data.fulfilled]: (state, { payload }) => {
      state.totalSale = payload.totalSale;
      state.totalOrder = payload.totalOrder;
      state.totalProduct = payload.totalProduct;
      state.totalSeller = payload.totalSeller;
      state.recentOrders = payload.recentOrders;
      state.recentMessage = payload.messages;
      state.total_thunhap_thang = payload.total_thunhap_thang;
      state.result_ngay = payload.result_ngay;
    },
    [get_shipper_new_order.fulfilled]: (state, { payload }) => {
      state.orders = payload.orders;
      state.Total_Orders = payload.Total_Orders;
      state.Total_VanChuyen = payload.Total_VanChuyen;
      state.Total_TimShipper = payload.Total_TimShipper;
      state.Total_Complete = payload.Total_Complete;
    },
    [comfirm_order_shipper.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
  },
});
export const { messageClear } = dashboardIndexReducer.actions;
export default dashboardIndexReducer.reducer;
