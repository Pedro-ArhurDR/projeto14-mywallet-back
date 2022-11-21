import  express  from "express";
import cors from 'cors';
import { LoginUser,SignUp } from "./src/controllers/users.controller.js";
import { exitRecord,enterRecord } from "./src/controllers/records.controller.js";

const app = express()
app.use(cors())
app.use(express.json())

app.post('/', LoginUser)
app.post('/cadastro',SignUp)


app.get('/menu')
app.post('/saida',exitRecord)
app.post('/entrada',enterRecord)

app.listen(5000,() => console.log('Server running in port:5000') )