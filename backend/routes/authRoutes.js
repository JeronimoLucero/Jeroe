const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Importamos el modelo correctamente
const sequelize = require('../config/db'); // Importamos la conexión con la BD
const authenticateToken = require('../middleware/authMiddleware')

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

// 📌 **Verificar conexión con la base de datos**
sequelize.authenticate()
  .then(() => console.log('🔗 Conexión a la base de datos establecida.'))
  .catch(err => console.error('❌ Error de conexión a la base de datos:', err));

// 📌 **Middleware para verificar token**
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
    req.user = decoded;  // Store user info in request for later use
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

// 📌 **Registro de usuario**
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: { id: newUser.id, username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
});

// 📌 **Login de usuario**
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Iniciando el proceso de login...');
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    // Verifica que la contraseña proporcionada coincida con la almacenada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Contraseña válida:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Contraseña incorrecta');
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }

    // Incluye el 'role' en el payload del token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: user.role },  // Asegúrate de incluir el rol aquí
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    console.log('Login exitoso, generando token...');
    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role }, // También devolvemos el role
    });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error al procesar el login' });
  }
});

router.post('/refresh', authenticateToken, async (req, res) => {
  const userId = req.user.id;  // The user info is decoded and available in req.user

  try {
    // Find the user in the database
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new JWT token with the user's information
    const newToken = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }  // Adjust the expiration time as needed
    );

    return res.json({
      message: 'Token refreshed successfully',
      token: newToken,  // Send the new token to the client
    });

  } catch (err) {
    console.error('Error refreshing token:', err);
    return res.status(500).json({ message: 'Failed to refresh token' });
  }
});



// 📌 **Ruta protegida - Perfil del usuario**
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    res.status(500).json({ message: 'Error al obtener perfil' });
  }
});

module.exports = router;
