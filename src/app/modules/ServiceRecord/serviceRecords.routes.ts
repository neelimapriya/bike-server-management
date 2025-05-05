import express from "express";
import { ServiceRecordController } from "./serviceRecords.controller";

const router = express.Router();


router.post("/", ServiceRecordController.createService);
router.get("/", ServiceRecordController.getAllServices);
router.get("/:id", ServiceRecordController.getSingleService);
router.get("/status", ServiceRecordController.getOverdueServices);
router.put("/:id/complete", ServiceRecordController.completeService);


export const serviceRoutes = router;
