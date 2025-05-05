"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const notFoundHandler = (req, res, next) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        success: false,
        message: "API not found!",
        error: {
            path: req.originalUrl,
            message: "This is wrong api!",
        },
    });
};
exports.default = notFoundHandler;
