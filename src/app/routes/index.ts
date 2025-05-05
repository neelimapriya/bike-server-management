import { Router } from "express";
import { bikeRoutes } from "../modules/Bike/bike.route";
import { customerRoutes } from "../modules/Customers/customer.routes";
import { serviceRoutes } from "../modules/ServiceRecord/serviceRecords.routes";

const router = Router();

export interface Routes {
  path: string;
  route: Router;
}

const moduleRoutes: Routes[] = [
  {
    path: "/customers",
    route: customerRoutes,
  },
  {
    path: "/bikes",
    route: bikeRoutes,
  },
  {
    path: "/services",
    route: serviceRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
