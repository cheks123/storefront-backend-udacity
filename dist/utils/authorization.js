"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.authorize = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authorize = function (req, res, next) {
    var token = req.header("auth-token");
    if (!token) {
        res.status(401);
        res.json("Access Denied");
        return false;
    }
    try {
        var verified = jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
        //@ts-ignore
        req.user = verified;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401);
        res.send("Invalid token");
        return false;
    }
};
exports.authorize = authorize;
