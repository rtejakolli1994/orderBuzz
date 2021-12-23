const Joi = require('@hapi/joi');
const orderSchema = Joi.object({
    orderId: Joi.number().required(),
    itemName: Joi.string().required(),
    cost: Joi.string().required(),
    orderDate: Joi.date().required(),
    deliveryDate: Joi.date().required()
});

module.exports = {
    orderSchema
}