import React from 'react';
import ProductCarousel from '../components/organisms/ProductCarousel';

function Home() {
  return (
    <main>
      <h2 className="text-center mt-4">Productos Destacados</h2>
      <ProductCarousel />
    </main>
  );
}

export default Home;
