"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFoundHandler_1 = require("./app/middlewares/notFoundHandler");
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.send('Hello There! Welcome to our car rental service!');
});
app.use(globalErrorHandler_1.default);
app.use(notFoundHandler_1.notFoundHandler);
exports.default = app;
