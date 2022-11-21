
import { db } from "../database/db.js";
import { v4 as uuidV4 } from "uuid";
import bcrypt from 'bcrypt';

export async function LoginUser(req,res){
    const token = uuidV4()
    const {email} = req.body
    try{
        const emailExist = await db.collection('users').findOne({email})
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
    const{nome,email,senha} = req.body
    const passwordHash = bcrypt.hashSync(senha, 10);
    try{

        await db.collection('users').insertOne({
            nome:nome,
            email:email,
            senha:passwordHash
        })
        res.sendStatus(202)

    }
    catch(err){
        console.log(err,'erro no cadastro')
        res.sendStatus(500)
    }
}

export async function FinishSession(req,res){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ","")

    try{
        await db.collection("sessions").deleteOne({ token });
        res.status(200).send({ message: "Sessão finalizada" });
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
}