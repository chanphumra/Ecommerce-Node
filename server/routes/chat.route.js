const express = require("express");
const chatController = require("../controller/chat.controller");
const router = express.Router();


router.get('/:senderId/:receiverId', chatController.getMessage);
router.post('/', chatController.create);
module.exports = router;