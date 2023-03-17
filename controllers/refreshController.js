require("dotenv").config();
const User = require("../models/user");
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

const refreshToken = async (req, res) => {
  console.log("refreshing token")
  const cookies = req.cookies;
  console.log(cookies)

  if(!cookies) return res.status(401).send("login first");
  if (!cookies?.jwt) return res.status(401).send("login first");
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  console.log(foundUser)

  if (!foundUser)
    return res.status(401).json({
      message: "user does not exist ",
    });
  try {
    // evaluate jwt
    const roles = Object.values(foundUser.roles);
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decode) => {
        console.log(foundUser)
        console.log(decode)
        if (err || foundUser.username !== decode.username)
          return res.sendStatus(403);
        const payload = {
          username: foundUser.username,
          roles: roles,
        };
        const accessToken = await generateAccessToken(payload);
        res.json({ accessToken, roles });
      }
    );
  } catch (error) {
    res.sendStatus(500)
  }

  //create jwt
};
module.exports = {
  refreshToken,
};
