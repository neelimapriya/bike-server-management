import { StatusCodes } from "http-status-codes";
import { BikeService } from "./bike.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createBike = catchAsync(async (req, res) => {
  const result = await BikeService.createBike(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Bike created successfully!",
    data: result,
  });
});

const getAllBikes = catchAsync(async (req, res) => {
  const result = await BikeService.getAllBikes();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Bikes retrieve successfully",
    data: result,
  });
});

const getSingleBike = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await BikeService.getSingleBike(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Bike retrieve successfully",
    data: result,
  });
});

export const BikeController = {
  createBike,
  getAllBikes,
  getSingleBike
};