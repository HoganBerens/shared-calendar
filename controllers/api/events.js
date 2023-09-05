const Event = require("../../models/event");

async function create(req, res) {
  const event = await Event.create({
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    user: req.body.user,
  });
  res.json(event);
}
module.exports = {
  create,
};
