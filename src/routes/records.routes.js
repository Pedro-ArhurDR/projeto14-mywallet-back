import { Router } from "express";
import { exitRecord,enterRecord,loadRecords } from "../controllers/records.controller.js";


const router = Router()

router.get('/menu',loadRecords)
router.post('/saida',exitRecord)
router.post('/entrada',enterRecord)

export default router