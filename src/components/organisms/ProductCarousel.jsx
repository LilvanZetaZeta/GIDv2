import React from 'react';
import { Carousel } from 'react-bootstrap';
import ProductCard from '../molecules/ProductCard';
import products from '../../data/Products';

function chunk(array, size) {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
}

function ProductCarousel() {
  const grouped = chunk(products, 3);

  return (
    <Carousel>
      {grouped.map((group, index) => (
        <Carousel.Item key={index}>
          <div className="d-flex justify-content-center gap-4 p-4">
            {group.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
