"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.authorize = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authorize = function (req, res, next) {
    try {
        var authorizationHeader = req.headers["authorization"];
        var token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1];
        jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401);
        res.json({ error: error });
    }
};
exports.authorize = authorize;
