const express = require('express')
const MyAnimeController = require('../controllers/controllerMyAnime')
const router = express.Router()

router.get("/", MyAnimeController.getMyAnime)
router.post("/addFav/:id", MyAnimeController.addFavAnime)
router.delete("/delete/:id", MyAnimeController.deleteMyAnime)

module.exports = router