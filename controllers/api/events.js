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
    user: req.body.user.userID,
  });
  User.find({ userID: req.body.user.userID })
    .then((user) => {
      user[0].events.push(event);
      user[0].save();
    })
    .catch((error) => {
      console.log({ error });
    });

  res.json(event);
}

async function edit(req, res) {
  let update = { title: req.body.title, content: req.body.content, startDate: req.body.startDate, endDate: req.body.endDate, time: req.body.time, user: req.body.user.userID };
  let event = await Event.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json(event);
}

async function deleteOne(req, res) {
  Event.findByIdAndRemove(req.params.id)
    .then(function () {
      console.log("Successfully removed");
    })
    .catch(function (err) {
      console.log(err);
    });
}

async function showAll(req, res) {
  let events = await Event.find({ user: req.params.id }).exec();
  res.send(events);
}

async function details(req, res) {
  let event = await Event.find({ event: req.params.event });
  console.log(req.body);
}

module.exports = {
  create,
  showAll,
  details,
  edit,
  delete: deleteOne,
};
