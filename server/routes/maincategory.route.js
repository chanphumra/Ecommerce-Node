const express = require('express');
const mainCategoryController = require('../controller/maincategory.controller');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './uploads/category',
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

router.post('/', upload, mainCategoryController.create);
router.get("/", mainCategoryController.getAll);
router.get('/:id', mainCategoryController.getByID);
router.get('/getsup/count', mainCategoryController.getAllAndCountSub);
router.delete('/:id', mainCategoryController.delete);
router.put('/:id', upload, mainCategoryController.update);

module.exports = router;