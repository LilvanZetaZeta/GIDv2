import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productApi';
import { ProductGrid } from '../components/organisms/ProductGrid';
import { Typography } from '../components/atoms/Typography';


export const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    getProducts()
      .then(response => {
        if (response && response.data) {
            setProducts(response.data);
        }
      })
      .catch(err => {
        console.error("Error silencioso cargando productos:", err);
        // No mostramos error al usuario, dejamos que ProductGrid muestre el estado vacío/skeleton
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Typography variant="h1">Nuestros Productos</Typography>
      {/* Ya no pasamos error, solo loading y productos */}
      <ProductGrid products={products} loading={loading} />
    </>
  );
};