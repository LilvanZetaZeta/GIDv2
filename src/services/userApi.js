import { api } from './api';

export const getProfile = (userId) => api.get(`/api/v1/users/${userId}`);
export const updateProfile = (userId, profileData) => api.put(`/api/v1/users/${userId}`, profileData);
// Admin
export const getAllUsers = () => api.get('/api/v1/users/admin/all');
export const updateUserRole = (userId, role) => api.put(`/api/v1/users/admin/${userId}/role`, { role });