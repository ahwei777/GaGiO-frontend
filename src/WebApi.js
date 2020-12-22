const BASE_URL = "http://localhost:3001/v1";

export const register = (email, password, confirm, nickname) => {
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

export const login = (email, password) => {
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
