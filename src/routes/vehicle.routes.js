import express from "express";
import * as controller from "../controllers/vehicle.controller.js";

const router = express.Router();

router.get("/", controller.getAllVehicles);
router.get("/:id", controller.getVehicleById);
router.post("/", controller.createVehicle);
router.put("/:id", controller.updateVehicle);
router.delete("/:id", controller.deleteVehicle);

export default router;
