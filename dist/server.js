"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var productsRoutes_1 = __importDefault(require("./routes/productsRoutes"));
var usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
var orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
var corsOptions = {
    origin: "localhost:4200",
    optionsSuccessStatus: 200
};
app.use(body_parser_1["default"].json());
app.use((0, cors_1["default"])(corsOptions));
app.use(express_1["default"].json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, productsRoutes_1["default"])(app);
(0, usersRoutes_1["default"])(app);
(0, orderRoutes_1["default"])(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
