const BASE_URL = "http://localhost:3001/v1";
const token = localStorage.getItem("token");

export const registerAPI = (email, password, confirm, nickname) => {
  return fetch(`${BASE_URL}/user`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      confirm,
      nickname,
    }),
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

export const loginAPI = (email, password) => {
  return fetch(`${BASE_URL}/login`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

export const getMeAPI = () => {
  if (!token) return { ok: 0, errorMessage: "Didn't login" };
  return fetch(`${BASE_URL}/me`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

export const updateUserInfoAPI = (id, email, nickname, authTypeId) => {
  fetch(`${BASE_URL}/user/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: "PATCH",
    body: JSON.stringify({
      email,
      nickname,
      authTypeId,
    }),
  });
};

export const updateUserPasswordAPI = (id, password) => {
  fetch(`${BASE_URL}/user/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: "PATCH",
    body: JSON.stringify({
      password,
    }),
  });
};
