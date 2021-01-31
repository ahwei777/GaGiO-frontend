import { BASE_URL } from '../constants/API_BASE_URL';
import { getAuthToken } from '../utils';

export const getCourseListAPI = ({
  keyword = '',
  page = '',
  limit='',
  sort = 'id',
  order = 'ASC',
  getPublic = '',
} = {}) => {
  console.log('keyword', keyword);
  return fetch(
    `${BASE_URL}/courses?_keyword=${keyword}&_sort=${sort}&_order=${order}&_page=${page}&_limit=${limit}&_public=${getPublic}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  ).then((res) => res.json());
};

export const getCourseAPI = (id) =>
  fetch(`${BASE_URL}/courses/${id}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }).then((res) => res.json());

export const addCourseAPI = (title, price, description, imgUrl) =>
  fetch(`${BASE_URL}/courses`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title,
      price,
      description,
      imgUrl,
    }),
  }).then((res) => res.json());

// XX
export const deleteCourseAPI = (id) =>
  fetch(`${BASE_URL}/courses/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }).then((res) => res.json());

export const updateCourseAPI = (
  courseId,
  { title, price, description, isPublic, unit_list, imgUrl }
) =>
  fetch(`${BASE_URL}/courses/${courseId}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({
      title,
      price,
      description,
      isPublic,
      unit_list,
      imgUrl,
    }),
  }).then((res) => res.json());

//XX
export const addUnitListAPI = (courseId) =>
  fetch(`${BASE_URL}/unit`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ courseId, unit_list: [] }),
  }).then((res) => res.json());

//XX
export const getUnitListAPI = (courseId) =>
  fetch(`${BASE_URL}/courses/${courseId}/units`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }).then((res) => res.json());

//XX
export const updateUnitListAPI = (courseId, unitList) =>
  fetch(`${BASE_URL}/courses/${courseId}/units`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({
      unit_list: unitList,
    }),
  }).then((res) => res.json());

export const getMyCourseListAPI = () =>
  fetch(`${BASE_URL}/courses/bought-courses/me`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }).then((res) => res.json());

export const getMyTeachCourseListAPI = () =>
  fetch(`${BASE_URL}/courses/teach-courses/me`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }).then((res) => res.json());

export const getDetailCourseAPI = (courseId) =>
  fetch(`${BASE_URL}/courses/detail/${courseId}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }).then((res) => res.json());

export const getUnitByUnitIdAPI = (courseId, unitId) =>
  fetch(`${BASE_URL}/courses/${courseId}/units/${unitId}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }).then((res) => res.json());

export const updateUnitByUnitIdAPI = (courseId, unitId, unit) =>
  fetch(`${BASE_URL}/courses/${courseId}/units/${unitId}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({
      unit,
    }),
  }).then((res) => res.json());
