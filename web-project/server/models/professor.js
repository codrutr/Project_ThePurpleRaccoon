const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Professor = sequelize.define('Professor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true
  },
});

module.exports = Professor;
