import React from 'react';
import { ProfileDetails } from '../components/organisms/ProfileDetails';
import { OrderHistory } from '../components/organisms/OrderHistory';
import { Typography } from '../components/atoms/Typography';
import '../styles/pages/ProfilePage.css';

export const ProfilePage = () => {
  return (
    <>
      <Typography variant="h1">Mi Perfil</Typography>
      <div className="profile-page">
        <ProfileDetails />
        <OrderHistory />
      </div>
    </>
  );
};