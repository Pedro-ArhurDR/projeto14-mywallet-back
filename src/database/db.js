import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

dotenv.config()

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect();
    console.log("MongoDB conectado com sucesso!");
  } catch (err) {
    console.log(err);
  }

  export const db = mongoClient.db("MyWallet");
  export const users = db.collection('users')
  export const records = db.collection('records')
  