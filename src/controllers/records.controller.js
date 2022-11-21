import { db } from "../database/db.js";
import dayjs from "dayjs";
export async function exitRecord(req,res){
    const {userId,valor,descricao} = req.body
    try{
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
        res.sendStatus(400)
    }
}
export async function enterRecord(req,res){
    const {userId,valor,descricao} = req.body
    try{
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

export async function loadRecords(req,res){
    const { authorization } = req.headers;
    console.log(authorization,'seu token')
    try{
        const token = authorization?.replace("Bearer ","")
        if(!token){
        return res.sendStatus(401)
        }
        const session =  await db.collection("sessions").findOne({token})
        const myId = session.userId.toString()
        const myRecords = await db.collection("records").find({userId:myId}).toArray()
        res.send(myRecords)
    }
    catch{
        res.sendStatus(500)
    }
}