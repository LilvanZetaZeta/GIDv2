import React from 'react';
import ProductCard from '../components/molecules/ProductCard';
import products from '../data/Products';
import { Container, Row, Col } from 'react-bootstrap';
import newsData from '../data/news';
import '../styles/pages/Home.css';  
import NewsCard from '../components/molecules/NewsCard.jsx'

function Home() {
  return (
    <>
      {/* Banner */}
      <div className="home-banner">
        <h1>Bienvenido a GID Store</h1>
        <p>Encuentra los mejores productos para tu setup gamer y profesional</p>
      </div>

      {/* Noticias */}
      <Container className="home-news-section">
        <h2 className="section-title">📰 Noticias</h2>
          <Row>
            {newsData.map(news => (
              <Col key={news.id} md={4} className="mb-3">
                <NewsCard title={news.title} summary={news.summary} url={news.url} />
              </Col>
            ))}
          </Row>
      </Container>

      {/* Productos */}
      <Container className="mt-4">
        <h2 className="section-title">🛒 Todos los productos</h2>
        <Row className="g-4">
          {products.map(product => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <footer className="home-footer mt-5">
        <Container>
          <p className="text-center text-muted">
            &copy; {new Date().getFullYear()} GID Store. Todos los derechos reservados.
            Desarrollado por muchos entendidos por pocos 🤑
          </p>
        </Container>
      </footer>
    </>
  );
}

export default Home;
