import { api } from './api';

export const loginUser = (email, password) => api.post('/api/v1/users/login', { email, password });
export const registerUser = (userData) => api.post('/api/v1/users/register', userData);