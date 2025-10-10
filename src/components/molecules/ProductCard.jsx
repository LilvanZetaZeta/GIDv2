import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../styles/molecules/ProductCard.css';
import { addToCart } from '../../data/cart';
import { useState } from 'react';

function ProductCard({ product }) {
  const imagePath = `/img/productos/${product.category}/${product.image}`;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (quantity > product.stock) {
      alert(`Solo hay ${product.stock} unidades disponibles`);
      return;
    }
    addToCart({ ...product, quantity });
    alert(`${quantity} unidad(es) de ${product.name} agregadas al carrito`);
  };

  return (
    <Card className="custom-product-card">
      <div className="custom-image-wrapper">
        <Card.Img src={imagePath} alt={product.name} className="custom-product-image" />
      </div>
      <Card.Body className="custom-card-body">
        <Card.Title className="custom-product-title">{product.name}</Card.Title>
        <Card.Text className="custom-product-description">{product.description}</Card.Text>
        <Card.Text className="custom-product-price">${product.price.toLocaleString('es-CL')}</Card.Text>
        <Card.Text className="text-muted">Stock disponible: {product.stock}</Card.Text>

        <Form.Control
          type="number"
          min="1"
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="mb-2"
        />

        <div className="custom-button-group">
          <Button variant="primary" size="sm" className="custom-buy-button" onClick={handleAddToCart}>
            Comprar
          </Button>
          <Button variant="dark" size="sm" className="custom-watch-button" onClick={() => navigate(`/producto/${product.id}`)}>
            Ver más
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;