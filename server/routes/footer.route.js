const express = require("express");
const footerController = require("../controller/footer.controller");
const router = express.Router();

router.get('/', footerController.get);
router.put('/', footerController.update);

module.exports = router;