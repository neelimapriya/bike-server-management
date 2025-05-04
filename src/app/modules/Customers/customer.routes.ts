import express from "express";
import { CustomerController } from "./customer.controller";

const router = express.Router();

router.post("/", CustomerController.createCustomer);
router.get("/", CustomerController.getAllCustomers);
router.get("/:id", CustomerController.getSingleCustomer);
router.put("/:id", CustomerController.updateCustomer);
router.delete("/:id", CustomerController.deleteCustomer);

export const customerRoutes = router;