"use strict";
exports.__esModule = true;
var userhandler_1 = require("../handlers/userhandler");
var userRouter = function (app) {
    app.get('/users', userhandler_1.getUsers);
    app.get('/users/:id', userhandler_1.getUser);
    app.post('/users', userhandler_1.createUser);
};
exports["default"] = userRouter;
