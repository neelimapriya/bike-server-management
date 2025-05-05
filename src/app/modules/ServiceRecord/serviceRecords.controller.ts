import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { ServiceRecordService } from "./serviceRecords.service";
import sendResponse from "../../utils/sendResponse";

const createService = catchAsync(async (req: Request, res: Response) => {
  const service = req.body;
  const result = await ServiceRecordService.createService(service);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Service record created successfully!",
    data: result,
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceRecordService.getAllServices();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Service records retrieve successfully",
    data: result,
  });
});

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceRecordService.getSingleService(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Service record retrieve successfully!",
    data: result,
  });
});

const completeService = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ServiceRecordService.completeService(id, req.body || {});
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Mark a service as completed!",
    data: result,
  });
});

const getOverdueServices = catchAsync(async (req: Request, res: Response) => {
  // console.log("controller");
  const result = await ServiceRecordService.getOverdueServices();
// console.log(result);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Overdue or pending services fetched successfully",
    data: result,
  });
});

export const ServiceRecordController = {
  createService,
  getAllServices,
  getSingleService,
  completeService,
  getOverdueServices,
};
