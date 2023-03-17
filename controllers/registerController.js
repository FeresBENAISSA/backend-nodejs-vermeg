const User = require("../models/user");
// const Role = require("../models/role");
const bcrypt = require("bcrypt");

const addUserToRole = async (roleId, user) => {
  return await Role.findByIdAndUpdate(roleId, { $push: { users: user.id } });
};
const addRoleToUser = async (userId, role) => {
  return await User.findByIdAndUpdate(userId, { $push: { roles: role.id } });
};

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

const addNewUser = async (req, res) => {
  const { username, firstname, lastname, password, roles } = req.body;
 
  const duplicatedUser = await User.findOne({ username: username }).exec();
  if (duplicatedUser)
    return res.status(409).json({ message: "user already exist" });//conflict

  try {
    const hachedPassword = await bcrypt.hash(req.body.password, 10);
    // const rolesDb = await roleFromClientToDb(roles);
    let user = new User({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: hachedPassword,
      roles:req.body.roles
    });

    const userDB = await user.save();
    // for (var role of rolesDb) {
    //   addRoleToUser(userDB.id, role);
    // }
    // for (var role of rolesDb) {
    //   addUserToRole(role.id, userDB);
    // }
    if (!userDB) res.status(401).send("There is no users");
    res.status(201).send("user succefuly created ");
  } catch (error) {
    res.status(500).json({ message: error.msg });
  }
};

module.exports= {
    addNewUser};
