const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asegúrate de tener la configuración de Sequelize correcta

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
  },
}, {
  tableName: 'users', // Aquí le decimos a Sequelize que use la tabla "users"
  timestamps: false, // Si no necesitas los campos de timestamps (createdAt, updatedAt)
});

module.exports = User;
