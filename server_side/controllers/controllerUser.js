const { User } = require("../models");
const { uuidv4 } = require("uuidv4");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

module.exports = class UserController {
  static async login(req, res, next) {
    try {
      const data = req.body;
      let access_token = await User.login(data);
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
    }
  }
  static async findUser(req, res, next) {
    try {
      const id = req.user.id;
      const findUser = await User.findUser(+id);
      res.status(200).json({ findUser });
    } catch (error) {
      next(error);
    }
  }
  static async editUser(req, res, next) {
    try {
      const data = req.body;
      const userId = req.user.id;
      const instance = await User.editUser(data, userId);
      res.status(200).json(instance);
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
