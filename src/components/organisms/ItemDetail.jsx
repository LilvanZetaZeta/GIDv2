import React, { useEffect, useState } from 'react';
import { getProductById } from '../../services/productApi';
import { useCart } from '../../hooks/useCart';
import { Image } from '../atoms/Image';
import { ItemCount } from '../molecules/ItemCount';
import { Typography } from '../atoms/Typography';
import { Spinner } from '../atoms/Spinner';
import { ErrorMessage } from '../atoms/ErrorMessage';
import toast from 'react-hot-toast';
import '../../styles/components/organisms/ItemDetail.css';

export const ItemDetail = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProductById(productId)
      .then(response => setProduct(response.data))
      .catch(err => setError("Producto no encontrado."))
      .finally(() => setLoading(false));
  }, [productId]);

  const handleOnAdd = (quantity) => {
    try {
      addToCart(product.id, quantity);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return null;

  return (
    <div className="item-detail">
      <div className="item-detail__image-wrapper">
        <Image src={product.imageUrl} alt={product.name} />
      </div>
      <div className="item-detail__content">
        <Typography variant="h1">{product.name}</Typography>
        <Typography variant="price">${product.price}</Typography>
        <Typography variant="body" className="mb-6">{product.description}</Typography>
        <Typography variant="caption" className="item-detail__stock">
          Stock disponible: {product.stock}
        </Typography>
        
        <div className="item-detail__actions">
          {product.stock > 0 ? (
            <ItemCount stock={product.stock} onAdd={handleOnAdd} />
          ) : (
            <Typography variant="body" className="text-danger">Sin stock disponible</Typography>
          )}
        </div>
      </div>
    </div>
  );
};