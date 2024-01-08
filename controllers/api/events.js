const Event = require("../../models/event");
const Group = require("../../models/group");
const User = require("../../models/user");

async function create(req, res) {
  let event = await Event.create({
    title: req.body.title,
    content: req.body.content,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    time: req.body.time,
    user: req.body.user,
  });
  await Group.findOne({ title: req.body.group })
    .then((response) => {
      response.events.push(event);
      response.save();
    })
    .catch((err) => {
      console.log(err);
    });
  let events = await Event.find({ user: req.body.user._id });
  res.send(events);
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
  let usersEvents = await Event.find({ user: req.params.id });
  res.send(usersEvents || []);
}

async function getByGroup(req, res) {
  let group = await Group.findOne({ title: req.params.group }).lean();
  let events = [];
  for (e of group.events) {
    let event = await Event.findById(e).lean();
    events.push(event);
  }
  res.send(events);
}

async function getOne(req, res) {
  Event.findById(req.params.id).then((response) => {
    User.findById(response.user).then((r) => {
      res.send({ user: r, event: response });
    });
  });
}

module.exports = {
  create,
  showAll,
  edit,
  delete: deleteOne,
  getByGroup,
  getOne,
};
