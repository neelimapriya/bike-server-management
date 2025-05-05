// import { ServiceStatus } from "../../../generated/prisma";

import { ServiceStatus } from "@prisma/client";

export interface IService {
  bikeId: string;
  serviceDate: string;
  description: string;
  status: ServiceStatus;
}
