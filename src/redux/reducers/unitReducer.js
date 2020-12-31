/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { createSlice } from "@reduxjs/toolkit";
import { getUnitListAPI } from "../../WebApi";

export const unitSlice = createSlice({
  name: "unit",
  initialState: {
    unit: null,
    course: null,
    isLoading: false,
    errorMessage: "",
  },
  reducers: {
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setUnit: (state, action) => {
      state.unit = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// action
export const {
  setCourse,
  setUnit,
  setErrorMessage,
  setIsLoading,
} = unitSlice.actions;

// redux thunk function
export const getUnitListByCourse = (courseId) => (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(setCourse(null));
  dispatch(setUnit(null));
  dispatch(setErrorMessage(""));
  console.log("reducer");
  getUnitListAPI(courseId).then((course) => {
    if (course.ok === 0) return dispatch(setErrorMessage("cannot find course"));
    dispatch(setUnit(course.data.unit_list[0]));
    dispatch(setCourse(course.data));
    dispatch(setIsLoading(false));
  });
};
export const getUnitByUnitId = (course, unitId) => (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(setUnit(course.unit_list[unitId]));
  dispatch(setIsLoading(false));
};
// selector

export const selectUnit = (store) => store.unit.unit;
export const selectCourse = (store) => store.unit.course;
export const selectErrorMessage = (store) => store.unit.errorMessage;
export const selectIsLoading = (store) => store.unit.isLoading;

export default unitSlice.reducer;
