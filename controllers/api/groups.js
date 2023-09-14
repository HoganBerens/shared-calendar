const Group = require("../../models/group");
const User = require("../../models/user");

async function create(req, res) {
  let user = await User.findById(req.body.user._id);
  let group;
  Group.create({
    title: req.body.title,
    user: user,
  })
    .then((people) => {
      people.users.push(user);
      people.save();
      group = people.toJSON();
    })
    .then(() => {
      user.groups.push(group);
      user.save();
    });
  res.send(group);
}

async function getAll(req, res) {
  User.find({ userID: req.params.id })
    .then((user) => {
      let groups = user[0].groups;

      res.send(groups);
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
  let group = await Group.findByIdAndUpdate(req.params.id, { users: { users: [req.body.users, req.body.user] } }, { new: true });
  res.json(group);
}

module.exports = {
  create,
  getAll,
  show,
  addUser,
};
