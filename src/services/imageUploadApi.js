import axios from 'axios';

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
const IMGBB_URL = import.meta.env.VITE_IMGBB_URL;

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  try {
    const response = await axios.post(`${IMGBB_URL}?key=${IMGBB_API_KEY}`, formData);
    return response.data.data.url; 
  } catch (error) {
    throw new Error("No se pudo subir la imagen.");
  }
};