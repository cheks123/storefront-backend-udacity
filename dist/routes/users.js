"use strict";
exports.__esModule = true;
var userhandler_1 = require("../handlers/userhandler");
var authorization_1 = require("../utils/authorization");
var userRouter = function (app) {
    app.get('/users', authorization_1.authorize, userhandler_1.getUsers);
    app.get('/users/:id', authorization_1.authorize, userhandler_1.getUser);
    app.post('/users', userhandler_1.createUser);
    app.post('/users/authenticate', userhandler_1.authenticateUser);
    app["delete"]('/users/:id', authorization_1.authorize, userhandler_1.deleteUser);
};
exports["default"] = userRouter;
