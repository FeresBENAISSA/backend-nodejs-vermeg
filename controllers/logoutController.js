require("dotenv").config();
const User = require("../models/user");
const TokenBlacklist = require("../models/TokenBlacklist");

const logout = async (req, res) => {
  console.log("logout")
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(204); // no content
  const refreshToken = cookies.jwt;
  console.log(refreshToken)
  const foundUser = await User.findOne({
    refreshToken,
  });
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }
  foundUser.refreshToken = "";
  await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

  // if (!req?.headers?.authorization || !req?.headers?.Authorization) {
  //   console.log("hello");
  //   const accessToken = req.headers.authorization || req.headers.Authorization;
    // console.log(accessToken);
    // const token = accessToken.split(" ")[1];
    // const logoutTime = new Date();
    // const tokenBlacklist = new TokenBlacklist({ accessToken, logoutTime });
  //   // await tokenBlacklist.save();
  // }

  req.headers.authorization = "";
  req.headers.Authorization = "";

  res.sendStatus(204);
};
module.exports = {
  logout,
};
