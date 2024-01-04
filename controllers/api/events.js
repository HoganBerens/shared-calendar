const Event = require("../../models/event");
const User = require("../../models/user");
const moment = require("moment");

async function create(req, res) {
  const event = await Event.create({
    title: req.body.title,
    content: req.body.content,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    time: req.body.time,
    user: req.body.user,
  });
  res.json(event);
}

async function edit(req, res) {
  let update = { title: req.body.title, content: req.body.content, startDate: req.body.startDate, endDate: req.body.endDate, time: req.body.time, user: req.body.user.userID };
  let event = await Event.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json(event);
}

async function deleteOne(req) {
  Event.findByIdAndRemove(req.params.id);
}

async function showAll(req, res) {
  let usersEvents = await Event.find({ user: req.params.id }).exec();
  res.send(usersEvents || []);
}

module.exports = {
  create,
  showAll,
  edit,
  delete: deleteOne,
};
