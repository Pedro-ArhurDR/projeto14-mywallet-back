
import { db } from "../database/db.js";
import { v4 as uuidV4 } from "uuid";
import { loginSchema } from "../models/login.model.js";
import { signupSchema } from "../models/signup.model.js";
import bcrypt from 'bcrypt';

export async function LoginUser(req,res){
    const token = uuidV4()
    const user = req.body;
    console.log(user)
    const { error } = loginSchema.validate(user, { abortEarly: false });
  
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }
    try{
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

        await db.collection('sessions').insertOne({
            token,
            userId:emailExist._id
        })

        delete emailExist.senha
        res.send({emailExist,token})
        
    }
    catch(err){
        console.log(err , 'erro no login')
        res.sendStatus(500)
    }
}

export async function SignUp(req,res){
    const{nome,email,senha,senha2} = req.body
    const user = req.body;
    const { error } = signupSchema.validate(user, { abortEarly: false });
  
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }
    const passwordHash = bcrypt.hashSync(senha, 10);
    try{
        const emailExist = await db.collection('users').findOne({email})
        if(emailExist){
            console.log('EMAIL JA CADASTRADO')
            return res.sendStatus(409)
        }
        if(senha!==senha2){
            console.log('SENHAS NAO COINCIDEM')
            return res.sendStatus(401)
        }

        await db.collection('users').insertOne({
            nome:nome,
            email:email,
            senha:passwordHash
        })
        res.sendStatus(202)

    }
    catch(err){
        console.log(err,'erro no cadastro')
    }
}