const express = require("express");
const router = express.Router();
const groupsCtrl = require("../../controllers/api/groups");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

module.exports = router;
