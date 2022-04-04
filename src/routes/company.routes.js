import { Router } from "express";

import { authenticateCompany } from "../middlewares/authenticateCompany.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { verifyCompanyExistence } from "../middlewares/verifyCompanyExistence.middleware.js";
import { verifyDuplicateCnpj } from "../middlewares/verifyDuplicateCnpj.middleware.js";

import { companySchema } from "../models/companySchema.model";

import {
    create,
    login,
    list,
    update,
    destroy,
} from "../controllers/company/company.controller.js";

const router = Router();

router.post(
    "/companies/register",
    validate(companySchema),
    verifyDuplicateCnpj,
    create
);

router.post("/companies/login", login);

router.get("/companies", list);

router.put(
    "/companies/:cnpj",
    authenticateCompany,
    verifyCompanyExistence,
    update
);

router.delete(
    "/companies/:cnpj",
    authenticateCompany,
    verifyCompanyExistence,
    destroy
);

export default router;