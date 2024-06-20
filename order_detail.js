'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.order_list, { foreignKey: 'order_list_id' , as:'order_list'});
      this.belongsTo(models.food, { foreignKey: 'food_id' , as: 'food'});
    }
  }
  order_detail.init({
    order_detail_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    order_list_id: DataTypes.INTEGER,
    food_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'order_detail',
  });
  return order_detail;
};