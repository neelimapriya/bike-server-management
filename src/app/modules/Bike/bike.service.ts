import { StatusCodes } from "http-status-codes";
import { IBike } from "./bike.interface";
import prisma from "../../utils/prisma";
import { AppError } from "../../../config";

const createBike = async (payload: IBike) => {
     // Check customer exists or not
  const customerExists = await prisma.customer.findUnique({
    where: {
      customerId: payload.customerId,
    },
  });

  if (!customerExists) {
    throw new AppError( 'Customer not found',StatusCodes.NOT_FOUND);
  }
  const result = await prisma.bike.create({
    data: {
      brand: payload.brand,
      model: payload.model,
      year: payload.year,
      customerId: payload.customerId,
    },
  });
  return result;
};

const getAllBikes = async ():Promise<IBike[]> => {
  const result = await prisma.bike.findMany({
    orderBy: {
      year: "desc",
    },
  });
  return result;
};

const getSingleBike = async (id: string):Promise<IBike> => {
  // Check if bike exists or not
  const exists = await prisma.bike.findUnique({
    where: {
      bikeId: id,
    },
  });

  if (!exists) {
    throw new AppError("Bike not found", StatusCodes.NOT_FOUND);
  }
  const result = await prisma.bike.findUniqueOrThrow({
    where: {
      bikeId: id,
    },
  });
  return result;
};

export const BikeService = {
  createBike,
  getAllBikes,
  getSingleBike
};