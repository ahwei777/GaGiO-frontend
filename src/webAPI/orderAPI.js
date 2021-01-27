import { BASE_URL } from '../constants/API_BASE_URL';
import { getAuthToken } from '../utils';

export const sendOrderAPI = (data) => {
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const getMyOrderListAPI = () => {
  return fetch(`${BASE_URL}/orders/me`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};
