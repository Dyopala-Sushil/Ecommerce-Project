var router = require('express').Router();

var usersRouter = require('./users');
const authRoute = require("./auth");
const productRoute = require('./product');
const categoryRoute = require("./category");
const { isLoggedIn } = require('../middleware/middleware');

const OrderController = require("../controllers/order.controller");
const orderCtrl = new OrderController();

router.use('/users', usersRouter);
router.use("/", authRoute);
router.use('/product', productRoute)
router.use('/category', categoryRoute)



router.post("/create-order", isLoggedIn, orderCtrl.createOrder)
router.get('/orders', isLoggedIn, orderCtrl.listAllOrders);
module.exports = router;
