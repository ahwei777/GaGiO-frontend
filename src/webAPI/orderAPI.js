import { BASE_URL } from '../constants/api';
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
  const token = localStorage.getItem('token');
  return fetch(`${BASE_URL}/users/me/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};
