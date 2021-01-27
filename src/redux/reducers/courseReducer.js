/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { createSlice } from "@reduxjs/toolkit";
import {
  getCourseListAPI,
  getCourseAPI,
  addCourseAPI,
  updateCourseAPI,
  getMyCourseListAPI,
  getMyTeachCourseListAPI,
  getDetailCourseAPI,
  getUnitByUnitIdAPI,
  updateUnitByUnitIdAPI
} from "../../webAPI/courseAPI";

export const courseSlice = createSlice({
  name: "course",
  initialState: {
    isGettingCourse: false,
    getCourseError: null,
    courseList: [],
    course: null,
    myCourseList: null,
    myTeachCourseList: null,
    detailCourse: null,
    unit: null,
  },
  reducers: {
    setCourseList: (state, action) => {
      state.courseList = action.payload;
      state.getCourseError = null;
    },
    setIsGettingCourse: (state, action) => {
      state.isGettingCourse = action.payload;
    },
    setGetCourseError: (state, action) => {
      state.getCourseError = action.payload;
    },
    setCourse: (state, action) => {
      state.course = action.payload;
      state.getCourseError = null;
    },
    setMyCourseList: (state, action) => {
      state.myCourseList = action.payload;
      state.getCourseError = null;
    },
    setMyTeachCourseList: (state, action) => {
      state.myTeachCourseList = action.payload;
      state.getCourseError = null;
    },
    setDetailCourse: (state, action) => {
      state.detailCourse = action.payload;
      state.getCourseError = null;
    },
    setUnit: (state, action) => {
      state.unit = action.payload;
      state.getCourseError = null;
    },
  },
});

// action
export const {
  setIsGettingCourse,
  setGetCourseError,
  setCourseList,
  setCourse,
  setMyCourseList,
  setMyTeachCourseList,
  setDetailCourse,
  setUnit
} = courseSlice.actions;

// redux thunk function
export const getCourseList = (params) => (dispatch) => {
  dispatch(setIsGettingCourse(true));
  getCourseListAPI(params)
    .then((json) => {
      if (json.ok === 0) {
        dispatch(setGetCourseError(json.errorMessage));
        dispatch(setIsGettingCourse(false));
        return;
      }
      // success
      dispatch(setCourseList(json.data));
      dispatch(setIsGettingCourse(false));
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};
export const getCourse = (id) => (dispatch) => {
  dispatch(setIsGettingCourse(true));
  getCourseAPI(id)
    .then((json) => {
      if (json.ok === 0) {
        dispatch(setGetCourseError(json.errorMessage));
        dispatch(setIsGettingCourse(false));
        return;
      }
      // success
      dispatch(setCourse(json.data));
      dispatch(setIsGettingCourse(false));
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};
export const getMyCourseList = () => (dispatch) => {
  dispatch(setIsGettingCourse(true));
  getMyCourseListAPI()
    .then((json) => {
      if (json.ok === 0) {
        dispatch(setGetCourseError(json.errorMessage));
        dispatch(setIsGettingCourse(false));
        return;
      }
      // success
      dispatch(setMyCourseList(json.data));
      dispatch(setIsGettingCourse(false));
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};
export const getMyTeachCourseList = () => (dispatch) => {
  dispatch(setIsGettingCourse(true));
  getMyTeachCourseListAPI()
    .then((json) => {
      if (json.ok === 0) {
        dispatch(setGetCourseError(json.errorMessage));
        dispatch(setIsGettingCourse(false));
        return;
      }
      // success
      dispatch(setMyTeachCourseList(json.data));
      dispatch(setIsGettingCourse(false));
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};



export const addCourse = ({ title, description, price, imgUrl }) => (dispatch) => {
  return addCourseAPI(title, price, description, imgUrl)
    .then((json) => {
      return json
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

export const updateCourse = (courseId, {title, price, description, isPublic, unit_list, imgUrl }) => (
  dispatch
) => {
  if (!courseId || !title || price < 0 || !description || isPublic === undefined || !unit_list || !imgUrl) return;
  return updateCourseAPI(courseId, {title, price, description, isPublic, unit_list, imgUrl})
    .then((json) => {
      return json;
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};


export const getDetailCourse = (courseId) => (dispatch) => {
  dispatch(setIsGettingCourse(true));
  getDetailCourseAPI(courseId)
    .then((json) => {
      if (json.ok === 0) {
        dispatch(setGetCourseError(json.errorMessage));
        dispatch(setIsGettingCourse(false));
        return;
      }
      // success
      dispatch(setDetailCourse({...json.data, unit_list: JSON.parse(json.data.unit_list)}));
      dispatch(setIsGettingCourse(false));
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

export const getUnitByUnitId = (courseId, unitId) => (dispatch) => {
  dispatch(setIsGettingCourse(true));
  getUnitByUnitIdAPI(courseId, unitId)
    .then((json) => {
      if (json.ok === 0) {
        dispatch(setGetCourseError(json.errorMessage));
        dispatch(setIsGettingCourse(false));
        return;
      }
      // success
      dispatch(setUnit(json.data));
      dispatch(setIsGettingCourse(false));
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

export const updateUnitByUnitId = (courseId, unitId, unit) => (dispatch) => {
  dispatch(setIsGettingCourse(true));
  return updateUnitByUnitIdAPI(courseId, unitId, unit)
    .then((json) => {
      if (json.ok === 0) {
        dispatch(setGetCourseError(json.errorMessage));
        dispatch(setIsGettingCourse(false));
        return json;
      }
      // success
      dispatch(setIsGettingCourse(false));
      return json;
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

// selector
export const selectIsGettingCourse = (store) => store.course.isGettingCourse;
export const selectCourseList = (store) => store.course.courseList;
export const selectCourse = (store) => store.course.course;
export const selectMyCourseList = (store) => store.course.myCourseList;
export const selectMyTeachCourseList = (store) => store.course.myTeachCourseList;
export const selectDetailCourse = (store) => store.course.detailCourse;
export const selectUnit = (store) => store.course.unit;

export default courseSlice.reducer;
