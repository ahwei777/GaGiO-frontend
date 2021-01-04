/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { createSlice } from '@reduxjs/toolkit';
import { sendOrderAPI } from '../../WebApi';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderResponse: null,
    isSendingOrder: false,
    sendingOrderError: null,
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
  },
});

// action
export const {
  setOrderResponse,
  setIsSendingOrder,
  setSendingOrderError,
} = orderSlice.actions;

// redux thunk function
export const sendOrder = (data) => (dispatch) => {
  dispatch(setIsSendingOrder(true));
  return sendOrderAPI(data).then((json) => {
    if (json.ok === 0) {
      dispatch(setOrderResponse(null))
      dispatch(setSendingOrderError(json.errorMessage));
      dispatch(setIsSendingOrder(false));
      return;
    }
    console.log(json)
    dispatch(setOrderResponse(json.data.orderNumber));
    dispatch(setSendingOrderError(null));
    dispatch(setIsSendingOrder(false));
  }).catch(err => {
    console.log('err: ', err)
  });
};

// selector
export const selectOrderResponse = (store) => store.order.orderResponse;

export default orderSlice.reducer;
