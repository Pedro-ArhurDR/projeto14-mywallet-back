import { recordSchema } from "../models/records.model.js";
import { db } from "../database/db.js";
import { ObjectID } from "bson";
export async function validateRecord(req,res,next){
    const {userId} = req.body
    const user=req.body
    console.log(req.body)
    const { error } = recordSchema.validate(user, { abortEarly: false });
    console.log('schema record rodando')
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
    try{
        const userExist = await db.collection('users').findOne({_id: ObjectID(userId)})
        console.log('VALIDAÇAO RODANDO')
        if(!userExist){
            return res.sendStatus(404)
        }
    }catch{
        console.log(req.body)
        res.sendStatus(500)
    }

    next()
}