import { Router } from "express";

import { authenticateCompany } from "../middlewares/authenticateCompany.middleware.js";
import { verifyCompanyExistence } from "../middlewares/verifyCompanyExistence.middleware.js";
import { verifyDuplicateVehiclePlate } from "../middlewares/verifyDuplicateVehiclePlate.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { verifyVehicleExistence } from "../middlewares/verifyVehicleExistence.middleware.js";

import { vehicleSchema } from "../models/vehiclesSchema.model";

import { createVehicle } from "../controllers/vehicle/vehicle.controller.js";
import { listVehicle } from "../controllers/vehicle/vehicle.controller.js";
import { updateVehicle } from "../controllers/vehicle/vehicle.controller.js";
import { destroyVehicle } from "../controllers/vehicle/vehicle.controller.js";

const routerVehicle = Router();

routerVehicle.post(
    "/companies/:cnpj/vehicles",
    authenticateCompany,
    verifyCompanyExistence,
    verifyDuplicateVehiclePlate,
    validate(vehicleSchema),
    createVehicle
);

routerVehicle.get(
    "/companies/:cnpj/vehicles",
    authenticateCompany,
    verifyCompanyExistence,
    listVehicle
);

routerVehicle.put(
    "/companies/:cnpj/vehivles/:plate",
    authenticateCompany,
    verifyCompanyExistence,
    verifyVehicleExistence,
    updateVehicle
);

routerVehicle.delete(
    "/companies/:cnpj/vehicles/:plate",
    authenticateCompany,
    verifyCompanyExistence,
    verifyVehicleExistence,
    destroyVehicle
);

export default routerVehicle;