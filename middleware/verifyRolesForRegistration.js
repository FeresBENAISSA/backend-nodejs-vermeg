const ROLES = require("../config/Roles");
const removeDuplicates = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
};
const verifyRolesForRegistration = (req, res, next) => {
  const roles = req.body.roles;
  if (!roles) return res.sendStatus(401);
  const rolesUnduplicated = removeDuplicates(roles);
  if (
    !rolesUnduplicated.every((element) =>
      Object.keys(ROLES).includes(element.toString())
    )
  )
    return res.send("Roles with those attributes does not exist");
  req.body.roles = rolesUnduplicated;
  next();
};

module.exports = verifyRolesForRegistration;
