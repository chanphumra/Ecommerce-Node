const express = require("express");
const profilesettingController = require("../controller/profilesetting.controller");
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './uploads/profile',
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

router.get('/', profilesettingController.get);
router.put('/', upload, profilesettingController.update);


module.exports = router;