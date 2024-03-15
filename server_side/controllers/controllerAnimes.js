const { MyAnime } = require("../models")

module.exports = class AnimesController {
    static async getAnimes (req, res, next) {
        try {
            const anime = req.query
            let instance = await MyAnime.getAnimes(anime)
            res.status(200).json(instance)
        } catch (error) {
            next(error)
        }
    }
    static async getAnime (req, res, next) {
        try {
            const animeId = req.params.id;
            let instance = await MyAnime.getAnime(+animeId)
            res.status(200).json(instance)
        } catch (error) {
            next(error)
        }
    }
}