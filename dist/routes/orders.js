"use strict";
exports.__esModule = true;
var orderhandler_1 = require("../handlers/orderhandler");
var authorization_1 = require("../utils/authorization");
var orderRouter = function (app) {
    app.get('/orders', authorization_1.authorize, orderhandler_1.getOrders);
    app.post('/orders', authorization_1.authorize, orderhandler_1.createOrder);
    app.get('/current-orders/:user_id', authorization_1.authorize, orderhandler_1.getCurrentOrders);
    app.post('/order-products', authorization_1.authorize, orderhandler_1.orderProduct);
};
exports["default"] = orderRouter;
