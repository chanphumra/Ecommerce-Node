const express = require("express");
const telegramController = require("../controller/telegram.controller");
const router = express.Router();

router.post('/', telegramController.sendMessage);

module.exports = router;