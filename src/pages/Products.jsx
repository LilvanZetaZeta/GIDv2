import React, { useState } from 'react';
import products from '../data/Products';
import ProductCard from '../components/molecules/ProductCard';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import '../styles/pages/Products.css';

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['accesorios', 'computadores', 'componentes'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Container className="products-container">
      <h2 className="products-title">🛍️ Productos</h2>

      <div className="products-controls">
        <div className="category-buttons">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'primary' : 'outline-primary'}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Button>
          ))}
          <Button variant="secondary" onClick={() => setSelectedCategory('')}>
            Todas
          </Button>
        </div>

        <Form.Control
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="products-search"
        />
      </div>

      <Row className="mt-4">
        {filteredProducts.length === 0 ? (
          <p>No se encontraron productos.</p>
        ) : (
          filteredProducts.map(product => (
            <Col key={product.id} md={4} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Products;
