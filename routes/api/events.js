const express = require("express");
const router = express.Router();
const eventsCtrl = require("../../controllers/api/events");

router.post("/newEvent", eventsCtrl.create);

router.put("/events/:id/edit", eventsCtrl.edit);

router.get("/events/:id", eventsCtrl.showAll);

router.get("/events/details/:id", eventsCtrl.details);

router.delete("/events/:id/delete", eventsCtrl.delete);

module.exports = router;
