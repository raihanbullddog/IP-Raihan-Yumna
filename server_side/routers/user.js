const express  = require("express")
const UserController = require('../controllers/controllerUser')
const router = express.Router()

router.get("/findUser", UserController.findUser)
router.put("/editUser", UserController.editUser)

module.exports = router