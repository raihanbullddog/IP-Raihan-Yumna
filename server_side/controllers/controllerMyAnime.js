const { MyAnime } = require("../models");
const axios = require("../helpers/axios");
module.exports = class MyAnimeController {
  static async getMyAnime(req, res, next) {
    try {
      const id = req.user.id;
      const query = req.query;
      const { page = 1, pageSize = 10 } = query;
        const offset = (page - 1) * pageSize;
        let instance = await MyAnime.findAndCountAll({
          where: { UserId: id },
          limit: parseInt(pageSize),
          offset: offset,
        });
        if (!instance) {
          throw { name: "BadRequest" };
        }
        const countPage = Math.ceil(instance.count / pageSize);
        
        res.status(200).json(instance);
        return {
          animes: instance.rows,
          totalCount: instance.count,
          pageSize: parseInt(pageSize),
          currentPage: parseInt(page),
          countPage,
        };

    } catch (error) {
      console.log(error);
    }
  }
  static async deleteMyAnime(req, res, next) {
    try {
      const animeId = req.params.id;
      // console.log(animeId)
      let findAnime = await MyAnime.findOne({ where: { MALId: animeId } });
        console.log(findAnime);
        if (!findAnime) throw { name: "badRequest" };
        await findAnime.destroy({ where: { MALId: animeId } });
      res.status(200).json({
        message: `Anime ${findAnime.title} has been deleted`,
      });
    } catch (error) {
        next(error)
    }
  }
  static async addFavAnime(req, res, next) {
    try {
      const animeId = req.params.id;

      const id = req.user.id;

      let findMyAnime = await Axios({
        url: `/anime/${animeId}`,
        method: "get",
      });
      const anime = findMyAnime.data.data;

      const findAnimeByUserId = await MyAnime.findAll({
        where: {
          UserId: id,
        },
      });

      const filterAnime = findAnimeByUserId.filter((el) => {
        return el.MALId === animeId;
      });

      if (filterAnime.length !== 0) {
        throw { name: "Alredy Exists", message: "Anime Already Favorited" };
      }

      let instance = await MyAnime.create({
        UserId: id,
        MALId: animeId,
        title: anime.title,
        titleJap: anime.title_japanese,
        imgUrl: anime.images.jpg.large_image_url,
        episodes: anime.episodes,
        status: anime.status,
        aired: anime.aired.string,
        synopsis: anime.synopsis,
        producers: anime.producers[0]?.name,
        licensors: anime.licensors[0]?.name,
        studios: anime.studios[0]?.name,
      });
      res.status(201).json(instance);
    } catch (error) {
        next(error)
    }
  }
};
