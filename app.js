const express = require('express');
const bodyParser = require("body-parser");
const createError = require('http-errors');
const OrderRoute = require('./Routes/order.route');
require('dotenv').config()
require('./helpers/init_mongodb');
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = '8080';

app.use('/orders', OrderRoute);

app.use(async (req, res, next) => {
    next(createError.NotFound('This route does not exists'))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        },
    })
})

app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`);
})