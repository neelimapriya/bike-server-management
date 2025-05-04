import { Router } from "express";
import { bikeRoutes } from "../modules/Bike/bike.route";
import { customerRoutes } from "../modules/Customers/customer.routes";

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
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
