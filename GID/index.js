import express from 'express';
import cors from 'cors';
import pg from 'pg'; // Cliente de NeonDB

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middlewares
app.use(cors()); // Permite que tu React (Vercel) le hable a este backend
app.use(express.json());

// 2. Ruta de prueba y para UptimeRobot
app.get('/health', (req, res) => {
  res.status(200).send('El servidor está vivo y funcionando 🚀');
});

// 3. Ejemplo de conexión a base de datos (NeonDB)
// Aquí irían tus rutas reales, por ejemplo:
// app.get('/api/productos', async (req, res) => { ... })

// 4. Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Backend escuchando en el puerto ${PORT}`);
});