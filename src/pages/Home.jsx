import React from 'react';
import ProductCard from '../components/molecules/ProductCard';
import products from '../data/Products';
import { Container, Row, Col } from 'react-bootstrap';

function Home() {
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Todos los productos</h2>
      <Row className="g-4">
        {products.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
