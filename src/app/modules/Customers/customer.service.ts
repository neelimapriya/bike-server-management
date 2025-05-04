import { StatusCodes } from "http-status-codes";
import { AppError } from "../../../config";
import prisma from "../../utils/prisma";
import { ICustomer } from "./customer.interface";
import { Customer } from "../../../generated/prisma";

const createCustomer = async (payload: ICustomer) => {
  // Check if email already exists or not
  const customerExists = await prisma.customer.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (customerExists) {
    throw new AppError("This Email is already exists", StatusCodes.CONFLICT);
  }

  const result = await prisma.customer.create({
    data: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
    },
  });
  return result;
};

const getAllCustomers = async () => {
  const result = await prisma.customer.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const getCustomerById = async (customerId: string): Promise<ICustomer> => {
  const result = await prisma.customer.findUnique({
    where: {
      customerId,
    },
  });

  if (!result) {
    throw new AppError("Customer is not found", StatusCodes.NOT_FOUND);
  }

  return result;
};

const updateCustomer = async (
  id: string,
  payload: Partial<Customer>
): Promise<ICustomer> => {
  // Check customer exists or not
  const exists = await prisma.customer.findUnique({
    where: {
      customerId: id,
    },
  });

  if (!exists) {
    throw new AppError("Customer not found", StatusCodes.NOT_FOUND);
  }

  // check if new email exist
  if (payload.email) {
    const emailExists = await prisma.customer.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (emailExists && emailExists.customerId !== id) {
      throw new AppError("Email already exists", StatusCodes.CONFLICT);
    }
  }

  const result = await prisma.customer.update({
    where: {
      customerId: id,
    },
    data: payload,
  });
  return result;
};

const deleteCustomer = async (id: string): Promise<Customer> => {
  const exists = await prisma.customer.findUnique({
    where: {
      customerId: id,
    },
  });

  if (!exists) {
    throw new AppError("This Customer not found", StatusCodes.NOT_FOUND);
  }

  const result = await prisma.customer.delete({
    where: {
      customerId: id,
    },
  });
  return result;
};

export const CustomerService = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
