'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Referente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Referente.init({
    cuenta_id: DataTypes.INTEGER,
    referente: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Referente',
    tableName: 'referentes'
  });
  return Referente;
};