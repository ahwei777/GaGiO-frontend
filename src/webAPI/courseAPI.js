import { BASE_URL } from '../constants/api';
import { getAuthToken } from '../utils';

export const getCourseListAPI = () => {
  return fetch(`${BASE_URL}/courses`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }).then((res) => res.json());
};

export const getCourseAPI = (id) =>
  fetch(`${BASE_URL}/courses/${id}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }).then((res) => res.json());

export const addCourseAPI = (title, price, description) =>
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
    }),
  }).then((res) => res.json());

export const deleteCourseAPI = (id) =>
  fetch(`${BASE_URL}/courses/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }).then((res) => res.json());

export const updateCourseAPI = (id, title, price, description, isPublic) =>
  fetch(`${BASE_URL}/courses/${id}`, {
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
    }),
  }).then((res) => res.json());

export const addUnitListAPI = (courseId) =>
  fetch(`${BASE_URL}/unit`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ courseId, unit_list: [] }),
  }).then((res) => res.json());

export const getUnitListAPI = (courseId) =>
  fetch(`${BASE_URL}/unit?courseId=${courseId}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }).then((res) => res.json());

export const updateUnitListAPI = (courseId, unitList) =>
  fetch(`${BASE_URL}/unit/${courseId}`, {
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
  fetch(`${BASE_URL}/users/me/bought-courses`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }).then((res) => res.json());
