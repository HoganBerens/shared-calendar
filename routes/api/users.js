const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/", usersCtrl.create);

router.get("/search", usersCtrl.search);

router.post("/login", usersCtrl.login);

router.get("/check-token", ensureLoggedIn, usersCtrl.checkToken);

router.post("/addToGroup", usersCtrl.addToGroup);

module.exports = router;
