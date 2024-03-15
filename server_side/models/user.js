"use strict";
const { hashPass, comparePass } = require("../helpers/bcrypt");
const { Op } = require("sequelize");
const { signToken } = require("../helpers/jwt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.MyAnime, { foreignKey: "UserId" });
      User.hasMany(models.Transaction, { foreignKey: "UserId" });
    }
    static async registerUser(data) {
      try {
        const { username, email, password } = data;
        let createUser = await User.create({
          username,
          email,
          password,
        });
        let message = {
          id: createUser.id,
          username: createUser.username,
          email: createUser.email,
        };
        return message;
      } catch (error) {
        throw error;
      }
    }
    static async login(data) {
      try {
        const { inputCreds, password } = data;
        // console.log(data)
        let user;
        if (!inputCreds) {
          throw {
            name: "InvalidInput",
          };
        }
        if (!password) {
          throw {
            name: "InvalidInput",
          };
        }
        user = await User.findOne({
          where: {
            [Op.or]: [{ username: inputCreds }, { email: inputCreds }],
          },
        });

        if (!user) {
          throw {
            name: "BadInput",
          };
        }
        const validPassword = comparePass(password, user.password);
        // console.log(validPassword)
        if (!validPassword) {
          throw {
            name: "BadInput",
          };
        }
        const access_token = signToken({ id: user.id, role: user.role });
        return access_token;
      } catch (error) {
        throw error;
      }
    }
    static async findUser(id) {
      try {
        const findUser = await this.findByPk(id);
        if (!findUser) {
          throw { message: "User Not Found" };
        }
      } catch (error) {
        throw error;
      }
    }
    static async editUser(data, id) {
      try {
        const { username, email, password } = data;
        // console.log(password, "INI PASSWORD")
        if (!password) {
          throw { message: "Invalid Password" };
        }
        const findUser = await User.findByPk(id);
        // console.log(findUser);
        if (!findUser) {
          throw { message: "User Not Found" };
        }
        const newPassword = hashPass(password);

        await findUser.update({ username, email, password: newPassword });

        const findUserAgain = User.findByPk(id, {
          attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        });
        return findUserAgain;
      } catch (error) {
        throw error;
      }
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Username is required",
          },
          notEmpty: {
            msg: "Username is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email must be unique",
        },
        validate: {
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Email is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required",
          },
          notEmpty: {
            msg: "Password is required",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Free",
        validate: {
          notNull: {
            msg: "Status is required",
          },
          notEmpty: {
            msg: "Status is required",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (instance) => {
          instance.password = hashPass(instance.password);
        },
      },

      sequelize,
      modelName: "User",
    }
  );
  return User;
};
