const express = require("express");
const router = express.Router();
const groupsCtrl = require("../../controllers/api/groups");

router.post("/", groupsCtrl.create);

router.get("/:id", groupsCtrl.getAll);

router.get("/:id/show", groupsCtrl.show);

router.put("/:id/addUser", groupsCtrl.addUser);

module.exports = router;
