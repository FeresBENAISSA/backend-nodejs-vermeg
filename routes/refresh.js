const express = require("express");
const router = express.Router();
const path = require("path");
const refreshController =require("./../controllers/refreshController");
router
  .route("/")
  .get(refreshController.refreshToken);

module.exports = router;
