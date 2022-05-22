var router = require('express').Router();
const UserController = require("../controllers/users.controller");
const upload = require("../middleware/uploader");
const {isLoggedIn, isAdmin, selfDelete} = require("../middleware/middleware");
const userController = new UserController();

/* GET users listing. */

router.route("/")
  .get(userController.getUser)
  .post(upload.array('image', 10), userController.registerUser);

router.route("/:id")
    .get(isLoggedIn,userController.getUserById)
    .put(upload.single('image'), userController.updateUserById)
    .delete(isLoggedIn, isAdmin, selfDelete, userController.deleteUserById)
module.exports = router;
