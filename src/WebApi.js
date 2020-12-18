const BASE_URL = "localhost:3001/v1";

export const register = (username, password, confirm, nickname) => {
  return fetch(`${BASE_URL}/user`, {
    method: "POST",
    body: {
      username,
      password,
      confirm,
      nickname,
    },
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    body: {
      email,
      password,
    },
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};
