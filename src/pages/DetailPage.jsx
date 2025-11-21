import React from 'react';
import { useParams } from 'react-router-dom';
import { ItemDetail } from '../components/organisms/ItemDetail';

export const DetailPage = () => {
  const { productId } = useParams();
  // La página solo pasa el ID al organismo
  return <ItemDetail productId={productId} />;
};