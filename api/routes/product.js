const upload = require('../middleware/uploader');

const router = require('express').Router();
const ProductController = require("../controllers/product.controller");
const { isLoggedIn, isAdmin, isAdminSeller } = require('../middleware/middleware');
const prodController = new ProductController();

router.route('/')
    .post( [isLoggedIn, isAdminSeller] ,upload.array('image', 10), prodController.registerProduct)
    .get(prodController.getAllProducts)

// router.route("/test")

router.route('/:id')
    .delete([isLoggedIn, isAdminSeller], prodController.deleteProductById)
    .get(prodController.getProductById)
    .put([isLoggedIn, isAdminSeller],upload.array('image', 10), prodController.updateProductById)


module.exports = router;