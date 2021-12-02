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
      Cuenta.hasMany(models.CanalSecundario, {
        foreignKey: {
          name: 'cuenta_id',
          comment: 'Foreign Key: company.subledger_empresa.',
          allowNull: false,
          references: {
            model: Cuenta,
            key: 'cuenta_id'
          }
        }
      });
    }
  };
  Cuenta.init({
    nombre: DataTypes.STRING,
    pm: DataTypes.STRING,
    canal_principal: DataTypes.STRING,
    bienvenida: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cuenta',
    tableName: 'cuentas'
  });
  return Cuenta;
};