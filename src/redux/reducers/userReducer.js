/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { createSlice } from '@reduxjs/toolkit';
import {
  loginAPI,
  registerAPI,
  getMeAPI,
  updateMyInfoAPI,
  updateMyPasswordAPI,
  updateUserAuthAPI,
} from '../../webAPI/userAPI';
import { getCartList, setCartList } from './cartReducer';
import { setAuthToken } from '../../utils';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    // 初始值設為 null 避免 render header 時因為還在確認使用者身分而跳字
    isGettingUser: null,
    errorMessage: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsGettingUser(state, action) {
      state.isGettingUser = action.payload;
    },
    setUserErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

// action
export const {
  setUser,
  setIsGettingUser,
  setUserErrorMessage,
} = userSlice.actions;

// redux thunk function
export const getMe = () => async (dispatch, getState) => {
  const { isGettingUser } = getState();
  if (!isGettingUser) {
    // start
    dispatch(setIsGettingUser(true));
  }
  await getMeAPI().then((json) => {
    if (json.ok === 0) {
      dispatch(setUser(null));
      dispatch(setUserErrorMessage(json.errorMessage));
      // finish
      return dispatch(setIsGettingUser(false));
    }
    dispatch(getCartList());
    dispatch(setUser(json.data));
  });
  // finish
  return dispatch(setIsGettingUser(false));
};

export const login = (email, password) => (dispatch) => {
  if (!email || !password) {
    return dispatch(setUserErrorMessage('missing field'));
  }
  // start
  dispatch(setIsGettingUser(true));
  return loginAPI(email, password).then((json) => {
    if (json.ok === 1) {
      //dispatch(setUserErrorMessage(json.errorMessage));
      // finish
      //return dispatch(setIsGettingUser(false));
      setAuthToken(json.token);
    }
    return json;
  });
};
export const register = (email, password, nickname) => (dispatch) => {
  if (!email || !password || !nickname) {
    return dispatch(setUserErrorMessage('missing field'));
  }
  return registerAPI(email, password, nickname).then((json) => {
    if (json.ok === 1) {
      // finish
      setAuthToken(json.token);
      //return dispatch(getMe());
    }
    //dispatch(setUserErrorMessage(json.errorMessage));
    // return dispatch(setIsGettingUser(false));
    return json;
  });
};
export const logout = () => (dispatch) => {
  setAuthToken('');
  dispatch(setUser(null));
  dispatch(setCartList([]));
};

export const updateMyInfo = (nickname) => (dispatch) => {
  return updateMyInfoAPI(nickname).then((res) => {
    return res;
  });
};

export const updateMyPassword = (oldPassword, newPassword) => (dispatch) => {
  // 前端已完成確認密碼
  return updateMyPasswordAPI(oldPassword, newPassword).then((res) => {
    return res;
  });
};

export const updateUserAuth = (id, email, nickname, authType) => (dispatch) => {
  updateUserAuthAPI(id, email, nickname, authType).then((res) => {
    if (res.ok === 0) {
      return dispatch(setUserErrorMessage(res.errorMessage));
    }
  });
};

// selector
export const selectUser = (store) => store.user.user;
export const selectUserErrorMessage = (store) => store.user.errorMessage;

export default userSlice.reducer;
