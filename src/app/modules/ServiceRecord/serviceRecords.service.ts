import { StatusCodes } from "http-status-codes";
import { IService } from "./serviceRecords.interface";
import prisma from "../../utils/prisma";
import { AppError } from "../../../config";
import { ServiceRecord, ServiceStatus } from "@prisma/client";
// import { ServiceRecord, ServiceStatus } from "../../../generated/prisma";

const createService = async (payload: IService) => {
  // console.log(payload);
  const result = await prisma.serviceRecord.create({
    data: {
      bikeId: payload.bikeId,
      serviceDate: payload.serviceDate,
      description: payload.description,
      status: payload.status,
    },
  });
  // console.log(result,"service result");
  return result;
};

const getAllServices = async () => {
  const result = await prisma.serviceRecord.findMany({
    orderBy: {
      serviceDate: "asc",
    },
  });
  return result;
};

const getSingleService = async (id: string) => {
  const exists = await prisma.serviceRecord.findUnique({
    where: {
      serviceId: id,
    },
    select: { serviceId: true },
  });

  if (!exists) {
    throw new AppError("Service not found", StatusCodes.NOT_FOUND);
  }

  const result = await prisma.serviceRecord.findUnique({
    where: {
      serviceId: id,
    },
  });
  return result;
};

const completeService = async (id: string, payload: Partial<ServiceRecord>) => {
  //   checking existence
  const exists = await prisma.serviceRecord.findUnique({
    where: {
      serviceId: id,
    },
    select: { serviceId: true },
  });

  if (!exists) {
    throw new AppError("Service not found", StatusCodes.NOT_FOUND);
  }
  const completionDate = payload.completionDate ?? new Date();

  const result = await prisma.serviceRecord.update({
    where: {
      serviceId: id,
    },
    data: {
      status: ServiceStatus.done,
      completionDate,
    },
  });
  return result;
};

const getOverdueServices = async () => {
  // console.log("service");
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const result = await prisma.serviceRecord.findMany({
    where: {
      status: {
        in: [ServiceStatus.pending, ServiceStatus.in_progress],
      },
      serviceDate: {
        lt: sevenDaysAgo,
      },
    },
  });
  // console.log(result);
  return result;
};

export const ServiceRecordService = {
  createService,
  getAllServices,
  getSingleService,
  completeService,
  getOverdueServices,
};
