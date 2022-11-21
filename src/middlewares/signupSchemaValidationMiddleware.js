import { signupSchema } from "../models/signup.model.js";
import { db } from "../database/db.js";
export async function validateSignUP(req,res,next){
  const{email,senha,senha2} = req.body
    const user = req.body;
    const { error } = signupSchema.validate(user, { abortEarly: false });
  
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      console.log('NAO PASSEI NO SCHEMA')
      return res.status(422).send(errors);
      
    }
    try{
      const emailExist = await db.collection('users').findOne({email})
      console.log('VALIDATION CADASTRO  RODANDO')
      if(emailExist){
          console.log('EMAIL JA CADASTRADO')
          return res.sendStatus(409)
      }
      if(senha!==senha2){
          console.log('SENHAS NAO COINCIDEM')
          return res.sendStatus(401)
      }
    }
    catch{
      res.sendStatus(500)
    }
    next()
}