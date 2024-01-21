const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Project = require('./project');
const Student = require('./student');

const Deliverable = sequelize.define('Deliverable', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  link: {
    type: DataTypes.STRING,
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Deliverable.belongsTo(Project, { foreignKey: 'projectId' });
Deliverable.belongsTo(Student, { foreignKey: 'studentId' });

module.exports = Deliverable;