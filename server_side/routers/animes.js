const express = require('express')
const AnimesController = require('../controllers/controllerAnimes')
const router = express.Router()

router.get("/", AnimesController.getAnimes)
router.get("/:id", AnimesController.getAnime)

module.exports = router