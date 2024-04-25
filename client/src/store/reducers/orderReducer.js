import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const place_order = createAsyncThunk(
  "order/place_order",
  async ({
    totalProducts,
    price,
    products,
    shipping_fee,
    shippingInfo,
    discountPrice,
    couponCode,
    userId,
    navigate,
    items,
  }) => {
    try {
      const { data } = await api.post("/home/order/place-order", {
        totalProducts,
        price,
        products,
        shipping_fee,
        shippingInfo,
        discountPrice,
        couponCode,
        userId,
        navigate,
        items,
      });
      navigate("/payment", {
        state: {
          price: price + shipping_fee,
          items,
          orderId: data.orderId,
        },
      });
      return true;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const get_orders = createAsyncThunk(
  "order/get_orders",
  async ({ customerId, status }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/customer/get-orders/${status}`);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response);
    }
  }
);

export const get_order = createAsyncThunk(
  "order/get_order",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/customer/get-order/${orderId}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const get_order_review = createAsyncThunk(
  "order/get_order_review",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-order-review/${orderId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const get_all_orders = createAsyncThunk(
  "order/get_all_orders",
  async (customerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-all-orders/${customerId}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response);
    }
  }
);

export const huy_order = createAsyncThunk(
  "order/huy_order",
  async ({ orderId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/customer/huy-order/${orderId}`);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response);
    }
  }
);

export const submit_request = createAsyncThunk(
  "order/submit_request",
  async (request, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/home/customer/submit-request`,
        request,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.response);
    }
  }
);

export const get_all_coupon = createAsyncThunk(
  "order/get_all_coupon",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/customer/get-all-coupon`, _, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.response);
    }
  }
);

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    myOrders: [],
    errorMessage: "",
    successMessage: "",
    myOrder: {},
    totalOrders: 0,
    allOrders: [],
    cancelledOrders: [],
    order_complete: {},
    product_complete: [],
    request: {},
    all_coupon: [],
    loader: false,
    order_review: {},
    coupon: {},
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    [get_orders.fulfilled]: (state, { payload }) => {
      state.myOrders = payload.orders;
      state.cancelledOrders = payload.orders;
    },
    [get_order.fulfilled]: (state, { payload }) => {
      state.myOrder = payload.order;
      state.coupon = payload.coupon;
    },
    [get_all_orders.pending]: (state, { payload }) => {
      state.loader = true;
    },
    [get_all_orders.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.allOrders = payload.orders;
      state.order_complete = payload.order_complete;
      state.product_complete = payload.product_complete;
    },
    [huy_order.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [submit_request.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
      state.request = payload.request;
    },
    [get_all_coupon.fulfilled]: (state, { payload }) => {
      state.all_coupon = payload.all_coupon;
    },
    [get_order_review.fulfilled]: (state, { payload }) => {
      state.order_review = payload.order_review_detail;
    },
  },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
