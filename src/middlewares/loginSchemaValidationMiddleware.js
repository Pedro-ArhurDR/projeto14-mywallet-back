import { loginSchema } from "../models/login.model.js";
import bcrypt from 'bcrypt';
import { db } from "../database/db.js";
export async function validateLogin(req,res,next){
    const user = req.body;
    const { error } = loginSchema.validate(user, { abortEarly: false });
  
    if (error) {
        console.log('NAO PASSEI NO SCHEMA')
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
    const {email,senha} = req.body
    const emailExist = await db.collection('users').findOne({email})
    console.log(emailExist,'EMAIL ENCONTRADO')

    if(!emailExist){
        return res.sendStatus(404)
    }
    if(!bcrypt.compareSync(senha,emailExist.senha)){
        console.log(req.body)
        return res.sendStatus(401)
    }
    next()
}