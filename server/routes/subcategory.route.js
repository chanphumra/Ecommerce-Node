const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const subcategoryController = require('../controller/subcategory.controller');

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

router.post('/',upload, subcategoryController.create);
router.get('/', subcategoryController.getAll);
router.get('/:id', subcategoryController.getByID);
router.get('/main/:id', subcategoryController.getAllByMain);
router.get('/count/:id' , subcategoryController.getCountSubCategory);
router.delete('/:id', subcategoryController.delete);
router.put('/:id', upload, subcategoryController.update);

module.exports = router;
