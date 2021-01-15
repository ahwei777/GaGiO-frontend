import { BASE_URL } from '../constants/api';
import { getAuthToken } from '../utils';

export const registerAPI = (email, password, confirm, nickname) =>
  fetch(`${BASE_URL}/users/register`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      confirm,
      nickname,
    }),
  }).then((res) => res.json());

export const loginAPI = (email, password) =>
  fetch(`${BASE_URL}/users/login`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => res.json());

export const getMeAPI = () =>
  fetch(`${BASE_URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));

export const updateUserInfoAPI = (id, email, nickname, AuthTypeId) =>
  fetch(`${BASE_URL}/user/${id}`, {
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
    .catch((error) => console.log(error));

export const updateUserPasswordAPI = (id, password) =>
  fetch(`${BASE_URL}/user/password/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
    method: 'PATCH',
    body: JSON.stringify({
      password,
    }),
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));

export const getAllUserAPI = () => {
  return fetch(`${BASE_URL}/user`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }).then((res) => res.json());
};

export const getUserAPI = (id) => {
  return fetch(`${BASE_URL}/user/${id}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      'content-type': 'application/json',
    },
  }).then((res) => res.json());
};

export const getMemberListAPI = () => {
  return fetch(`${BASE_URL}/user`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }).then((res) => res.json());
};

export const getMemberAPI = (id) => {
  return fetch(`${BASE_URL}/user/${id}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      'content-type': 'application/json',
    },
  }).then((res) => res.json());
};
