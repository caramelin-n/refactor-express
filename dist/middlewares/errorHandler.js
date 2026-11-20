"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const http_error_1 = require("../errors/http-error");
function errorHandler(error, _req, res, _next) {
    if (error instanceof http_error_1.HttpError) {
        res.status(error.statusCode).json({ message: error.message });
        return;
    }
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
}
