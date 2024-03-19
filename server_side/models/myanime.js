"use strict";
const { Model } = require("sequelize");
const Axios = require("../helpers/axios");
module.exports = (sequelize, DataTypes) => {
  class MyAnime extends Model {
    static associate(models) {
      MyAnime.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  MyAnime.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "UserId is required",
          },
          notEmpty: {
            msg: "UserId is required",
          },
        },
      },
      MALId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "MALId is required",
          },
          notEmpty: {
            msg: "MALId is required",
          },
        },
      },
      title: {
        type: DataTypes.STRING,
      },
      titleJap: {
        type: DataTypes.STRING,
      },
      imgUrl: {
        type: DataTypes.STRING,
      },
      episodes: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      aired: {
        type: DataTypes.STRING,
      },
      synopsis: {
        type: DataTypes.TEXT,
      },
      producers: {
        type: DataTypes.STRING,
      },
      licensors: {
        type: DataTypes.STRING,
      },
      studios: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "MyAnime",
    }
  );
  return MyAnime;
};
