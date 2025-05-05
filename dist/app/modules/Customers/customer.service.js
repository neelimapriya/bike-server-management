"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const http_status_codes_1 = require("http-status-codes");
const config_1 = require("../../../config");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createCustomer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if email already exists or not
    const customerExists = yield prisma_1.default.customer.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (customerExists) {
        throw new config_1.AppError("This Email is already exists", http_status_codes_1.StatusCodes.CONFLICT);
    }
    const result = yield prisma_1.default.customer.create({
        data: {
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
        },
    });
    return result;
});
const getAllCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.customer.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
});
const getCustomerById = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.customer.findUnique({
        where: {
            customerId,
        },
    });
    if (!result) {
        throw new config_1.AppError("Customer is not found", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    return result;
});
const updateCustomer = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check customer exists or not
    const exists = yield prisma_1.default.customer.findUnique({
        where: {
            customerId: id,
        },
    });
    if (!exists) {
        throw new config_1.AppError("Customer not found", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    // check if new email exist
    if (payload.email) {
        const emailExists = yield prisma_1.default.customer.findUnique({
            where: {
                email: payload.email,
            },
        });
        if (emailExists && emailExists.customerId !== id) {
            throw new config_1.AppError("Email already exists", http_status_codes_1.StatusCodes.CONFLICT);
        }
    }
    const result = yield prisma_1.default.customer.update({
        where: {
            customerId: id,
        },
        data: payload,
    });
    return result;
});
const deleteCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield prisma_1.default.customer.findUnique({
        where: {
            customerId: id,
        },
    });
    if (!exists) {
        throw new config_1.AppError("This Customer not found", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    const result = yield prisma_1.default.customer.delete({
        where: {
            customerId: id,
        },
    });
    return result;
});
exports.CustomerService = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};
