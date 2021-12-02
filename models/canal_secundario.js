'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CanalSecundario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CanalSecundario.init({
    cuenta_id: DataTypes.INTEGER,
    canal: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CanalSecundario',
    tableName: 'canales_secundarios'
  });
  return CanalSecundario;
};