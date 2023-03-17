const express = require("express");
const router = express.Router();
const path = require("path");
const registerController = require("./../controllers/registerController");
const verifyRolesForRegistration = require('./../middleware/verifyRolesForRegistration')
router
  .route("/")
  .post(verifyRolesForRegistration,registerController.addNewUser);

module.exports = router;
