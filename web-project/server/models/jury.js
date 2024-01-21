
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Project = require('./project');
const Student = require('./student');

const Jury = sequelize.define('Jury', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  grade: {
    type: DataTypes.DECIMAL(4, 2),
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

Jury.belongsTo(Project, { foreignKey: 'projectId' });
Jury.belongsTo(Student, { foreignKey: 'studentId' });

module.exports = Jury;