require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const generateAccessToken = async (payload) => {
  return await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5s",
  });
};
const generateRefreshToken = async (payload) => {
  return await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};



const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({
      message: "Username and password cannot be null ",
    });
  const foundUser = await User.findOne({ username: username }).exec();
  if (!foundUser)//Unauthorized 
    return res.status(401).json({
      message: "user does not exist ",
    });

  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    //create jwt
    const roles = Object.values(foundUser.roles).filter(Boolean);
    const payload ={
        username :foundUser.username,
        roles:roles
    }
    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);
    //save refresh token
    foundUser.refreshToken= refreshToken;
    const result = await foundUser.save();
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.send({accessToken:accessToken,roles:roles});
  } else {
    res.sendStatus(401);
  }
};
module.exports = {
  login,
};
