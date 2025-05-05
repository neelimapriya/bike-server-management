"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bike_route_1 = require("../modules/Bike/bike.route");
const customer_routes_1 = require("../modules/Customers/customer.routes");
const serviceRecords_routes_1 = require("../modules/ServiceRecord/serviceRecords.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/customers",
        route: customer_routes_1.customerRoutes,
    },
    {
        path: "/bikes",
        route: bike_route_1.bikeRoutes,
    },
    {
        path: "/services",
        route: serviceRecords_routes_1.serviceRoutes,
    },
];
moduleRoutes.forEach(({ path, route }) => router.use(path, route));
exports.default = router;
