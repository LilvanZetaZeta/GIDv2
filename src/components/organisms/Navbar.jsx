import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { getCart } from '../../data/cart';
import '../../styles/organisms/Navbar.css';


function NavBar() {
  const cartCount = getCart().length;

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <span className="material-icons">
            storefront
          </span>
          GID
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/products">Productos</Nav.Link>
            <Nav.Link href="/contact">Contacto</Nav.Link>
            <Nav.Link href="/news">Noticias</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/auth">
              <span className="material-icons">person</span>
            </Nav.Link>
            <Nav.Link href="/cart">
              <span className="material-icons">shopping_cart</span>
              {cartCount > 0 && (
                <span className="badge bg-danger ms-1">{cartCount}</span>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;