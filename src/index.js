import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app'; // o donde tengas tu componente raíz
import './styles/global.css'; // importa tus estilos globales
import 'bootstrap/dist/css/bootstrap.min.css'; // importa Bootstrap


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
