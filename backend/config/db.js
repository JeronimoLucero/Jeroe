const { Sequelize } = require('sequelize');

// Crear una instancia de Sequelize para conectarse a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: 'postgres', // Cambiar si usas otro tipo de base de datos
    port: process.env.DB_PORT || 5432,
  }
);

module.exports = sequelize;










