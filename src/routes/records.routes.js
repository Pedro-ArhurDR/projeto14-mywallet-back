import { Router } from "express";
import { exitRecord,enterRecord,loadRecords } from "../controllers/records.controller.js";
import { validateRecord } from "../middlewares/recordsSchemaValidationMiddleware.js";

const router = Router()

router.get('/menu',loadRecords)
router.post('/saida',validateRecord,exitRecord)
router.post('/entrada',validateRecord,enterRecord)

export default router