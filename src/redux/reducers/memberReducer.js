/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { createSlice } from "@reduxjs/toolkit";
import {
  getMemberListAPI,
  getMemberAPI,
  updateUserInfoAPI,
} from "../../webAPI/adminAPI";

export const memberSlice = createSlice({
  name: "member",
  initialState: {
    memberList: [],
    member: null,
    errorMessage: "",
    isGettingMemberList: false,
    isGettingMember: false,
  },
  reducers: {
    setMemberList: (state, action) => {
      state.memberList = action.payload;
    },
    setMember: (state, action) => {
      state.member = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setIsGettingMemberList: (state, action) => {
      state.isGettingMemberList = action.payload;
    },
    setIsGettingMember: (state, action) => {
      state.isGettingMember = action.payload;
    },
  },
});

// action
export const {
  setMemberList,
  setMember,
  setErrorMessage,
  setIsGettingMemberList,
  setIsGettingMember,
} = memberSlice.actions;

// redux thunk function

export const getMemberList = () => (dispatch) => {
  dispatch(setMemberList(null));
  dispatch(setIsGettingMemberList(true));
  dispatch(setErrorMessage(""));

  getMemberListAPI()
    .then((res) => {
      if (!res || res.ok === 0) {
        dispatch(setErrorMessage(res ? res.errorMessage : "something wrong"));
        dispatch(setIsGettingMemberList(false));
        return;
      }
      // success
      dispatch(setMemberList(res.data));
      dispatch(setIsGettingMemberList(false));
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

export const getMember = (id) => (dispatch) => {
  dispatch(setMember(null));
  dispatch(setIsGettingMember(true));
  dispatch(setErrorMessage(""));

  getMemberAPI(id)
    .then((res) => {
      if (!res || res.ok === 0) {
        dispatch(setErrorMessage(res ? res.errorMessage : "something wrong"));
        dispatch(setIsGettingMember(false));
        return;
      }
      // success
      console.log(res.data)
      dispatch(setMember(res.data));
      dispatch(setIsGettingMember(false));
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

export const updateMemberAuth = (id, authType) => (dispatch) => {
  dispatch(setErrorMessage(""));
  updateUserInfoAPI(id, null, null, authType).then((res) => {
    console.log(res);
    if (res.ok === 0) return dispatch(setErrorMessage(res.errorMessage));
  });
};

// selector
export const selectMember = (store) => store.member.member;
export const selectMemberList = (store) => store.member.memberList;
export const selectIsGettingMemberList = (store) =>
  store.member.isGettingMemberList;
export const selectIsGettingMember = (store) => store.member.isGettingMember;

export default memberSlice.reducer;
