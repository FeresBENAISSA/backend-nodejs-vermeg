const express = require("express");
const router = express.Router();

const logoutController =require("./../controllers/logoutController");
router
  .route("/")
  .post(logoutController.logout);

module.exports = router;
