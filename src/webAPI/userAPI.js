import { BASE_URL } from '../constants/API_BASE_URL';
import { getAuthToken } from '../utils';

export const registerAPI = (email, password, nickname) =>
  fetch(`${BASE_URL}/users/register`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
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
  }).then((res) => res.json());

export const updateMyInfoAPI = (nickname) =>
  fetch(`${BASE_URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
    method: 'PATCH',
    body: JSON.stringify({
      nickname,
    }),
  }).then((res) => res.json());

export const updateMyPasswordAPI = (oldPassword, newPassword) =>
  fetch(`${BASE_URL}/users/password/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
    method: 'PATCH',
    body: JSON.stringify({
      oldPassword,
      newPassword,
    }),
  }).then((res) => res.json());

export const updateUserAuthAPI = (id, AuthTypeId) =>
  fetch(`${BASE_URL}/users/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`,
    },
    method: 'PATCH',
    body: JSON.stringify({
      AuthTypeId,
    }),
  }).then((res) => res.json());
