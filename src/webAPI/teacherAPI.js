import { BASE_URL } from '../constants/API_BASE_URL';
import { getAuthToken } from '../utils';

export const getTeacherListAPI = () =>
  fetch(`${BASE_URL}/teachers`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }).then((res) => res.json());

export const getTeacherAPI = (id) =>
  fetch(`${BASE_URL}/teachers/${id}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }).then((res) => res.json());

export const applyTeacherAPI = ({ name, description, avatarUrl }) =>
  fetch(`${BASE_URL}/teachers`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      avatarUrl,
    }),
  }).then((res) => res.json());

  export const updateTeacherInfoAPI = ({ name, description, avatarUrl }) =>
  fetch(`${BASE_URL}/teachers`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      avatarUrl,
    }),
  }).then((res) => res.json());

