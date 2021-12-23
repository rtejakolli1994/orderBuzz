const express = require('express');
const router = express.Router();
const { orderSchema } = require('../helpers/validation_schema');
const Order = require('../Models/order.model');

router.post('/create', async(req, res, next) => {
    try {
        const result = await orderSchema.validateAsync(req.body);
        const order = await Order.findOne({orderId: result.orderId});
        if(!order){
            const orderInfo = await Order.create(result);
            res.send({orderInfo});
        } else {
            res.send({'message':'invalid order ID'});
        }
    } catch(error) {
        next(error)
    }
});

router.post('/update', async(req, res, next) => {
    try {
        const result = await orderSchema.validateAsync(req.body);
        const orderInfo = await Order.findOne({orderId: result.orderId});
        if(!orderInfo){
            res.send({'message': 'Invslid Order Id'});
        } else {
            const order = await Order.update({orderId: result.orderId},{deliveryDate:result.deliveryDate});
            res.send({order});
        }
    } catch(error) {
        next(error)
    }
});

router.get('/search', async(req, res, next) => {
    try {
        const order = await Order.find({orderId: req.query.orderId});
        res.send({order});
    } catch(error) {
        next(error)
    }
});

router.get('/list', async(req, res, next) => {
    try {
        const order = await Order.find({'orderDate': {'$gte': req.query.orderDate}});
        res.send({order});
    } catch(error) {
        next(error)
    }
});

router.delete('/delete', async(req, res, next) => {
    try {
        const order = await Order.remove({orderId: req.query.orderId});
        res.send({order});
    } catch(error) {
        next(error)
    }
});

module.exports = router