'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
     Transaction.belongsTo(models.User, { foreignKey: "UserId" })
    }
  }
  Transaction.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "UserId is required"
        },
        notEmpty: {
          msg: "UserId is required"
        },
      },
    },
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Transaction_id is required",
        },
        notEmpty: {
          msg: "Transaction_id is required",
        },
      },
    },
    payment_gateway_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Payment_gateway_id is required",
        },
        notEmpty: {
          msg: "Payment_gateway_id is required",
        },
      },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "PENDING"
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};