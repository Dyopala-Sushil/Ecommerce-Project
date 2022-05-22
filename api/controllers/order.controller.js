const Order = require("../model/order.model");

class OrderController{

    createOrder = (req, res, next) => {

        let cart = req.body;

        cart.map((item)=> {
            item.user_id = req.user.id,
            item.status = 'new';
        })
        Order.insertMany(cart)
        .then((respo) => {
            res.json({
                result: cart,
                status: true,
                msg: "Order created successfully."
            })
        })
        .catch((error) => {
            res.status(400).json({
                result: error,
                status: false,
                msg: "Sorry! There was problem while creating order."
            })
        })
    }


    listAllOrders = (req, res, next) => {
        Order.find()
        .populate('product_id')
        .populate('user_id')
        .then((response) => {
            res.json({
                result: response,
                status: true,
                msg: "Success"
            })
        })
        .catch((error) => {
            res.status(400).json({
                result: error,
                status: false,
                msg: "Sorry! Order could not fetch at this moment."
            })
        })
    }

}

module.exports = OrderController;