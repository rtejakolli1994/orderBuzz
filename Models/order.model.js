const mongoose = require('mongoose');
const Schema = mongoose.Schema
const OrderSchema = new Schema({
    orderId:{
        type: Number,
        required: true,
        unique: true
    },
    itemName: {
        type: String,
        required: true
    },
    cost: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    }
});

const Order = mongoose.model('orders', OrderSchema);
module.exports = Order;