const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const User = db.define("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    required: true,
  },
  phone: {
    type: DataTypes.STRING,
    required: true,
  },
});

module.exports = User;
