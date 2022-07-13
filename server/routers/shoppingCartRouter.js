const express = require("express");
const shoppingController = require("../controllers/shoppingCartController");
const router = express.Router();

router.get("", shoppingController.getShoppingCart);
router.get("/", shoppingController.computeTotalPrice);
router.post("/:productId", shoppingController.addToMyShoppingCart);
router.delete("/:productId", shoppingController.deleteFromMyShoppingCart);
router.put("/:productId/sign", shoppingController.editQuantity);
router.put("/", shoppingController.editStock);

module.exports = router;
