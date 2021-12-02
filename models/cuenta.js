'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cuenta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cuenta.init({
    nombre: DataTypes.STRING,
    pm: DataTypes.STRING,
    canal: DataTypes.STRING,
    bienvenida: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cuenta',
    tableName: 'cuentas'
  });
  return Cuenta;
};