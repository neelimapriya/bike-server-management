import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { CustomerService } from "./customer.service";
import sendResponse from "../../utils/sendResponse";


const createCustomer = catchAsync(async (req, res) => {
  const result = await CustomerService.createCustomer(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Customer created successfully",
    data: result,
  });
});

const getAllCustomers = catchAsync(async (req, res) => {
  const result = await CustomerService.getAllCustomers();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Customers retrieve successfully",
    data: result,
  });
});

const getSingleCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CustomerService.getCustomerById(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Customer retrieve successfully",
    data: result,
  });
});

const updateCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CustomerService.updateCustomer(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Customer data updated successfully",
    data: result,
  });
});

const deleteCustomer = catchAsync(async (req, res) => {
  const { id } = req.params;
  await CustomerService.deleteCustomer(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Customer deleted successfully"
  });
});

export const CustomerController = {
  createCustomer,
  getAllCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer
};