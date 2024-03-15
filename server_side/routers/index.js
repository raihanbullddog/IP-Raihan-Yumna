const express = require("express");
const router = express.Router();
const UserController = require("../controllers/controllerUser");
const GlobalController = require("../controllers/controllerGlobal");
const { authentication } = require("../middlewares/authentication");

// Global and User
router.post("/register", GlobalController.registerUser);
router.post("/login", UserController.login);
router.post("/login/google", UserController.loginGoogle);

router.use("/user", authentication, require("./user"));
router.use("/myAnime", authentication, require("./myAnime"));
router.use("/animes", authentication, require("./animes"));

// transaction process
router.post("/pay/stripe", authentication, GlobalController.processTransaction);
router.patch("/upgrade", authentication, GlobalController.upgradeToPremium);
module.exports = router;
