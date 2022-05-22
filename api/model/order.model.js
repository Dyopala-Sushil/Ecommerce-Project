const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: true
    },
    product_id: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    qty: {
        type: Number,
        min: 1,
        required: true
    },
    amount: {
        type: Number,
        min: 1,
        required: true
    },
    status: {
        type: String,
        enum: ['new', 'verified','delivered','cancelled'],
        default: 'new'
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;