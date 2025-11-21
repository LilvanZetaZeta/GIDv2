import { api } from './api';

export const getCart = (userId) => api.get(`/api/v1/cart/${userId}`);
export const addItemToCart = (userId, productId, quantity) => api.post(`/api/v1/cart/${userId}`, { productId, quantity });
export const removeItemFromCart = (cartItemId) => api.delete(`/api/v1/cart/item/${cartItemId}`);