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
