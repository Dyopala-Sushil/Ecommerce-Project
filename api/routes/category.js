const router = require("express").Router();
const CategoryController = require("../controllers/category.controller");
const { isLoggedIn, isAdminSeller } = require("../middleware/middleware");

const catController = new CategoryController();
router.route('/')
    .get(catController.getAllCategories)
    .post([isLoggedIn, isAdminSeller],catController.addCategory)

router.route('/:id')
    .delete([isLoggedIn, isAdminSeller], catController.deleteCategory)
    .put([isLoggedIn, isAdminSeller], catController.updateCategoryById)
    .get(catController.getCategoryById)
module.exports = router;