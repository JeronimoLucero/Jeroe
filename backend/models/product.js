const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asegúrate de que tienes la configuración de Sequelize correctamente importada

// Define el modelo Product
const Product = sequelize.define('Product', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  urlimagen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  precio: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
}, {
  tableName: 'products', // Aquí le decimos a Sequelize que use la tabla "product"
  timestamps: false, // Si no necesitas los campos de timestamps (createdAt, updatedAt)
});

module.exports = Product;
