const User = require("../models/user");
// const Role = require("../models/role");
const bcrypt = require("bcrypt");

// const addUserToRole = async (roleId, user) => {
//   return await Role.findByIdAndUpdate(roleId, { $push: { users: user.id } });
// };
// const addRoleToUser = async (userId, role) => {
//   return await User.findByIdAndUpdate(userId, { $push: { roles: role.id } });
// };

// const roleFromClientToDb = async (roles) => {
//   const rolesDb = [];
//   for (var role of roles) {
//     const roleDb = await Role.findOne({ roleName: role });
//     if (!roleDb)
//       return res
//         .status(400)
//         .json({ message: "we can not find role with this name in this db" });
//     else rolesDb.push(roleDb);
//   }
//   return rolesDb;
// };

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) res.status(401).send("There is no users");
  res.send(users);
};


const getUser = async (req, res) => {
  const user = await User.findOne({username:req.params.username});
  if (!user) res.status(401).send("There is no users");
  res.send(user);
};
module.exports = {
  getUser,
  getAllUsers};
