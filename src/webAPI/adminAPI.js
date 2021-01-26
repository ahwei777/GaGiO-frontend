const BASE_URL = 'http://localhost:3001/v1';
const getAuthToken = () => localStorage.getItem('token');

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