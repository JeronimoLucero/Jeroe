const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const sequelize = require('./config/db'); // Conexión a la BD
const authRoutes = require('./routes/authRoutes'); // Rutas de autenticación
const productRoutes = require('./routes/productRoutes'); // ✅ Importamos productRoutes
const swaggerDocs = require('./config/swaggerconfig');
const authenticateToken = require('./middleware/authMiddleware'); // Middleware JWT
const Product = require('./models/product')


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

swaggerDocs(app);

// 📌 **Rutas**
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);



// Ruta protegida con JWT
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Accediste a una ruta protegida' });
});

// Sincronizar Sequelize con la BD
sequelize.sync({ force: false }) 
  .then(() => console.log('✅ Conexión establecida con la base de datos.'))
  .catch((error) => console.error('❌ Error al conectar con la base de datos:', error));

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
