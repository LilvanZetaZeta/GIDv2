import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/Products';
import { addToCart } from '../data/cart';
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';
import '../styles/pages/ProductDetail.css'; 

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);

  if (!product) return <p>Producto no encontrado</p>;

  const imagePath = `/img/productos/${product.category}/${product.image}`;

  const handleAddToCart = () => {
    const success = addToCart({ ...product, quantity });
    if (success) {
      alert(`${quantity} unidad(es) de ${product.name} agregadas al carrito`);
    }
  };

  return (
    <Container className="product-detail-container">
      <Row>
        <Col md={6}>
          <div className="product-detail-image-wrapper">
            <img
              src={imagePath}
              alt={product.name}
              className="product-detail-image img-fluid rounded shadow"
            />
          </div>

          <div className="mt-4">
            <h5>Descripción</h5>
            <p>{product.description}</p>

            <h5>Ficha técnica</h5>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>Marca</td>
                  <td>{product.brand || 'Sin marca'}</td>
                </tr>
                <tr>
                  <td>Modelo</td>
                  <td>{product.model || 'Sin modelo'}</td>
                </tr>
                <tr>
                  <td>Categoría</td>
                  <td>{product.category}</td>
                </tr>
                <tr>
                  <td>Garantía</td>
                  <td>{product.warranty || 'Sin garantía'}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>

        <Col md={6} className="d-flex flex-column justify-content-start align-items-start">
          <h2 className="product-detail-title">{product.name}</h2>
          <h3 className="product-detail-price">${product.price.toLocaleString('es-CL')}</h3>
          <p className="product-detail-stock">Stock disponible: {product.stock}</p>

          <Form.Select
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="mb-2"
          >
            {[...Array(product.stock).keys()].map(i => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </Form.Select>

          <div className="product-detail-buttons">
            <Button variant="primary" size="sm" onClick={handleAddToCart}>
              Comprar
            </Button>
            <Button variant="dark" size="sm" onClick={() => navigate('/')}>
              Volver
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail
