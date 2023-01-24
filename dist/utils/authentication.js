"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secret = process.env.TOKEN_SECRET;
var createJWT = function (user) {
    return jsonwebtoken_1["default"].sign(user, secret);
};
exports.createJWT = createJWT;
