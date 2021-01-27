import { BASE_URL } from '../constants/API_BASE_URL';
import { getAuthToken } from '../utils';

export const getMemberListAPI = () => {
  return fetch(`${BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }).then((res) => res.json());
};

export const getMemberAPI = (id) => {
  return fetch(`${BASE_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      "content-type": "application/json",
    },
  }).then((res) => res.json());
};

export const updateUserInfoAPI = (id, email, nickname, AuthTypeId) =>
  fetch(`${BASE_URL}/users/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
    method: 'PATCH',
    body: JSON.stringify({
      email,
      nickname,
      AuthTypeId,
    }),
  })
    .then((res) => res.json())