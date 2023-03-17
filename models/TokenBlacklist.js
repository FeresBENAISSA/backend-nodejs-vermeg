const mongoose = require('mongoose');

const tokenBlacklistSchema = new mongoose.Schema({
  token: { type: String, required: true },
  logoutTime: { type: Date, required: true },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '1m' },
  },
});

module.exports = mongoose.model('TokenBlacklist', tokenBlacklistSchema);