import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { CartWidget } from '../molecules/CartWidget';
import { Link as AtomLink } from '../atoms/Link';
import '../../styles/components/organisms/Navbar.css';

export const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <AtomLink to="/" className="navbar__logo">GID</AtomLink>
        <div className="navbar__links">
          <AtomLink to="/">Productos</AtomLink>
          <AtomLink to="/news">Noticias</AtomLink>
          <AtomLink to="/contact">Contacto</AtomLink>
          <CartWidget />
          {user ? (
            <>
              {user.role === 'ADMIN' && <AtomLink to="/admin">Admin</AtomLink>}
              <AtomLink to="/profile">{user.firstname}</AtomLink>
              <button onClick={logout} className="link">Salir</button>
            </>
          ) : <AtomLink to="/login">Entrar</AtomLink>}
        </div>
      </div>
    </nav>
  );
};