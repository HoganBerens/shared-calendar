const express = require("express");
const router = express.Router();
const groupsCtrl = require("../../controllers/api/groups");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/", groupsCtrl.create);

router.get("/:id", groupsCtrl.getAll);

router.get("/:id/show", groupsCtrl.show);

module.exports = router;
