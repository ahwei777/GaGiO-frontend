import { BASE_URL } from '../constants/api';
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
