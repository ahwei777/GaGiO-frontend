/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { createSlice } from "@reduxjs/toolkit";
import { login as loginApi, register as registerApi } from "../../WebApi";

export const userSlice = createSlice({
  name: "user",
  initialState: { user: {}, errorMessage: "" },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.user = action.payload;
    },
  },
});

// action
export const { setUser, setErrorMessage } = userSlice.actions;

// redux thunk function
export const login = (email, password) => (dispatch) => {
  if (!email || !password) return setErrorMessage("missing field");
  loginApi(email, password).then((res) => {
    if (res.ok === 0) return setErrorMessage(res.errorMessage);
    const token = res.data.user.token;
    dispatch(setUser(res.data.user));
    localStorage.setItem("token", token);
  });
};
export const register = (email, password, confirm, nickname) => (dispatch) => {
  if (!email || !password || !confirm || !nickname)
    return console.log("missing field");
  registerApi(email, password, confirm, nickname).then((res) => {
    if (res.ok === 0) return console.log(res.errorMessage);
    const token = res.data.user.token;
    dispatch(setUser(res.data.user));
    localStorage.setItem("token", token);
  });
};
export const logout = () => (dispatch) => {
  dispatch(setUser({}));
  localStorage.setItem("token", null);
};
// selector
export const selectUser = (store) => store.user.user;
export const selectErrorMessage = (store) => store.user.errorMessage;

export default userSlice.reducer;
