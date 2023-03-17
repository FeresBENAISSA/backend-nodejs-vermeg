const TokenBlacklist = require("../models/TokenBlacklist");

const verifyTokenIsNotInBlacklist= async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  const blacklistItem = await TokenBlacklist.findOne({ token }).exec();
  console.log(blacklistItem)
  if (blacklistItem) {
    // Access token is blacklisted, deny the request
    return res.status(401).json({ error: 'Access token is invalid or expired' });
  }
  next();
 
};
module.exports = verifyTokenIsNotInBlacklist;
