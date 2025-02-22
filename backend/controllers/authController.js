const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET_KEY = process.env.JWT_SECRET; // Usa una variable de entorno en producción

// Registro de usuario
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado." });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Usuario registrado con éxito." });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error al registrar el usuario." });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario en la base de datos
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Correo o contraseña incorrectos." });
    }

    // Comparar contraseña ingresada con la almacenada
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Correo o contraseña incorrectos." });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.json({ message: "Inicio de sesión exitoso.", token });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ message: "Error al iniciar sesión." });
  }
};

// Verificar autenticación (protección de rutas)
exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Token requerido." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido." });
  }
};
