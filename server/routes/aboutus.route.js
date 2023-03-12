const express = require("express");
const multer = require("multer")
const path = require("path")
const aboutUsController = require("../controller/aboutus.controller");
const router = express.Router();

const storage = multer.diskStorage({
    destination: './uploads/aboutus',
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

router.get('/', aboutUsController.getAll);
router.post('/', upload, aboutUsController.create);
module.exports = router;