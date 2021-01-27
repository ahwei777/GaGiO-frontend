/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { createSlice } from '@reduxjs/toolkit';
import { getCartListAPI, addCartItemAPI, deleteCartItemAPI } from '../../webAPI/cartAPI';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartList: [],
    isGettingCartList: false,
    getCartListError: null,
    isAddingCartItem: false,
    addCartItemError: null,
    isDeletingCartItem: false,
    deleteCartItemError: null,
  },
  reducers: {
    setCartList: (state, action) => {
      console.log('setCartList')
      state.cartList = action.payload;
      state.getCartListError = null;
    },
    setIsGettingCartList: (state, action) => {
      state.isGettingCartList = action.payload;
    },
    setGetCartListError: (state, action) => {
      state.getCartListError = action.payload;
    },
    setIsAddingCartItem: (state, action) => {
      state.isAddingCartItem = action.payload;
    },
    setAddCartItemError: (state, action) => {
      state.addCartItemError = action.payload;
    },
    setIsDeletingCartItem: (state, action) => {
      state.isDeletingCartItem = action.payload;
    },
    setDeleteCartItemError: (state, action) => {
      state.deleteCartItemError = action.payload;
    },
  },
});

// action
export const {
  setCartList,
  setIsGettingCartList,
  setGetCartListError,
  setIsAddingCartItem,
  setAddCartItemError,
  setIsDeletingCartItem,
  setDeleteCartItemError
} = cartSlice.actions;

// redux thunk function
export const getCartList = () => (dispatch) => {
  console.log('thunk getCartList')
  dispatch(setIsGettingCartList(true));
  getCartListAPI().then((json) => {
    if (json.ok === 0) {
      dispatch(setCartList([]))
      dispatch(setGetCartListError(json.errorMessage));
      dispatch(setIsGettingCartList(false));
      return;
    }
    dispatch(setCartList(json.data.cart_items))
    dispatch(setIsGettingCartList(false));
  }).catch(err => {
    console.log('err: ', err)
  });
};
export const addCartItem = (id) => async (dispatch) => {
  dispatch(setIsAddingCartItem(true));
  await addCartItemAPI(id).then((json) => {
    if (json.ok === 0) {
      console.log(json.errorMessage)
      dispatch(setAddCartItemError(json.errorMessage));
      dispatch(setIsAddingCartItem(false));
      return;
    }
    dispatch(setAddCartItemError(null));
    dispatch(setIsAddingCartItem(false));
  }).catch(err => {
    console.log('err: ', err)
  });
  dispatch(getCartList());
};
export const deleteCartItem = (id) => async (dispatch) => {
  dispatch(setIsDeletingCartItem(true));
  await deleteCartItemAPI(id).then((json) => {
    if (json.ok === 0) {
      dispatch(setDeleteCartItemError(json.errorMessage));
      dispatch(setIsDeletingCartItem(false));
      return;
    }
    dispatch(setDeleteCartItemError(null));
    dispatch(setIsDeletingCartItem(false));
  }).catch(err => {
    console.log('err: ', err)
  });
  dispatch(getCartList());
};
// selector
export const selectCartList = (store) => store.cart.cartList;

export default cartSlice.reducer;
