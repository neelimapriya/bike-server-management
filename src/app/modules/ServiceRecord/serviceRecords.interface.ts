import { ServiceStatus } from "../../../generated/prisma";

export interface IService {
  bikeId: string;
  serviceDate: string;
  description: string;
  status: ServiceStatus;
}
