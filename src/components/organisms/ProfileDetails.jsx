import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Typography } from '../atoms/Typography';
import '../../styles/components/organisms/ProfileDetails.css';

export const ProfileDetails = () => {
  const { user } = useAuth();
  return (
    <div className="profile-details">
      <Typography variant="h2">Mis Datos</Typography>
      <p>Nombre: {user.firstname} {user.lastname}</p>
      <p>Email: {user.email}</p>
      <p>Rol: {user.role}</p>
    </div>
  );
};