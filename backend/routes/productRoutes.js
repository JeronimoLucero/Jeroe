const express = require('express');
const Product = require('../models/product'); // Asegúrate del nombre correcto
const authenticateToken = require('../middleware/authMiddleware');  // Middleware para verificar el token
const isAdmin = require('../middleware/isAdmin');  // Middleware para verificar si es admin
const sequelize = require('../config/db'); // Para la conexión a la base de datos

const router = express.Router();

// 📌 **Crear un nuevo producto**
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { nombre, descripcion, precio, urlimagen } = req.body;

    // Crear el nuevo producto en la base de datos
    const newProduct = await Product.create({ nombre, descripcion, precio, urlimagen });
    res.status(201).json({ message: 'Producto agregado exitosamente', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar producto', error: error.message });
  }
});

// 📌 **Eliminar un producto**
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  const productId = req.params.id;  // Obtener el ID del producto desde los parámetros de la URL

  try {
    // Buscar el producto en la base de datos
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Eliminar el producto
    await product.destroy();
    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
});

// 📌 **Actualizar un producto**
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { nombre, descripcion, precio, urlimagen } = req.body;
    const productId = req.params.id;

    // Buscar el producto en la base de datos
    const product = await Product.findByPk(productId);  // Usamos findByPk para obtener el producto por su ID

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Actualizar los campos del producto
    product.nombre = nombre || product.nombre;
    product.descripcion = descripcion || product.descripcion;
    product.precio = precio || product.precio;
    product.urlimagen = urlimagen || product.urlimagen;

    // Guardar los cambios
    await product.save();

    // Devolver el producto actualizado
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
});

// 📌 **Obtener todos los productos**
router.get('/', async (req, res) => {
  try {
    const [results, metadata] = await sequelize.query('SELECT * FROM products');  // Ejecutar la consulta para obtener productos
    res.json(results);  // Enviar los resultados en formato JSON
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

module.exports = router;
