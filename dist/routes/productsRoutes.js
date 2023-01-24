"use strict";
exports.__esModule = true;
var producthandler_1 = require("../handlers/producthandler");
var productRouter = function (app) {
    app.get('/products', producthandler_1.getProducts);
    app.get('/products/:id', producthandler_1.getProduct);
    app.post('/products', producthandler_1.createProduct);
};
exports["default"] = productRouter;
