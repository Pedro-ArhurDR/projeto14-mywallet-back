import { Router } from "express";
import { LoginUser,SignUp,FinishSession } from "../controllers/users.controller.js";
import { validateSignUP } from "../middlewares/signupSchemaValidationMiddleware.js";
import { validateLogin } from "../middlewares/loginSchemaValidationMiddleware.js";
const router = Router()

router.post('/',validateLogin ,LoginUser)
router.post('/cadastro',validateSignUP ,SignUp)
router.delete('/menu',FinishSession)

export default router
