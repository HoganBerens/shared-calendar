const Group = require("../../models/group");

async function create(req, res) {
  const event = await Group.create({
    title: req.body.title,
    user: req.body.user,
  });
  res.json(event);
}
module.exports = {
  create,
};
