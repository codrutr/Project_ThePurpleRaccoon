const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Project = require('./project');

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true
  },
  isTeamLead: {
    type: DataTypes.BOOLEAN,
  },
  projectId: {
    type: DataTypes.INTEGER,
  },
});

Student.belongsTo(Project, { foreignKey: 'projectId', allowNull: true });

module.exports = Student;
