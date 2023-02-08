"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.authorize = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authorize = function (req, res, next) {
    if (!req.headers.authorization) {
        res.status(401);
        res.json("Invalid token");
        return false;
    }
    try {
        var authorizationHeader = req.headers["authorization"];
        var token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401);
        res.json({ error: error });
        return false;
    }
};
exports.authorize = authorize;
