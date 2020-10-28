const express = require('express');
const router = express.Router();
const multer = require('multer');

const auth = require('../../helper/auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.imagetype === 'image/png') {
//         cb(null, true);
//     }
//     else {
//         cb(null, false);
//     }
// };

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
    // fileFilter: fileFilter
});

const {
    getAllProducts,
    createOneProduct,
    getOneProduct,
    updateOneProduct,
    deleteOneProduct
} = require('./controller.product');

router.get('/', getAllProducts);

router.post('/', auth, upload.single('productImage'), createOneProduct);

router.get('/:productId', auth, getOneProduct);

router.patch('/:productId', auth,  updateOneProduct);

router.delete('/:productId', auth, deleteOneProduct);

module.exports = router;