/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { createSlice } from "@reduxjs/toolkit";
import {} from "../../WebApi";

export const unitSlice = createSlice({
  name: "unit",
  initialState: { unit: null, errorMessage: "" },
  reducers: {
    setUnit: (state, action) => {
      state.user = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

// action
export const { setUnit, setErrorMessage } = unitSlice.actions;

// redux thunk function
export const getUnitByCourse = (courseId) => (dispatch) => {
  setUnit(null);
  setErrorMessage("");
};
// selector
export const selectUnit = (store) => store.unit.unit;
export const selectErrorMessage = (store) => store.unit.errorMessage;

export default unitSlice.reducer;
