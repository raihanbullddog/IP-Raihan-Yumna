const axios = require("axios");

module.exports = axios.create({
  baseURL: process.env.JIKAN_BASE_URL,
});
