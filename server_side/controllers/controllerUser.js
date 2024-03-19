const { User } = require("../models");
const { uuidv4 } = require("uuidv4");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const { hashPass, comparePass } = require("../helpers/bcrypt");
const { Op } = require("sequelize");
const { signToken } = require("../helpers/jwt");
// const { Model } = require("sequelize");

module.exports = class UserController {
  static async login(req, res, next) {
    try {
      const data = req.body;
      console.log(data);
      const { inputCreds, password } = data;
      // console.log(data)
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
      let user = await User.findOne({
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
      console.log(access_token);
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
    }
  }
  static async findUser(req, res, next) {
    try {
      const id = req.user.id;
      const findUser = await User.findByPk(id);
      if (!findUser) {
        throw { message: "User Not Found" };
      }
      res.status(200).json({ findUser });
    } catch (error) {
      next(error);
    }
  }
  static async editUser(req, res, next) {
    try {
      const data = req.body;
      const userId = req.user.id;
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

      const editedUser = User.findByPk(id, {
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });
      res.status(200).json(editedUser);
    } catch (error) {
      next(error);
    }
  }
  static async loginGoogle(req, res, next) {
    try {
      const google_token = req.headers["google-token"];
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const googleEmail = payload.email;

      const password = uuidv4();

      const [user, created] = await User.findOrCreate({
        where: { email: googleEmail },
        defaults: {
          username: payload.name,
          email: googleEmail,
          password: password,
        },
      });
      let access_token = await signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (error) {
        next(error)
    }
  }
};
