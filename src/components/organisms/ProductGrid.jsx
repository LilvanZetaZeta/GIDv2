import React from 'react';
import { ProductCard } from '../molecules/ProductCard';
import { ProductCardSkeleton } from '../molecules/ProductCardSkeleton';
import '../../styles/components/organisms/ProductGrid.css'; 

export const ProductGrid = ({ products = [], loading }) => {
  // Si está cargando, mostramos 8 skeletons
  if (loading) {
    return (
      <div className="product-grid">
        {Array(8).fill(0).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Si no hay productos (o hubo error y products es vacío),
  // en lugar de un texto feo, podemos seguir mostrando skeletons 
  // o un mensaje más estilizado. Tú pediste "como card de productos que no cargan".
  // Así que mostramos skeletons estáticos.
  if (!products || products.length === 0) {
     return (
      <div className="product-grid">
         {/* Mostramos Skeletons para simular que "algo" debería estar ahí */}
        {Array(4).fill(0).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
         <p style={{gridColumn: '1/-1', textAlign: 'center', color: '#666', marginTop: '20px'}}>
           No se encontraron productos disponibles por el momento.
         </p>
      </div>
     );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};