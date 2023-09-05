const Event = require("../../models/event");

async function create(req, res) {
  let user = req.body.user;
  const event = await Event.create({
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    user: user,
  });
  user.events.push(event);
  user.save();
  res.json(event);
}

async function show(req, res) {
  let events = Event.find({ user: req.user });
  console.log(events);
}

module.exports = {
  create,
  show,
};
