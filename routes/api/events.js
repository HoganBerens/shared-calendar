const express = require("express");
const router = express.Router();
const eventsCtrl = require("../../controllers/api/events");

router.post("/newEvent", eventsCtrl.create);

router.get("/events", eventsCtrl.show);

module.exports = router;
