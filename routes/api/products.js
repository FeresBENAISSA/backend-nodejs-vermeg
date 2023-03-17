const express = require("express");
const router = express.Router();
const ROLES = require("../../config/Roles");
const verifyRoles = require("../../middleware/verifyRoles");
const productController = require("../../controllers/productController");
router.use(verifyRoles(ROLES.STORE_MANAGER));
router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.addProduct)
  .put(productController.updateProduct);
router.post('/image',productController.addNewImageProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
