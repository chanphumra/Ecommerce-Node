const express = require("express");
const cartdetailController = require('../controller/cartdetail.controller');
const router = express.Router();

router.get("/:id/:cus_id", cartdetailController.getAll);
router.get("/:id", cartdetailController.getOne);
router.get("/countcartdetails/:id", cartdetailController.getCountCartDetails);
router.post("/", cartdetailController.create);
router.delete("/:id/:cart_id", cartdetailController.delete);
router.put("/:id/:cart_id", cartdetailController.update);

module.exports = router;