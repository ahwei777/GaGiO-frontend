import { BASE_URL } from '../constants/API_BASE_URL';
import { getAuthToken } from '../utils';

export const getCartListAPI = () => {
  return fetch(`${BASE_URL}/carts`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }).then((res) => res.json());
};

export const addCartItemAPI = (id) =>
  fetch(`${BASE_URL}/carts/cart-item/${id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }).then((res) => res.json());

export const deleteCartItemAPI = (id) =>
  fetch(`${BASE_URL}/carts/cart-item/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  }).then((res) => res.json());
