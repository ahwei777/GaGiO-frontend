/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { createSlice } from '@reduxjs/toolkit';
import {
  getTeacherListAPI,
  getTeacherAPI,
  applyTeacherAPI,
  updateTeacherInfoAPI
} from '../../webAPI/teacherAPI';

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState: {
    teacherList: [],
    isGettingTeacherList: false,
    getTeacherListError: null,
    teacher: null,
    isGettingTeacher: false,
    getTeacherError: null,
  },
  reducers: {
    setTeacherList: (state, action) => {
      state.teacherList = action.payload;
      state.getTeacherListError = null;
    },
    setIsGettingTeacherList: (state, action) => {
      state.isGettingTeacherList = action.payload;
    },
    setGetTeacherListError: (state, action) => {
      state.getTeacherListError = action.payload;
    },
    setTeacher: (state, action) => {
      state.teacher = action.payload;
      state.getTeacherError = null;
    },
    setIsGettingTeacher: (state, action) => {
      state.isGettingTeacher = action.payload;
    },
    setGetTeacherError: (state, action) => {
      state.getTeacherError = action.payload;
    },
  },
});

// action
export const {
  setTeacherList,
  setIsGettingTeacherList,
  setGetTeacherListError,
  setTeacher,
  setIsGettingTeacher,
  setGetTeacherError,
} = teacherSlice.actions;

// redux thunk function
export const getTeacherList = () => (dispatch) => {
  dispatch(setIsGettingTeacherList(true));
  getTeacherListAPI()
    .then((json) => {
      if (json.ok === 0) {
        dispatch(setGetTeacherListError(json.errorMessage));
        dispatch(setIsGettingTeacherList(false));
        return;
      }
      // success
      dispatch(setTeacherList(json.data.teacherList));
      dispatch(setIsGettingTeacherList(false));
    })
    .catch((err) => {
      console.log('err: ', err);
    });
};
export const getTeacher = (id) => (dispatch) => {
  dispatch(setIsGettingTeacher(true));
  getTeacherAPI(id)
    .then((json) => {
      if (json.ok === 0) {
        dispatch(setGetTeacherError(json.errorMessage));
        dispatch(setIsGettingTeacher(false));
        return;
      }
      // success
      dispatch(setTeacher(json.data.teacher));
      dispatch(setIsGettingTeacher(false));
    })
    .catch((err) => {
      console.log('err: ', err);
    });
};
export const applyTeacher = ({name, description, avatarUrl}) => (dispatch) => {
  console.log(name)
  dispatch(setIsGettingTeacher(true));
  return applyTeacherAPI({name, description, avatarUrl})
    .then((json) => {
      return json;
    })
    .catch((err) => {
      console.log('err: ', err);
    });
};
export const updateTeacherInfo = ({name, description, avatarUrl}) => (dispatch) => {
  return updateTeacherInfoAPI({name, description, avatarUrl})
  .then((json) => {
    return json;
  })
  .catch((err) => {
    console.log('err: ', err);
  });
};

// selector
export const selectTeacherList = (store) => store.teacher.teacherList;
export const selectIsGettingTeacherList = (store) =>
  store.teacher.isGettingTeacherList;
export const selectTeacher = (store) => store.teacher.teacher;
export const selectIsGettingTeacher = (store) => store.teacher.isGettingTeacher;

export default teacherSlice.reducer;
