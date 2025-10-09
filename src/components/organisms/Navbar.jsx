import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px' }}>
            storefront
          </span>
          GID
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/products">Productos</Nav.Link>
            <Nav.Link href="/contact">Contacto</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/user">
              <span className="material-icons">person</span>
            </Nav.Link>
            <Nav.Link href="/cart">
              <span className="material-icons">shopping_cart</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
