const { MyAnime } = require("../models");

module.exports = class MyAnimeController {
  static async getMyAnime(req, res, next) {
    try {
      const id = req.user.id;
      const query = req.query;
      let instance = await MyAnime.findMyAnime(+id, query);

      res.status(200).json(instance);
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteMyAnime(req, res, next) {
    try {
      const animeId = req.params.id;
      // console.log(animeId)
      let instance = await MyAnime.deleteMyAnime(+animeId);
      res.status(200).json({
        message: `Anime ${instance.title} has been deleted`,
      });
    } catch (error) {
        next(error)
    }
  }
  static async addFavAnime(req, res, next) {
    try {
      const animeId = req.params.id;

      const id = req.user.id;

      let instance = await MyAnime.addFavAnime(+id, +animeId);
      res.status(201).json(instance);
    } catch (error) {
        next(error)
    }
  }
};
