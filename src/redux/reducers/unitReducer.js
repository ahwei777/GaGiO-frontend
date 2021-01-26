/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { createSlice } from "@reduxjs/toolkit";
import { getUnitListAPI, updateUnitListAPI } from "../../webAPI/courseAPI";

export const unitSlice = createSlice({
  name: "unit",
  initialState: {
    unit: null,
    unitList: null,
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
    setUnitList: (state, action) => {
      state.unitList = action.payload;
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
  setUnitList,
  setErrorMessage,
  setIsLoading,
} = unitSlice.actions;

// redux thunk function
export const getUnitListByCourseId = (courseId) => (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(setCourse(null));
  dispatch(setUnit(null));
  dispatch(setUnitList(null));
  dispatch(setErrorMessage(""));
  console.log("reducer");
  getUnitListAPI(courseId)
    .then((course) => {
      if (course.ok === 0) {
        dispatch(setErrorMessage("cannot find course"));
        dispatch(setIsLoading(false));
        return;
      }
      // success
      dispatch(setUnit(course.data.unit_list[0]));
      dispatch(setUnitList(course.data.unit_list));
      dispatch(setCourse(course.data));
      dispatch(setIsLoading(false));
    })
    .catch((err) => {
      dispatch(setIsLoading(false));
      console.log("err: ", err);
    });
};
export const getUnitByUnitId = (course, unitId) => (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(setUnit(course.unit_list[unitId]));
  dispatch(setIsLoading(false));
};
export const updateLocalUnitList = (unitList) => (dispatch) => {
  dispatch(setUnitList(unitList));
};
export const updateUnitList = (courseId, unitList) => (dispatch) => {
  if (!courseId || !unitList) return console.log("no required info");
  updateUnitListAPI(courseId, unitList)
    .then((json) => {
      if (json.ok === 0) {
        console.log(json);
        return;
      }
      // success
      console.log("更新單元列表成功");
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

// selector
export const selectUnit = (store) => store.unit.unit;
export const selectUnitList = (store) => store.unit.unitList;
export const selectCourse = (store) => store.unit.course;
export const selectErrorMessage = (store) => store.unit.errorMessage;
export const selectIsLoading = (store) => store.unit.isLoading;

export default unitSlice.reducer;
