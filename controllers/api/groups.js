const Group = require("../../models/group");
const User = require("../../models/user");

async function create(req, res) {
  let user = await User.findById(req.body.user._id);
  let group = await Group.create({
    title: req.body.title,
    user: user.userID,
  }).then((response) => {
    user.groups.push(response._id);
    user.save();
  });
  res.send(group);
}

async function getAll(req, res) {
  User.findOne({ userID: req.params.id })
    .then((user) => {
      Group.find({ user: user.userID }).then((response) => {
        res.send(response);
      });
    })
    .catch((error) => {
      console.log({ error });
    });
}

async function show(req, res) {
  let group = await Group.find({ group: req.params.id }).exec();
  res.send(group);
}

async function addUser(req, res) {
  Group.findById(req.params.id)
    .then((group) => {
      /* group.users.push(req.body.user);
      group.save();
      res.json(group); */
      console.log(group);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  create,
  getAll,
  show,
  addUser,
};
