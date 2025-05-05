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
exports.ServiceRecordService = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const config_1 = require("../../../config");
const client_1 = require("@prisma/client");
// import { ServiceRecord, ServiceStatus } from "../../../generated/prisma";
const createService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(payload);
    const result = yield prisma_1.default.serviceRecord.create({
        data: {
            bikeId: payload.bikeId,
            serviceDate: payload.serviceDate,
            description: payload.description,
            status: payload.status,
        },
    });
    // console.log(result,"service result");
    return result;
});
const getAllServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.serviceRecord.findMany({
        orderBy: {
            serviceDate: "asc",
        },
    });
    return result;
});
const getSingleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield prisma_1.default.serviceRecord.findUnique({
        where: {
            serviceId: id,
        },
        select: { serviceId: true },
    });
    if (!exists) {
        throw new config_1.AppError("Service not found", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    const result = yield prisma_1.default.serviceRecord.findUnique({
        where: {
            serviceId: id,
        },
    });
    return result;
});
const completeService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //   checking existence
    const exists = yield prisma_1.default.serviceRecord.findUnique({
        where: {
            serviceId: id,
        },
        select: { serviceId: true },
    });
    if (!exists) {
        throw new config_1.AppError("Service not found", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    const completionDate = (_a = payload.completionDate) !== null && _a !== void 0 ? _a : new Date();
    const result = yield prisma_1.default.serviceRecord.update({
        where: {
            serviceId: id,
        },
        data: {
            status: client_1.ServiceStatus.done,
            completionDate,
        },
    });
    return result;
});
const getOverdueServices = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("service");
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const result = yield prisma_1.default.serviceRecord.findMany({
        where: {
            status: {
                in: [client_1.ServiceStatus.pending, client_1.ServiceStatus.in_progress],
            },
            serviceDate: {
                lt: sevenDaysAgo,
            },
        },
    });
    // console.log(result);
    return result;
});
exports.ServiceRecordService = {
    createService,
    getAllServices,
    getSingleService,
    completeService,
    getOverdueServices,
};
