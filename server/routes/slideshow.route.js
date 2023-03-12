const express = require("express");
const multer = require("multer")
const path =  require("path")
const slideshowController = require("../controller/slideshow.controller");
const router = express.Router();

const storage = multer.diskStorage({
    destination: './uploads/slideshow',
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


router.get("/", slideshowController.getAll);
router.get("/:id", slideshowController.getById );
router.post("/", upload, slideshowController.create);
router.delete("/:id", slideshowController.delete);
router.put("/:id", upload, slideshowController.update);
router.put("/enable/:id", slideshowController.updateEnable);

module.exports = router;
