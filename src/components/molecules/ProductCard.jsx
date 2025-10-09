import React from 'react';
import { Card, Button } from 'react-bootstrap';

function ProductCard({ product }) {
  const imagePath = `./img/productos/${product.category}/${product.image}`;

  console.log(imagePath)
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imagePath} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text><strong>{product.price}</strong></Card.Text>
        <Button variant="primary">Comprar</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
