const express = require("express");
const orderController = require("../controller/order.controller");
const router = express.Router();


router.get('/', orderController.getAllDetail);
router.get('/order/:cus_id', orderController.getDetailById);
router.get('/:o_id', orderController.getDetailByOrderId);
router.post('/', orderController.create);
router.post('/details', orderController.createOrderdetail);

module.exports = router;