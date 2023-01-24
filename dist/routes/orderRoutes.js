"use strict";
exports.__esModule = true;
var orderhandler_1 = require("../handlers/orderhandler");
var userRouter = function (app) {
    app.get('/orders', orderhandler_1.getOrders);
    app.post('/orders', orderhandler_1.createOrder);
    app.get('/current-orders/:user_id', orderhandler_1.getCurrentOrders);
};
exports["default"] = userRouter;
