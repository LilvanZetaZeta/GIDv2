import { api } from './api';

export const getProducts = (category) => {
    const url = category ? `/api/v1/products?category=${category}` : '/api/v1/products';
    return api.get(url);
  };
  
  export const getProductById = (id) => {
    return api.get(`/api/v1/products/${id}`);
  };
  
  export const createProduct = (productData) => {
    return api.post('/api/v1/products', productData);
  };
  
  // --- NUEVOS MÉTODOS PARA EDICIÓN Y BORRADO ---
  
  export const updateProduct = (id, productData) => {
    return api.put(`/api/v1/products/${id}`, productData);
  };
  
  export const deleteProduct = (id) => {
    return api.delete(`/api/v1/products/${id}`);
  };