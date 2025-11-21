import { api } from './api';


// CORRECCIÓN: Incluimos userId en la URL para coincidir con el backend
export const createOrder = (userId, paymentMethod) => {
    return api.post(`/api/v1/orders/${userId}/checkout`, { paymentMethod });
  };
  
  export const getUserOrderHistory = (userId) => {
    // Si tu backend usa /users/{id}/orders, usa esta línea:
    // return api.get(`/api/v1/users/${userId}/orders`);
    
    // Si tu backend usa /users/profile/orders (con token), usa esta:
    return api.get('/api/v1/users/profile/orders');
  };
  
  export const getOrderById = (orderId) => {
    return api.get(`/api/v1/orders/${orderId}`);
  };
  
  // Admin
  export const getAllOrders = () => {
    return api.get('/api/v1/orders/admin/all');
  };
  
  export const updateOrderStatus = (orderId, status) => {
    return api.put(`/api/v1/orders/admin/${orderId}/status`, { status });
  };