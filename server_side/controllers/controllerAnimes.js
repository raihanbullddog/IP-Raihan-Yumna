const { MyAnime } = require("../models")

module.exports = class AnimesController {
    static async getAnimes(req, res, next) {
        try {
            // const anime = req.query
            let { page, status, order_by, sort } = req.query;
            if (page) {
                page = `&page=${page}`;
            } else {
                page = "";
            }
            if (status) {
                status = `&status=${status}`;
            } else {
                status = "";
            }
            if (order_by) {
                order_by = `&order_by=${order_by}`;
            } else {
                order_by = "";
            }
            if (sort) {
                sort = `&sort=${sort}`;
            } else {
                sort = "";
            }

            // console.log(page, status, order_by, sort);

            let urlAxios = `/anime/?sfw&limit=10${page}${status}${order_by}${sort}`;
            // console.log(url);
            let getAnimes = await Axios({
                url: urlAxios,
                method: "get",
            });

            const animes = getAnimes.data;
            if (!animes) throw { name: "notFound" };
            res.status(200).json(animes)
        } catch (error) {
            next(error)
        }
    }
    static async getAnime(req, res, next) {
        try {
            const animeId = req.params.id;
            let findAnimeAxios = await Axios({
                url: `/anime/${animeId}`,
                method: "get",
              });
              const anime = findAnimeAxios.data.data;
      
              if (!anime) throw { name: "notFound" };
      
              // console.log(anime);
              const animeDetail = {
                MALId: anime.mal_id,
                title: anime.title_english,
                titleJap: anime.title_japanese,
                imgUrl: anime.images.jpg.large_image_url,
                episodes: anime.episodes,
                status: anime.status,
                aired: anime.aired.string,
                synopsis: anime.synopsis,
                producers: anime.producers[0]?.name,
                licensors: anime.licensors[0]?.name,
                studios: anime.studios[0]?.name,
              };
            res.status(200).json(animeDetail)
        } catch (error) {
            next(error)
        }
    }
}