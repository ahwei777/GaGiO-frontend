/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { createSlice } from "@reduxjs/toolkit";
import { sendOrderAPI, getMyOrderListAPI } from "../../webAPI/orderAPI";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderResponse: null,
    isSendingOrder: false,
    sendingOrderError: null,
    orderList: null,
  },
  reducers: {
    setOrderResponse: (state, action) => {
      state.orderResponse = action.payload;
    },
    setIsSendingOrder: (state, action) => {
      state.isSendingOrder = action.payload;
    },
    setSendingOrderError: (state, action) => {
      state.sendingOrderError = action.payload;
    },
    setOrderList: (state, action) => {
      state.orderList = action.payload;
    },
  },
});

// action
export const {
  setOrderResponse,
  setIsSendingOrder,
  setSendingOrderError,
  setOrderList,
} = orderSlice.actions;

// redux thunk function
export const sendOrder = (data) => (dispatch) => {
  return sendOrderAPI(data)
    .then((json) => {
      return json
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

export const getMyOrderList = () => (dispatch) => {
  return getMyOrderListAPI().then((orderList) => {
    if (orderList.ok === 0)
      return dispatch(setSendingOrderError(orderList.errorMessage));
    dispatch(setOrderList(orderList.data));
  });
};

// selector
export const selectOrderResponse = (store) => store.order.orderResponse;
export const selectOrderList = (store) => store.order.orderList;

export default orderSlice.reducer;
