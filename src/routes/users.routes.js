import { Router } from "express";
import { LoginUser,SignUp,FinishSession } from "../controllers/users.controller.js";

const router = Router()

router.post('/', LoginUser)
router.post('/cadastro',SignUp)
router.delete('/menu',FinishSession)

export default router
