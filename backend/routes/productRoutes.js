const express = require('express');
const Product = require('../models/product'); // Asegúrate del nombre correcto
const authenticateToken  = require('../middleware/authMiddleware');
const sequelize = require('../config/db'); 

const router = express.Router();

// 📌 **Crear un nuevo producto**
router.post('/', authenticateToken, async (req, res) => {
  // Verificar si el usuario es un administrador
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Only admins can add products.' });
  }

  try {
    const { nombre, descripcion, precio, urlimagen } = req.body;

    const newProduct = await Product.create({ nombre, descripcion, precio, urlimagen });
    res.status(201).json({ message: 'Producto agregado exitosamente', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar producto', error: error.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  // Verificar si el usuario es un administrador
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Only admins can delete products.' });
  }

  const productId = req.params.id;  // Obtener el ID del producto desde los parámetros de la URL

  try {
    const product = await Product.findByPk(productId); // Usamos findByPk para encontrar el producto por su ID

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Eliminar el producto de la base de datos
    await product.destroy();
    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
});

router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { nombre, descripcion, precio, urlimagen } = req.body;
    const productId = req.params.id;

    // Buscar el producto en la base de datos
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Actualizar los campos del producto
    product.nombre = nombre || product.nombre;
    product.descripcion = descripcion || product.descripcion;
    product.precio = precio || product.precio;
    product.urlimagen = urlimagen || product.urlimagen;

    // Guardar los cambios en la base de datos
    await product.save();

    // Enviar el producto actualizado como respuesta
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
});

// 📌 **Obtener todos los productos**
router.get('/', async (req, res) => {
    try {
      const [results, metadata] = await sequelize.query('SELECT * FROM products');  // Query directly
      res.json(results);  // Send the result (products) in JSON format
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({ message: 'Error al obtener productos' });
    }
  });


  

module.exports = router;
