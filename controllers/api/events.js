const Event = require("../../models/event");

async function create(req, res) {
  let user = req.body.user;
  const event = await Event.create({
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    time: req.body.time,
    user: user.userID,
  });
  res.json(event);
}

async function show(req, res) {
  let events = await Event.find({ user: req.params.id }).exec();
  res.send(events);
}

module.exports = {
  create,
  show,
};
