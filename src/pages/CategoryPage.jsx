import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../services/productApi';
import { ProductGrid } from '../components/organisms/ProductGrid';
import { ErrorMessage } from '../components/atoms/ErrorMessage';
import { Typography } from '../components/atoms/Typography';

export const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProducts(categoryId)
      .then(response => setProducts(response.data))
      .catch(err => setError("No se pudieron cargar los productos."))
      .finally(() => setLoading(false));
  }, [categoryId]);

  return (
    <>
      <Typography variant="h1">Categoría: {categoryId}</Typography>
      {error && <ErrorMessage message={error} />}
      <ProductGrid products={products} loading={loading} />
    </>
  );
};