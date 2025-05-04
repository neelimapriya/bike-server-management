import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "API not found!",
    error: {
      path: req.originalUrl,
      message: "This is wrong api!",
    },
  });
};

export default notFoundHandler;
