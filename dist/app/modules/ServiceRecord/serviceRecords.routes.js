"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const serviceRecords_controller_1 = require("./serviceRecords.controller");
const router = express_1.default.Router();
router.post("/", serviceRecords_controller_1.ServiceRecordController.createService);
router.get("/", serviceRecords_controller_1.ServiceRecordController.getAllServices);
router.get("/:id", serviceRecords_controller_1.ServiceRecordController.getSingleService);
router.get("/status", serviceRecords_controller_1.ServiceRecordController.getOverdueServices);
router.put("/:id/complete", serviceRecords_controller_1.ServiceRecordController.completeService);
exports.serviceRoutes = router;
