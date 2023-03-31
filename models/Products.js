const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Products = db.define("products", {
  ProductId: {
    type: DataTypes.STRING,
    required: true,
    primaryKey: true,
  },
  ProductName: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
    unique: true,
  },
  Description: { type: DataTypes.STRING, required: true, allowNull: false },
  Price: { type: DataTypes.INTEGER, required: true, allowNull: false },
  Quantity: { type: DataTypes.INTEGER, required: true, allowNull: false },
});

module.exports = Products;
