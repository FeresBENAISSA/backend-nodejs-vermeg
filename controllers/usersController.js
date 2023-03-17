const User = require("../models/user");
// const Role = require("../models/role");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const Image = require("../models/image");
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
}).single("image");
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
const uploadUserImage = async (req, res) => {
  // console.log(req);
  upload(req, res, async(err) => {
    // console.log(req.user);
    if (err) console.log(err);
    else {
      // const newImage = new Image({
      //   name: req.file.originalname,
      //   image: {
      //     data: req.file.filename,
      //     contentType: req.file.mimetype,
      //   },
      // });
     
      // const user = User.findOne({ username: req.user });
      // console.log(user)

      // add image to usernewImage.save()
      // console.log((req.file.path && req.file))
     const user =await User.findOneAndUpdate({ username: req.user }, { avatar: req.file.path||null });
      
      res.status(201).send(user);
    }
  });
};




const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) res.status(401).send("There is no users");
  res.send(users);
};

const getUser = async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) res.status(401).send("There is no users");
  res.send(user);
};
module.exports = {
  getUser,
  getAllUsers,
  uploadUserImage,
};
