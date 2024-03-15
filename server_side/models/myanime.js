"use strict";
const { Model } = require("sequelize");
const Axios = require("../helpers/axios");
module.exports = (sequelize, DataTypes) => {
  class MyAnime extends Model {
    static associate(models) {
      MyAnime.belongsTo(models.User, { foreignKey: "UserId" });
    }
    static async findMyAnime(id, query) {
      try {
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
        return {
          animes: instance.rows,
          totalCount: instance.count,
          pageSize: parseInt(pageSize),
          currentPage: parseInt(page),
          countPage,
        };
      } catch (error) {
        throw error;
      }
    }
    static async addFavAnime(id, animeId) {
      try {
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
        return instance;
      } catch (error) {
        throw error;
      }
    }
    static async getAnimes(query) {
      try {
        let { page, status, order_by, sort } = query;
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
        return animes;
      } catch (error) {
        throw error;
      }
    }
    static async getAnime(animeId) {
      try {
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
        return animeDetail;
      } catch (error) {
        throw error;
      }
    }
    static async deleteMyAnime(animeId) {
      try {
        let findAnime = await MyAnime.findOne({ where: { MALId: animeId } });
        console.log(findAnime);
        if (!findAnime) throw { name: "badRequest" };
        await findAnime.destroy({ where: { MALId: animeId } });
        return findAnime;
      } catch (error) {
        throw error;
      }
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
