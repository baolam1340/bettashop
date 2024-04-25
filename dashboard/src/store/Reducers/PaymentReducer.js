import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_seller_paymemt_details = createAsyncThunk(
  "payment/get_seller_payemt_details",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/payment/seller-payment-details/${sellerId}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const send_withdrawal_request = createAsyncThunk(
  "payment/send_withdrawal_request",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/payment/withdrawal-request`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_payment_request = createAsyncThunk(
  "payment/get_payment_request",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/payment/request`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const confirm_payment_request = createAsyncThunk(
  "payment/confirm_payment_request",
  async (paymentId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/payment/request-confirm`,
        { paymentId },
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const PaymentReducer = createSlice({
  name: "payment",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    pendingwithdraws: [],
    successwithdraws: [],
    totalAmount: 0,
    withdrawAmount: 0,
    pendingAmount: 0,
    availableAmount: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    [get_seller_paymemt_details.fulfilled]: (state, { payload }) => {
      state.pendingwithdraws = payload.pendingWithdraws;
      state.successwithdraws = payload.successWithdraws;
      state.totalAmount = payload.totalAmount;
      state.availableAmount = payload.availableAmount;
      state.withdrawAmount = payload.withdrawAmount;
      state.pendingAmount = payload.pendingAmount;
    },
    [send_withdrawal_request.pending]: (state, _) => {
      state.loader = true;
    },
    [send_withdrawal_request.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    },
    [send_withdrawal_request.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.pendingwithdraws = [...state.pendingwithdraws, payload.withdrawal];
      state.availableAmount = state.availableAmount - payload.withdrawal.amount;
      state.pendingAmount = payload.withdrawal.amount;
    },
    [get_payment_request.fulfilled]: (state, { payload }) => {
      state.pendingwithdraws = payload.withdrawalRequest;
    },

    [confirm_payment_request.pending]: (state, _) => {
      state.loader = true;
    },
    [confirm_payment_request.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    },
    [confirm_payment_request.fulfilled]: (state, { payload }) => {
      const temp = state.pendingwithdraws.filter(
        (r) => r._id !== payload.payment._id
      );
      state.loader = false;
      state.successMessage = payload.message;
      state.pendingwithdraws = temp;
    },
  },
});
export const { messageClear } = PaymentReducer.actions;
export default PaymentReducer.reducer;
