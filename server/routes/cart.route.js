const express = require("express");
const cartController = require("../controller/cart.controller");
const router = express.Router();

router.get("/", cartController.getAll);
router.get("/:id", cartController.getById);
router.post("/", cartController.create);
router.delete("/:id", cartController.delete);
module.exports = router;
