const Event = require("../../models/event");
const User = require("../../models/user");

async function create(req, res) {
  const event = await Event.create({
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    time: req.body.time,
    user: req.body.user.userID,
  });
  User.find({ userID: req.body.user.userID })
    .then((user) => {
      user[0].events.push(event);
      user[0].save();
      console.log(user[0]);
    })
    .catch((error) => {
      console.log({ error });
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
