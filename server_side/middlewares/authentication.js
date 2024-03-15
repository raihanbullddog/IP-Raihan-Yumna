const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models")

const authentication = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw { name: "Invalid Token" };
      }
  
      const [type, token] = authorization.split(" ");
      if (type !== "Bearer") {
        throw { name: "Invalid Token" };
      }
  
      const payload = verifyToken(token);
  
      const user = await User.findByPk(payload.id);
      if (!user) {
        throw { name: "Invalid Token" };
      }
      // console.log(user);
  
      req.user = user;
  
      next();
    } catch (error) {
      console.log(error);
    }
  };
  
  module.exports = { authentication };
  