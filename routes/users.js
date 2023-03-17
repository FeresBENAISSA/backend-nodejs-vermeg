const express = require("express");
const router = express.Router();
const path = require("path");
const ROLES = require("../config/Roles");
const verifyRoles = require("../middleware/verifyRoles");
const usersController = require("./../controllers/usersController");
router
  .route("/")
  .get(verifyRoles(ROLES.ADMIN),usersController.getAllUsers)

router.get("/:username",usersController.getUser)
router.post("/upload",usersController.uploadUserImage)
module.exports = router;
