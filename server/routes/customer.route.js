const express = require("express")
const multer = require("multer")
const path = require("path")
const customerController = require("../controller/customer.controller")
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router()

const storage = multer.diskStorage({
    destination: './uploads/customer',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb('Only image files are allowed!', false);
        }
        cb(null, true);
    },
}).single("image");

router.post("/register", upload ,customerController.register);
router.post("/login", customerController.login);
router.post("/resend", customerController.resendVerify);
router.post("/sendotp", customerController.sendOTP);
router.get("/check", authMiddleware, customerController.check);
router.get("/", customerController.getAll);
router.get("/:id", customerController.getByID);
router.get("/email/:email", customerController.getByEmail);
router.get("/verify/:email", customerController.getVerify);
router.delete("/:id", customerController.delete);
router.delete("/email/:email", customerController.deleleSuccess);
router.put("/:id", upload ,customerController.update);
router.put("/profile/:id", upload ,customerController.updateProfile);
router.put("/password/:id", upload ,customerController.updatePassword);
router.put("/", customerController.updateVerify);

module.exports = router;