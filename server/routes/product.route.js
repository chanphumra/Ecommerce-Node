const router = require('express').Router();
const multer = require("multer");
const path = require("path");
const productController = require('../controller/product.controller');

const storage = multer.diskStorage({
    destination: './uploads/product',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${Math.floor(Math.random() * Date.now())}${path.extname(file.originalname)}`)
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
}).array('images');



router.post('/', upload, productController.create);
router.get('/', productController.getAll);
router.get('/:id', productController.getByID);
router.get('/count/:id', productController.getCountSubCategory);
router.get('/details/:id', productController.getAllDetailsById);
router.get('/details/get/all', productController.getAllDetails);
router.get('/details/get/all/new', productController.getAllDetailsNewArrivale);
router.get('/details/get/all/bestdiscount', productController.getBestDiscount);
router.delete('/:id', productController.delete);
router.delete('/details/:id', productController.deleteDetails)
router.put('/:id', upload, productController.update);
router.put('/clear/:id', productController.clearStock);

module.exports = router;