import { db } from "../database/db.js";
import { ObjectID } from "bson";
import dayjs from "dayjs";
import { recordSchema } from "../models/records.model.js";
export async function exitRecord(req,res){
    const {userId,valor,descricao} = req.body
    const user=req.body
    console.log(req.body)
    const { error } = recordSchema.validate(user, { abortEarly: false });
  
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }
    try{
        const userExist = await db.collection('users').findOne({_id: ObjectID(userId)})
        if(!userExist){
            return res.sendStatus(404)
        }
        await db.collection('records').insertOne({
            userId:userId,
            data:dayjs().format('DD/MM'),
            valor:valor,
            descricao:descricao,
            status:'saida'
        })
        res.sendStatus(202)
    }
    catch{
        console.log(req.body)
        res.sendStatus(500)
    }
}
export async function enterRecord(req,res){
    const {userId,valor,descricao} = req.body
    const user=req.body
    console.log(req.body)
    const { error } = recordSchema.validate(user, { abortEarly: false });
  
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }
    try{
        const userExist = await db.collection('users').findOne({_id: ObjectID(userId)})
        console.log(userExist)
        if(!userExist){
            return res.sendStatus(404)
        }
        await db.collection('records').insertOne({
            userId:userId,
            data:dayjs().format('DD/MM'),
            valor:valor,
            descricao:descricao,
            status:'entrada'
        })
        res.sendStatus(202)
    }
    catch{
        res.sendStatus(500)
    }
}