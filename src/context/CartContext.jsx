import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Importamos el hook desde AuthContext (asegúrate que la ruta sea correcta)
import { useAuth } from './AuthContext'; 
import { getCart, addItemToCart, removeItemFromCart } from '../services/cartApi';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchCart = async () => {
    if (user) {
      try {
        const response = await getCart(user.id);
        setCart(response.data);
      } catch (error) {
        console.error("Error al cargar carrito:", error);
      }
    } else {
      setCart(null);
    }
  };

  useEffect(() => { fetchCart(); }, [user]);

  const addToCart = async (productId, quantity) => {
    if (!user) {
        toast.error("Inicia sesión para comprar");
        navigate('/login');
        return;
    }

    // Validación de Stock Local
    const existingItem = cart?.items?.find(item => item.product.id === productId);
    if (existingItem) {
        if (Number(existingItem.quantity) + Number(quantity) > Number(existingItem.product.stock)) {
            toast.error(`Stock insuficiente. Máximo: ${existingItem.product.stock}`);
            return;
        }
    }

    setLoading(true);
    try {
      const response = await addItemToCart(user.id, productId, quantity);
      setCart(response.data);
      toast.success("Agregado al carrito.");
    } catch (error) {
      const msg = error.response?.data?.message || "Error al agregar.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (cartItemId) => {
    setLoading(true);
    try {
      const response = await removeItemFromCart(cartItemId);
      setCart(response.data);
      toast.success("Eliminado.");
    } catch (error) { toast.error("Error al eliminar."); } 
    finally { setLoading(false); }
  };

  const clearLocalCart = () => setCart(null);
  const reloadCart = () => fetchCart();

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearLocalCart, loading, reloadCart }}>
      {children}
    </CartContext.Provider>
  );
};